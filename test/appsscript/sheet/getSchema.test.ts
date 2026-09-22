import { getSchema } from "@/appsscript";
import { InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface MetadataEntry {
  key: string;
  value: string;
}

/**
 * A stand-in sheet carrying the given metadata and data-range values.
 */
function sheetMock(
  values: unknown[][],
  metadata: MetadataEntry[] = []
): GoogleAppsScript.Spreadsheet.Sheet {
  return {
    toString: () => "Sheet",
    getDataRange: () => ({
      getValues: () => values.map((row: unknown[]) => [...row])
    }),
    getDeveloperMetadata: () =>
      metadata.map((entry: MetadataEntry) => ({
        getKey: () => entry.key,
        getValue: () => entry.value,
        remove: () => undefined
      }))
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;
}

const KEY = "apps-script-utils:schema";

describe("getSchema", () => {
  describe("A stored schema", () => {
    it("should return the schema that was stored", () => {
      const stored = {
        version: 1,
        headerRow: 2,
        columns: [{ name: "Id", type: "string" }]
      };

      const sheet = sheetMock([["anything"]], [{ key: KEY, value: JSON.stringify(stored) }]);

      expect(getSchema(sheet)).toStrictEqual(stored);
    });

    it("should prefer the stored schema over inference", () => {
      const stored = { version: 1, headerRow: 1, columns: [{ name: "Declared" }] };

      const sheet = sheetMock([["Inferred"], [1]], [{ key: KEY, value: JSON.stringify(stored) }]);

      expect(getSchema(sheet)?.columns).toStrictEqual([{ name: "Declared" }]);
    });

    it("should ignore metadata under other keys", () => {
      const sheet = sheetMock([["Id"], [1]], [{ key: "other", value: "{}" }]);

      expect(getSchema(sheet)?.inferred).toBe(true);
    });

    it("should fall back to inference when the stored value will not parse", () => {
      const sheet = sheetMock([["Id"], [1]], [{ key: KEY, value: "not json" }]);

      expect(getSchema(sheet)?.inferred).toBe(true);
    });
  });

  describe("Inference", () => {
    it("should take the column names from the first row", () => {
      const sheet = sheetMock([["Id", "Name"]]);

      expect(getSchema(sheet)?.columns.map((c) => c.name)).toStrictEqual(["Id", "Name"]);
    });

    it("should mark the schema and every column as inferred", () => {
      const sheet = sheetMock([["Id"], [1]]);

      const schema = getSchema(sheet);

      expect(schema?.inferred).toBe(true);
      expect(schema?.columns.every((c) => c.inferred === true)).toBe(true);
    });

    it("should infer a number column", () => {
      const sheet = sheetMock([["Amount"], [1], [2.5]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("number");
    });

    it("should infer a boolean column", () => {
      const sheet = sheetMock([["Paid"], [true], [false]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("boolean");
    });

    it("should infer a date column", () => {
      const sheet = sheetMock([["Placed"], [new Date(2024, 0, 1)]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("date");
    });

    it("should infer a string column for mixed values", () => {
      const sheet = sheetMock([["Ref"], [1], ["A-2"]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("string");
    });

    it("should keep numeric-looking strings as strings", () => {
      const sheet = sheetMock([["Id"], ["1"], ["2"], ["3"]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("string");
    });

    it("should give no type to a column with nothing in it", () => {
      const sheet = sheetMock([["Notes"], [""], [""]]);

      expect(getSchema(sheet)?.columns[0].type).toBeUndefined();
      expect(getSchema(sheet)?.columns[0].inferred).toBe(true);
    });

    it("should give no type to a header with no rows under it", () => {
      const sheet = sheetMock([["Notes"]]);

      expect(getSchema(sheet)?.columns[0].type).toBeUndefined();
    });

    it("should skip empty cells when judging a column", () => {
      const sheet = sheetMock([["Amount"], [1], [""], [2]]);

      expect(getSchema(sheet)?.columns[0].type).toBe("number");
    });

    it("should infer each column separately", () => {
      const sheet = sheetMock([
        ["Id", "Amount", "Paid"],
        ["A-1", 10, true]
      ]);

      expect(getSchema(sheet)?.columns.map((c) => c.type)).toStrictEqual([
        "string",
        "number",
        "boolean"
      ]);
    });

    it("should report the header row as the first", () => {
      const sheet = sheetMock([["Id"], [1]]);

      expect(getSchema(sheet)?.headerRow).toBe(1);
    });

    it("should stringify a non-string header", () => {
      const sheet = sheetMock([[1], ["a"]]);

      expect(getSchema(sheet)?.columns[0].name).toBe("1");
    });
  });

  describe("Nothing to describe", () => {
    it("should return null for an empty sheet", () => {
      expect(getSchema(sheetMock([]))).toBeNull();
    });

    it("should return null for a sheet whose first row has no cells", () => {
      expect(getSchema(sheetMock([[]]))).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() => getSchema({} as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
      expect(() => getSchema(null as unknown as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
    });
  });
});
