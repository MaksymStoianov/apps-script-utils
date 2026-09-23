import { getValues } from "@/appsscript";
import { IllegalArgumentException, InvalidSheetException } from "@/exception";
import { describe, expect, it } from "vitest";

interface SheetMock {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  reads: { values: number; display: number };
}

/**
 * A stand-in sheet whose data range reports the given stored and displayed
 * values, and which counts how often each was read.
 */
function sheetMock(values: unknown[][], displayed?: string[][]): SheetMock {
  const reads = { values: 0, display: 0 };

  const sheet = {
    toString: () => "Sheet",
    getDataRange: () => ({
      getValues: () => {
        reads.values += 1;

        return values.map((row: unknown[]) => [...row]);
      },
      getDisplayValues: () => {
        reads.display += 1;

        return (displayed ?? values.map((row: unknown[]) => row.map(String))).map(
          (row: unknown[]) => [...row]
        );
      },
      getRow: () => 1,
      getColumn: () => 1
    })
  } as unknown as GoogleAppsScript.Spreadsheet.Sheet;

  return { sheet, reads };
}

/**
 * A stand-in range: knows where it sits and what it holds.
 */
function rangeMock(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  row: number,
  column: number,
  values: unknown[][]
): GoogleAppsScript.Spreadsheet.Range {
  return {
    toString: () => "Range",
    getSheet: () => sheet,
    getRow: () => row,
    getColumn: () => column,
    getNumRows: () => values.length,
    getNumColumns: () => values[0].length,
    getValues: () => values.map((cells) => [...cells]),
    getDisplayValues: () => values.map((cells) => cells.map(String))
  } as unknown as GoogleAppsScript.Spreadsheet.Range;
}

describe("getValues", () => {
  describe("Matrix mode", () => {
    it("should return every row as an array", () => {
      const { sheet } = sheetMock([
        ["Name", "Age"],
        ["Ada", 36]
      ]);

      expect(getValues(sheet)).toStrictEqual([
        ["Name", "Age"],
        ["Ada", 36]
      ]);
    });

    it("should return an empty array for an empty sheet", () => {
      const { sheet } = sheetMock([]);

      expect(getValues(sheet)).toStrictEqual([]);
    });

    it("should read the sheet exactly once", () => {
      const { sheet, reads } = sheetMock([["a"]]);

      getValues(sheet);

      expect(reads).toStrictEqual({ values: 1, display: 0 });
    });
  });

  describe("Object mode", () => {
    it("should key each row by the header row and drop the header", () => {
      const { sheet } = sheetMock([
        ["Name", "Age"],
        ["Ada", 36],
        ["Grace", 45]
      ]);

      expect(getValues(sheet, { headerRow: 1 })).toStrictEqual([
        { Name: "Ada", Age: 36 },
        { Name: "Grace", Age: 45 }
      ]);
    });

    it("should honour a header row that is not the first", () => {
      const { sheet } = sheetMock([
        ["report", ""],
        ["Name", "Age"],
        ["Ada", 36]
      ]);

      expect(getValues(sheet, { headerRow: 2 })).toStrictEqual([{ Name: "Ada", Age: 36 }]);
    });

    it("should drop the rows above the header row", () => {
      const { sheet } = sheetMock([["title"], ["subtitle"], ["Name"], ["Ada"]]);

      expect(getValues(sheet, { headerRow: 3 })).toStrictEqual([{ Name: "Ada" }]);
    });

    it("should let the leftmost column win a repeated header", () => {
      const { sheet } = sheetMock([
        ["Id", "Id"],
        ["first", "second"]
      ]);

      expect(getValues(sheet, { headerRow: 1 })).toStrictEqual([{ Id: "first" }]);
    });

    it("should keep the unreachable duplicate in the values array", () => {
      const { sheet } = sheetMock([
        ["Id", "Id"],
        ["first", "second"]
      ]);

      const seen: unknown[][] = [];

      getValues(sheet, {
        headerRow: 1,
        mapper: ({ values }) => {
          seen.push(values);

          return values;
        }
      });

      expect(seen).toStrictEqual([["first", "second"]]);
    });

    it("should stringify a non-string header", () => {
      const { sheet } = sheetMock([
        [1, 2],
        ["a", "b"]
      ]);

      expect(getValues(sheet, { headerRow: 1 })).toStrictEqual([{ "1": "a", "2": "b" }]);
    });
  });

  describe("Displayed values", () => {
    it("should read the displayed values when asked", () => {
      const { sheet, reads } = sheetMock([["Rate"], [0.15]], [["Rate"], ["15%"]]);

      expect(getValues(sheet, { display: true })).toStrictEqual([["Rate"], ["15%"]]);
      expect(reads).toStrictEqual({ values: 0, display: 1 });
    });

    it("should combine displayed values with a header row", () => {
      const { sheet } = sheetMock([["Rate"], [0.15]], [["Rate"], ["15%"]]);

      expect(getValues(sheet, { display: true, headerRow: 1 })).toStrictEqual([{ Rate: "15%" }]);
    });
  });

  describe("Filtering, paging and mapping", () => {
    it("should keep only the rows the filter selects", () => {
      const { sheet } = sheetMock([["a"], ["b"], ["a"]]);

      expect(getValues(sheet, { filter: ({ values }) => values[0] === "a" })).toStrictEqual([
        ["a"],
        ["a"]
      ]);
    });

    it("should give the filter the one-based position and the record", () => {
      const { sheet } = sheetMock([["Name"], ["Ada"]]);

      const seen: Array<[number, unknown]> = [];

      getValues(sheet, {
        headerRow: 1,
        filter: ({ position, record }) => {
          seen.push([position, record]);

          return true;
        }
      });

      expect(seen).toStrictEqual([[2, { Name: "Ada" }]]);
    });

    it("should page over the matching rows, not the sheet rows", () => {
      const { sheet } = sheetMock([["a"], ["skip"], ["b"], ["skip"], ["c"]]);

      expect(
        getValues(sheet, {
          filter: ({ values }) => values[0] !== "skip",
          offset: 1,
          limit: 1
        })
      ).toStrictEqual([["b"]]);
    });

    it("should apply offset without a limit", () => {
      const { sheet } = sheetMock([["a"], ["b"], ["c"]]);

      expect(getValues(sheet, { offset: 2 })).toStrictEqual([["c"]]);
    });

    it("should apply a limit without an offset", () => {
      const { sheet } = sheetMock([["a"], ["b"], ["c"]]);

      expect(getValues(sheet, { limit: 2 })).toStrictEqual([["a"], ["b"]]);
    });

    it("should return nothing for a limit of zero", () => {
      const { sheet } = sheetMock([["a"], ["b"]]);

      expect(getValues(sheet, { limit: 0 })).toStrictEqual([]);
    });

    it("should return nothing for an offset beyond the data", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(getValues(sheet, { offset: 10 })).toStrictEqual([]);
    });

    it("should map each surviving row", () => {
      const { sheet } = sheetMock([
        ["Name", "Age"],
        ["Ada", 36],
        ["Grace", 45]
      ]);

      expect(
        getValues(sheet, {
          headerRow: 1,
          filter: ({ record }) => Number(record?.Age) > 40,
          mapper: ({ record }) => record?.Name
        })
      ).toStrictEqual(["Grace"]);
    });

    it("should map after paging, not before", () => {
      const { sheet } = sheetMock([["a"], ["b"], ["c"]]);

      const mapped: unknown[] = [];

      getValues(sheet, {
        limit: 1,
        mapper: ({ values }) => {
          mapped.push(values[0]);

          return values;
        }
      });

      expect(mapped).toStrictEqual(["a"]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for anything that is not a sheet", () => {
      expect(() => getValues({} as GoogleAppsScript.Spreadsheet.Sheet)).toThrow(
        InvalidSheetException
      );
    });

    it("should throw for a header row that is not a positive integer", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => getValues(sheet, { headerRow: -1 })).toThrow(IllegalArgumentException);
      expect(() => getValues(sheet, { headerRow: 1.5 })).toThrow(IllegalArgumentException);
    });

    it("should throw for a negative offset or limit", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => getValues(sheet, { offset: -1 })).toThrow(IllegalArgumentException);
      expect(() => getValues(sheet, { limit: -1 })).toThrow(IllegalArgumentException);
      expect(() => getValues(sheet, { offset: 1.5 })).toThrow(IllegalArgumentException);
    });

    it("should throw when the filter or mapper is not a function", () => {
      const { sheet } = sheetMock([["a"]]);

      expect(() => getValues(sheet, { filter: "x" as never })).toThrow(IllegalArgumentException);
      expect(() => getValues(sheet, { mapper: 42 as never })).toThrow(IllegalArgumentException);
    });
  });

  describe("Reading a range", () => {
    it("should read the range instead of the data range", () => {
      const { sheet, reads } = sheetMock([["ignored"]]);

      const rows = getValues(rangeMock(sheet, 5, 2, [["a"], ["b"]]));

      expect(rows).toStrictEqual([["a"], ["b"]]);
      expect(reads.values).toBe(0);
    });

    it("should number the rows from the position of the range", () => {
      const { sheet } = sheetMock([["ignored"]]);

      const positions = getValues(rangeMock(sheet, 5, 2, [["a"], ["b"]]), {
        mapper: (row) => row.position
      });

      expect(positions).toStrictEqual([5, 6]);
    });

    it("should find a header row at its position on the sheet", () => {
      const { sheet } = sheetMock([["ignored"]]);

      const rows = getValues(
        rangeMock(sheet, 4, 1, [
          ["Name", "Age"],
          ["Ada", 36]
        ]),
        { headerRow: 4 }
      );

      expect(rows).toStrictEqual([{ Name: "Ada", Age: 36 }]);
    });

    it("should throw for a first argument that is neither a sheet nor a range", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getValues("A1:B2")).toThrow(InvalidSheetException);
    });
  });
});
