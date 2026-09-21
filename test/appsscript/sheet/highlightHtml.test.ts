import { highlightHtml } from "@/appsscript";
import { IllegalArgumentException, InvalidRangeException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

interface StyleCall {
  start: number;
  end: number;
  color: string;
}

interface Built {
  text: string;
  styles: StyleCall[];
}

/**
 * The colours the default theme assigns to each syntax role.
 */
const COLOR = {
  text: "#000000",
  tag: "#8e004b",
  attrName: "#9f4311",
  attrValue: "#0742a0",
  comment: "#808080"
} as const;

let built: Built[] = [];

/**
 * Installs the `SpreadsheetApp` factories the function relies on. The text
 * style builder yields a plain snapshot of the properties set on it, which is
 * enough to tell the five theme roles apart by colour.
 */
function installSpreadsheetApp(): void {
  (globalThis as Mutable).SpreadsheetApp = {
    newTextStyle: () => {
      const props: Record<string, unknown> = {};

      const builder = {
        setFontFamily: (value: string) => ((props.font = value), builder),
        setFontSize: (value: number) => ((props.size = value), builder),
        setForegroundColor: (value: string) => ((props.color = value), builder),
        setItalic: (value: boolean) => ((props.italic = value), builder),
        setBold: (value: boolean) => ((props.bold = value), builder),
        setUnderline: (value: boolean) => ((props.underline = value), builder),
        setStrikethrough: (value: boolean) => ((props.strikethrough = value), builder),
        build: () => ({ ...props })
      };

      return builder;
    },

    newRichTextValue: () => {
      const record: Built = { text: "", styles: [] };

      const builder = {
        setText: (value: string) => ((record.text = value), builder),
        setTextStyle: (start: number, end: number, style: { color?: string }) => (
          record.styles.push({ start, end, color: style?.color ?? "" }),
          builder
        ),
        build: () => (built.push(record), record)
      };

      return builder;
    }
  };
}

interface RangeMock {
  range: GoogleAppsScript.Spreadsheet.Range;
  calls: { single: unknown[]; grid: unknown[] };
}

function rangeMock(displayValues: string[][]): RangeMock {
  const calls: { single: unknown[]; grid: unknown[] } = { single: [], grid: [] };

  const range = {
    toString: () => "Range",
    getDisplayValues: () => displayValues,
    getNumRows: () => displayValues.length,
    getNumColumns: () => displayValues[0]?.length ?? 0,
    setRichTextValue: (value: unknown) => (calls.single.push(value), range),
    setRichTextValues: (values: unknown) => (calls.grid.push(values), range)
  };

  return { range: range as unknown as GoogleAppsScript.Spreadsheet.Range, calls };
}

/**
 * The colour of the last style covering `index`, i.e. the one that wins.
 */
function colorAt(record: Built, index: number): string {
  let color = "";

  for (const style of record.styles) {
    if (index >= style.start && index < style.end) {
      color = style.color;
    }
  }

  return color;
}

describe("highlightHtml", () => {
  beforeEach(() => {
    built = [];
    installSpreadsheetApp();
  });

  afterEach(() => {
    delete (globalThis as Mutable).SpreadsheetApp;
  });

  describe("Correct input data", () => {
    it("should return the range for chaining", () => {
      const { range } = rangeMock([["<p>hi</p>"]]);

      expect(highlightHtml(range)).toBe(range);
    });

    it("should write a single cell through setRichTextValue", () => {
      const { range, calls } = rangeMock([["<p>hi</p>"]]);

      highlightHtml(range);

      expect(calls.single).toHaveLength(1);
      expect(calls.grid).toHaveLength(0);
    });

    it("should write a multi-cell range through setRichTextValues", () => {
      const { range, calls } = rangeMock([["<p>a</p>"], ["<p>b</p>"]]);

      highlightHtml(range);

      expect(calls.grid).toHaveLength(1);
      expect(calls.single).toHaveLength(0);
    });

    it("should keep the cell text unchanged", () => {
      const html = '<p class="a">hi</p>';

      const { range } = rangeMock([[html]]);

      highlightHtml(range);

      expect(built[0].text).toBe(html);
    });

    it("should colour the whole cell as text before anything else", () => {
      const html = "plain";

      const { range } = rangeMock([[html]]);

      highlightHtml(range);

      expect(built[0].styles[0]).toStrictEqual({
        start: 0,
        end: html.length,
        color: COLOR.text
      });
    });

    it("should colour the tags", () => {
      const html = "<p>hi</p>";

      const { range } = rangeMock([[html]]);

      highlightHtml(range);

      expect(colorAt(built[0], html.indexOf("<p"))).toBe(COLOR.tag);
      expect(colorAt(built[0], html.indexOf("</p"))).toBe(COLOR.tag);
      expect(colorAt(built[0], html.indexOf("hi"))).toBe(COLOR.text);
    });

    it("should colour an attribute name and its value differently", () => {
      const html = '<p class="a">hi</p>';

      const { range } = rangeMock([[html]]);

      highlightHtml(range);

      expect(colorAt(built[0], html.indexOf("class"))).toBe(COLOR.attrName);
      expect(colorAt(built[0], html.indexOf('"a"') + 1)).toBe(COLOR.attrValue);
    });

    it("should colour a comment", () => {
      const html = "<!-- note -->";

      const { range } = rangeMock([[html]]);

      highlightHtml(range);

      expect(colorAt(built[0], html.indexOf("note"))).toBe(COLOR.comment);
    });

    it("should leave an empty or blank cell empty", () => {
      const { range } = rangeMock([["", "   "]]);

      highlightHtml(range);

      expect(built[0].text).toBe("");
      expect(built[0].styles).toHaveLength(0);
      expect(built[1].text).toBe("");
    });

    it("should let a theme override a role colour", () => {
      const html = "<p>hi</p>";

      const { range } = rangeMock([[html]]);

      highlightHtml(range, { tag: { color: "#123456" } });

      expect(colorAt(built[0], html.indexOf("<p"))).toBe("#123456");
    });

    it("should keep the default for the roles a partial theme omits", () => {
      const html = '<p class="a">hi</p>';

      const { range } = rangeMock([[html]]);

      highlightHtml(range, { tag: { color: "#123456" } });

      expect(colorAt(built[0], html.indexOf("class"))).toBe(COLOR.attrName);
    });

    it("should accept a null or undefined theme", () => {
      const html = "<p>hi</p>";

      for (const theme of [null, undefined]) {
        built = [];

        const { range } = rangeMock([[html]]);

        highlightHtml(range, theme);

        expect(colorAt(built[0], html.indexOf("<p"))).toBe(COLOR.tag);
      }
    });

    it("should fall back to the default for a role set to null", () => {
      const html = "<!-- note -->";

      const { range } = rangeMock([[html]]);

      highlightHtml(range, { comment: null });

      expect(colorAt(built[0], html.indexOf("note"))).toBe(COLOR.comment);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid types
      expect(() => highlightHtml()).toThrow(IllegalArgumentException);
    });

    it("should throw when the value is not a Range", () => {
      for (const value of [null, undefined, 0, "", "Range", [], {}, () => {}]) {
        // @ts-expect-error - testing invalid types
        expect(() => highlightHtml(value)).toThrow(InvalidRangeException);
      }
    });
  });
});
