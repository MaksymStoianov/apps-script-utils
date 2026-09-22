import { insertSchema } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

interface RangeCall {
  row: number;
  column: number;
  numRows: number;
  numColumns: number;
  setValues?: unknown[][];
  numberFormat?: string;
  validation?: { values: unknown[]; allowInvalid: boolean } | null;
}

interface MetadataEntry {
  key: string;
  value: string;
}

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  calls: RangeCall[];
  metadata: MetadataEntry[];
}

/**
 * A stand-in sheet recording range writes and developer metadata.
 */
function sheetMock(maxRows = 100): SheetMock {
  const calls: RangeCall[] = [];

  let metadata: MetadataEntry[] = [];

  const sheet = {
    toString: () => "Sheet",
    getMaxRows: () => maxRows,
    getRange: (row: number, column: number, numRows: number, numColumns: number) => {
      const call: RangeCall = { row, column, numRows, numColumns };

      calls.push(call);

      return {
        setValues: (values: unknown[][]) => {
          call.setValues = values;
        },
        setNumberFormat: (format: string) => {
          call.numberFormat = format;
        },
        setDataValidation: (rule: { values: unknown[]; allowInvalid: boolean }) => {
          call.validation = rule;
        }
      };
    },
    getDeveloperMetadata: () =>
      metadata.map((entry: MetadataEntry) => ({
        getKey: () => entry.key,
        getValue: () => entry.value,
        remove: () => {
          metadata = metadata.filter((other: MetadataEntry) => other !== entry);
        }
      })),
    addDeveloperMetadata: (key: string, value: string) => {
      metadata.push({ key, value });
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

/**
 * A stand-in for the data validation builder.
 */
function installSpreadsheetApp(): void {
  (globalThis as Mutable).SpreadsheetApp = {
    newDataValidation: () => {
      const rule = { values: [] as unknown[], allowInvalid: false };

      const builder = {
        requireValueInList: (values: unknown[]) => {
          rule.values = values;

          return builder;
        },
        setAllowInvalid: (allow: boolean) => {
          rule.allowInvalid = allow;

          return builder;
        },
        build: () => rule
      };

      return builder;
    }
  };
}

beforeEach(() => {
  installSpreadsheetApp();
});

afterEach(() => {
  delete (globalThis as Mutable).SpreadsheetApp;
});

describe("insertSchema", () => {
  describe("Correct input data", () => {
    it("should write the column names into the header row", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, {
        version: 1,
        headerRow: 1,
        columns: [{ name: "Id" }, { name: "Status" }]
      });

      expect(calls[0]).toMatchObject({
        row: 1,
        column: 1,
        numRows: 1,
        numColumns: 2,
        setValues: [["Id", "Status"]]
      });
    });

    it("should default the header row to the first", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, { columns: [{ name: "Id" }] } as never);

      expect(calls[0].row).toBe(1);
    });

    it("should honour a header row that is not the first", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, { version: 1, headerRow: 3, columns: [{ name: "Id" }] });

      expect(calls[0].row).toBe(3);
      expect(calls[1].row).toBe(4);
    });

    it("should apply a number format to the column below the header", () => {
      const { sheet, calls } = sheetMock(100);

      insertSchema(sheet, {
        version: 1,
        headerRow: 1,
        columns: [{ name: "Rate", format: "0.00%" }]
      });

      expect(calls[1]).toMatchObject({
        row: 2,
        column: 1,
        numRows: 99,
        numColumns: 1,
        numberFormat: "0.00%"
      });
    });

    it("should apply a one-of-list rule from the accepted values", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, {
        version: 1,
        headerRow: 1,
        columns: [{ name: "Status", values: ["new", "paid"] }]
      });

      expect(calls[1].validation).toStrictEqual({ values: ["new", "paid"], allowInvalid: false });
    });

    it("should allow invalid values when asked", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, {
        version: 1,
        headerRow: 1,
        columns: [{ name: "Status", values: ["new"], allowInvalid: true }]
      });

      expect(calls[1].validation?.allowInvalid).toBe(true);
    });

    it("should leave a column with neither a format nor values alone", () => {
      const { sheet, calls } = sheetMock();

      insertSchema(sheet, { version: 1, headerRow: 1, columns: [{ name: "Id" }] });

      expect(calls[1].numberFormat).toBeUndefined();
      expect(calls[1].validation).toBeUndefined();
    });

    it("should store the schema as developer metadata", () => {
      const mock = sheetMock();

      insertSchema(mock.sheet, { version: 1, headerRow: 1, columns: [{ name: "Id" }] });

      expect(mock.metadata).toHaveLength(1);
      expect(mock.metadata[0].key).toBe("apps-script-utils:schema");
      expect(JSON.parse(mock.metadata[0].value)).toStrictEqual({
        version: 1,
        headerRow: 1,
        columns: [{ name: "Id" }]
      });
    });

    it("should replace a stored schema rather than stacking a second", () => {
      const mock = sheetMock();

      insertSchema(mock.sheet, { version: 1, headerRow: 1, columns: [{ name: "Id" }] });
      insertSchema(mock.sheet, { version: 1, headerRow: 1, columns: [{ name: "Ref" }] });

      expect(mock.metadata).toHaveLength(1);
      expect(JSON.parse(mock.metadata[0].value).columns).toStrictEqual([{ name: "Ref" }]);
    });

    it("should leave metadata belonging to somebody else alone", () => {
      const mock = sheetMock();

      mock.sheet.addDeveloperMetadata("other", "keep me");

      insertSchema(mock.sheet, { version: 1, headerRow: 1, columns: [{ name: "Id" }] });

      expect(mock.metadata.map((m: { key: string }) => m.key)).toStrictEqual([
        "other",
        "apps-script-utils:schema"
      ]);
    });

    it("should not touch the data area when the sheet has no room below the header", () => {
      const { sheet, calls } = sheetMock(1);

      insertSchema(sheet, {
        version: 1,
        headerRow: 1,
        columns: [{ name: "Rate", format: "0.00%" }]
      });

      expect(calls).toHaveLength(1);
    });

    it("should return the sheet", () => {
      const { sheet } = sheetMock();

      expect(insertSchema(sheet, { version: 1, headerRow: 1, columns: [{ name: "Id" }] })).toBe(
        sheet
      );
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() =>
        insertSchema({} as GoogleAppsScript.Spreadsheet.Sheet, {
          version: 1,
          headerRow: 1,
          columns: [{ name: "Id" }]
        })
      ).toThrow(InvalidSheetException);
    });

    it("should throw when the schema names no columns", () => {
      const { sheet } = sheetMock();

      expect(() => insertSchema(sheet, { version: 1, headerRow: 1, columns: [] })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw when a column has no name", () => {
      const { sheet } = sheetMock();

      expect(() =>
        insertSchema(sheet, { version: 1, headerRow: 1, columns: [{ id: 1 }] as never })
      ).toThrow(IllegalArgumentException);
    });

    it("should throw when the schema is not an object", () => {
      const { sheet } = sheetMock();

      expect(() => insertSchema(sheet, null as never)).toThrow(IllegalArgumentException);
      expect(() => insertSchema(sheet, "schema" as never)).toThrow(IllegalArgumentException);
    });

    it("should throw for a header row that is not a positive integer", () => {
      const { sheet } = sheetMock();

      expect(() =>
        insertSchema(sheet, { version: 1, headerRow: 0, columns: [{ name: "Id" }] })
      ).toThrow(IllegalArgumentException);
      expect(() =>
        insertSchema(sheet, { version: 1, headerRow: -1, columns: [{ name: "Id" }] })
      ).toThrow(IllegalArgumentException);
    });
  });
});
