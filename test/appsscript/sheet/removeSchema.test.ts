import { removeSchema } from "@/appsscript";
import { InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface MetadataEntry {
  key: string;
  value: string;
}

interface RangeCall {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
  clearedValidation: boolean;
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  metadata: MetadataEntry[];
  calls: RangeCall[];
}

const KEY = "apps-script-utils:schema";

/**
 * A stand-in sheet carrying the given metadata, recording range calls.
 */
function sheetMock(entries: MetadataEntry[], maxRows = 100): SheetMock {
  let metadata: MetadataEntry[] = [...entries];

  const calls: RangeCall[] = [];

  const sheet = {
    toString: () => "Sheet",
    getMaxRows: () => maxRows,
    getDeveloperMetadata: () =>
      metadata.map((entry: MetadataEntry) => ({
        getKey: () => entry.key,
        getValue: () => entry.value,
        remove: () => {
          metadata = metadata.filter((other: MetadataEntry) => other !== entry);
        }
      })),
    getRange: (row: number, column: number, numRows: number, numColumns: number) => {
      const call: RangeCall = { row, column, numRows, numColumns, clearedValidation: false };

      calls.push(call);

      return {
        clearDataValidations: () => {
          call.clearedValidation = true;
        }
      };
    }
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return {
    sheet,
    calls,
    get metadata() {
      return metadata;
    }
  } as SheetMock;
}

const schema = JSON.stringify({
  version: 1,
  headerRow: 1,
  columns: [{ name: "Id" }, { name: "Status" }]
});

describe("removeSchema", () => {
  describe("Correct input data", () => {
    it("should remove the stored schema and report it", () => {
      const mock = sheetMock([{ key: KEY, value: schema }]);

      expect(removeSchema(mock.sheet)).toBe(true);
      expect(mock.metadata).toStrictEqual([]);
    });

    it("should do nothing on a sheet that carries no schema", () => {
      const mock = sheetMock([]);

      expect(removeSchema(mock.sheet)).toBe(false);
      expect(mock.calls).toStrictEqual([]);
    });

    it("should be a no-op the second time", () => {
      const mock = sheetMock([{ key: KEY, value: schema }]);

      expect(removeSchema(mock.sheet)).toBe(true);
      expect(removeSchema(mock.sheet)).toBe(false);
    });

    it("should leave metadata belonging to somebody else alone", () => {
      const mock = sheetMock([
        { key: "other", value: "keep me" },
        { key: KEY, value: schema }
      ]);

      removeSchema(mock.sheet);

      expect(mock.metadata).toStrictEqual([{ key: "other", value: "keep me" }]);
    });

    it("should remove metadata that will not parse", () => {
      const mock = sheetMock([{ key: KEY, value: "not json" }]);

      expect(removeSchema(mock.sheet)).toBe(true);
      expect(mock.metadata).toStrictEqual([]);
    });

    it("should not touch the cells by default", () => {
      const mock = sheetMock([{ key: KEY, value: schema }]);

      removeSchema(mock.sheet);

      expect(mock.calls).toStrictEqual([]);
    });

    it("should clear the validation of the described columns when asked", () => {
      const mock = sheetMock([{ key: KEY, value: schema }], 100);

      expect(removeSchema(mock.sheet, { validation: true })).toBe(true);
      expect(mock.calls).toStrictEqual([
        { row: 2, column: 1, numRows: 99, numColumns: 2, clearedValidation: true }
      ]);
    });

    it("should clear below the schema's own header row", () => {
      const withHeader = JSON.stringify({
        version: 1,
        headerRow: 3,
        columns: [{ name: "Id" }]
      });

      const mock = sheetMock([{ key: KEY, value: withHeader }], 10);

      removeSchema(mock.sheet, { validation: true });

      expect(mock.calls[0]).toMatchObject({ row: 4, numRows: 7, numColumns: 1 });
    });

    it("should clear nothing when there is no stored schema to attribute rules to", () => {
      const mock = sheetMock([]);

      expect(removeSchema(mock.sheet, { validation: true })).toBe(false);
      expect(mock.calls).toStrictEqual([]);
    });

    it("should clear nothing when the stored schema will not parse", () => {
      const mock = sheetMock([{ key: KEY, value: "not json" }]);

      expect(removeSchema(mock.sheet, { validation: true })).toBe(true);
      expect(mock.calls).toStrictEqual([]);
    });

    it("should clear nothing when the sheet has no room below the header", () => {
      const mock = sheetMock([{ key: KEY, value: schema }], 1);

      removeSchema(mock.sheet, { validation: true });

      expect(mock.calls).toStrictEqual([]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() => removeSchema({} as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
      expect(() => removeSchema(null as unknown as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
    });
  });
});
