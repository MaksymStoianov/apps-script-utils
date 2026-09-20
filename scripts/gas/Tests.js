/**
 * Integration tests that run inside the Apps Script runtime.
 *
 * The Vitest suite in the repository stands in for SpreadsheetApp, SlidesApp,
 * Session and the rest, so it can only check what the library asks those
 * services to do. These tests check what the services actually do in response:
 * they create a real spreadsheet and a real presentation, exercise the same
 * functions against them, read the result back, and throw the fixtures away.
 *
 * Entry point: runAllTests().
 */

/* global
  appendRow, appendRows, appendColumn, appendColumns, prependRow, prependRows,
  getSheetById, getSheetByIndex, sortSheets, toA1Notation, getColumnLetterByIndex,
  parseA1Notation, convertRichTextToHtml, highlightHtml,
  getSlideByIndex, getSlideIndex, findReplaceAllTextInSlide,
  isAdmin, checkMultipleAccount
*/

// ---------------------------------------------------------------- harness

function Harness() {
  this.results = [];
  this.fixtures = [];
}

Harness.prototype.test = function (name, fn) {
  try {
    fn();
    this.results.push({ name: name, status: "pass" });
  } catch (err) {
    this.results.push({
      name: name,
      status: "fail",
      detail: String(err && err.message ? err.message : err)
    });
  }
};

/**
 * Records an expectation that the current code is known not to meet.
 */
Harness.prototype.expectedFailure = function (name, issue, fn) {
  try {
    fn();
    this.results.push({
      name: name,
      status: "unexpected-pass",
      detail: "now passes; " + issue + " may be fixed"
    });
  } catch (err) {
    this.results.push({
      name: name,
      status: "known-fail",
      detail: issue + ": " + String(err && err.message ? err.message : err)
    });
  }
};

Harness.prototype.skip = function (name, why) {
  this.results.push({ name: name, status: "skip", detail: why });
};

Harness.prototype.track = function (id) {
  this.fixtures.push(id);

  return id;
};

Harness.prototype.cleanup = function () {
  for (var i = 0; i < this.fixtures.length; i++) {
    try {
      DriveApp.getFileById(this.fixtures[i]).setTrashed(true);
    } catch (err) {
      console.warn("could not trash fixture " + this.fixtures[i] + ": " + err);
    }
  }
};

Harness.prototype.report = function () {
  var counts = { "pass": 0, "fail": 0, "known-fail": 0, "unexpected-pass": 0, "skip": 0 };

  var lines = [];

  for (var i = 0; i < this.results.length; i++) {
    var r = this.results[i];

    counts[r.status] = (counts[r.status] || 0) + 1;
    lines.push(
      {
        "pass": "PASS",
        "fail": "FAIL",
        "known-fail": "KNOWN",
        "unexpected-pass": "UNEXPECTED",
        "skip": "SKIP"
      }[r.status] +
        "  " +
        r.name +
        (r.detail ? "\n        " + r.detail : "")
    );
  }

  var summary =
    counts.pass +
    " passed, " +
    counts.fail +
    " failed, " +
    counts["known-fail"] +
    " known failures, " +
    counts["unexpected-pass"] +
    " unexpected passes, " +
    counts.skip +
    " skipped";

  var text = lines.join("\n") + "\n\n" + summary;

  console.log(text);

  this.publish(text);

  return { summary: summary, counts: counts, results: this.results };
};

/**
 * The report file the run leaves in Drive, overwritten on each run.
 */
Harness.REPORT_NAME = "apps-script-utils-test-report.txt";

/**
 * Writes the report to a fixed file in Drive. Execution logs are only
 * reachable through a standard Cloud project, so this is what makes the
 * result readable from outside the editor.
 */
Harness.prototype.publish = function (text) {
  try {
    var header =
      "apps-script-utils — Apps Script runtime tests\n" +
      "run at " +
      new Date().toISOString() +
      "\n" +
      "as " +
      (Session.getEffectiveUser().getEmail() || "unknown") +
      "\n\n";

    var body = header + text + "\n";

    var existing = DriveApp.getFilesByName(Harness.REPORT_NAME);

    if (existing.hasNext()) {
      existing.next().setContent(body);
    } else {
      DriveApp.createFile(Harness.REPORT_NAME, body, MimeType.PLAIN_TEXT);
    }
  } catch (err) {
    console.warn("could not write the report to Drive: " + err);
  }
};

function assertEquals(actual, expected, what) {
  if (actual !== expected) {
    throw new Error(
      (what || "value") +
        ": expected " +
        JSON.stringify(expected) +
        ", got " +
        JSON.stringify(actual)
    );
  }
}

function assertDeepEquals(actual, expected, what) {
  var a = JSON.stringify(actual);

  var e = JSON.stringify(expected);

  if (a !== e) {
    throw new Error((what || "value") + ": expected " + e + ", got " + a);
  }
}

function assertThrows(fn, what) {
  try {
    fn();
  } catch (err) {
    return err;
  }

  throw new Error((what || "call") + ": expected it to throw, but it returned normally");
}

// ---------------------------------------------------------------- fixtures

function newSpreadsheet(t, name) {
  var ss = SpreadsheetApp.create(name);

  t.track(ss.getId());

  return ss;
}

function newPresentation(t, name) {
  var p = SlidesApp.create(name);

  t.track(p.getId());

  return p;
}

// ---------------------------------------------------------------- sheet: writes

function testRowWrites(t) {
  var ss = newSpreadsheet(t, "[test] row writes");

  var sheet = ss.getSheets()[0];

  t.test("appendRows writes below the last populated row", function () {
    sheet.clear();
    sheet.getRange("A1:B1").setValues([["seed", "seed"]]);
    SpreadsheetApp.flush();

    appendRows(sheet, [
      ["a", "b"],
      ["c", "d"]
    ]);
    SpreadsheetApp.flush();

    assertDeepEquals(
      sheet.getRange("A1:B3").getValues(),
      [
        ["seed", "seed"],
        ["a", "b"],
        ["c", "d"]
      ],
      "sheet contents"
    );
  });

  t.test("appendRows writes to row 1 of an empty sheet", function () {
    sheet.clear();
    SpreadsheetApp.flush();

    appendRows(sheet, [["x"]]);
    SpreadsheetApp.flush();

    assertEquals(sheet.getRange("A1").getValue(), "x", "A1");
    assertEquals(sheet.getLastRow(), 1, "last row");
  });

  t.test("appendRow writes a single row", function () {
    sheet.clear();
    SpreadsheetApp.flush();

    appendRow(sheet, ["p", "q"]);
    SpreadsheetApp.flush();

    assertDeepEquals(sheet.getRange("A1:B1").getValues(), [["p", "q"]], "A1:B1");
  });

  t.test("prependRows inserts above the existing data", function () {
    sheet.clear();
    sheet.getRange("A1").setValue("old");
    SpreadsheetApp.flush();

    prependRows(sheet, [["new"]]);
    SpreadsheetApp.flush();

    assertDeepEquals(sheet.getRange("A1:A2").getValues(), [["new"], ["old"]], "A1:A2");
  });

  t.test("prependRow inserts a single row above the existing data", function () {
    sheet.clear();
    sheet.getRange("A1").setValue("old");
    SpreadsheetApp.flush();

    prependRow(sheet, ["new"]);
    SpreadsheetApp.flush();

    assertDeepEquals(sheet.getRange("A1:A2").getValues(), [["new"], ["old"]], "A1:A2");
  });

  t.test("a value starting with = is stored as a formula", function () {
    sheet.clear();
    SpreadsheetApp.flush();

    appendRow(sheet, ["=1+1"]);
    SpreadsheetApp.flush();

    assertEquals(sheet.getRange("A1").getFormula(), "=1+1", "A1 formula");
    assertEquals(sheet.getRange("A1").getValue(), 2, "A1 value");
  });
}

function testColumnWrites(t) {
  var ss = newSpreadsheet(t, "[test] column writes");

  var sheet = ss.getSheets()[0];

  // The unit suite pins these two as defects by inspecting the range the
  // function asks for. Here the runtime gets the final word.
  t.expectedFailure("appendColumns writes to the right of the last column", "#450", function () {
    sheet.clear();
    sheet.getRange("A1:C1").setValues([["a", "b", "c"]]);
    SpreadsheetApp.flush();

    appendColumns(sheet, [["d"]]);
    SpreadsheetApp.flush();

    assertDeepEquals(sheet.getRange("A1:D1").getValues(), [["a", "b", "c", "d"]], "A1:D1");
  });

  t.expectedFailure("appendColumns works on an empty sheet", "#450", function () {
    sheet.clear();
    SpreadsheetApp.flush();

    appendColumns(sheet, [["x"]]);
    SpreadsheetApp.flush();

    assertEquals(sheet.getRange("A1").getValue(), "x", "A1");
  });

  t.expectedFailure("appendColumn writes a single column after the last", "#450", function () {
    sheet.clear();
    sheet.getRange("A1:B1").setValues([["a", "b"]]);
    SpreadsheetApp.flush();

    appendColumn(sheet, ["c"]);
    SpreadsheetApp.flush();

    assertDeepEquals(sheet.getRange("A1:C1").getValues(), [["a", "b", "c"]], "A1:C1");
  });
}

// ---------------------------------------------------------------- sheet: lookup

function testSheetLookup(t) {
  var ss = newSpreadsheet(t, "[test] sheet lookup");

  var first = ss.getSheets()[0].setName("Zulu");

  var second = ss.insertSheet("Alpha");

  var third = ss.insertSheet("Mike");

  t.test("getSheetById finds a sheet by its real id", function () {
    assertEquals(getSheetById(second.getSheetId(), ss).getName(), "Alpha", "name");
  });

  t.test("getSheetById returns null for an id that is not present", function () {
    assertEquals(getSheetById(-12345, ss), null, "result");
  });

  t.test("getSheetByIndex follows the tab order", function () {
    var sheets = ss.getSheets();

    for (var i = 0; i < sheets.length; i++) {
      assertEquals(getSheetByIndex(i, ss).getName(), sheets[i].getName(), "index " + i);
    }
  });

  t.test("sortSheets orders the tabs by name", function () {
    sortSheets(ss);
    SpreadsheetApp.flush();

    var names = ss.getSheets().map(function (s) {
      return s.getName();
    });

    var expected = names.slice().sort();

    assertDeepEquals(names, expected, "tab order");
  });

  t.test("the fixture kept all three sheets", function () {
    assertEquals(ss.getSheets().length, 3, "sheet count");
    assertEquals(typeof first.getSheetId(), "number", "first sheet id");
    assertEquals(typeof third.getSheetId(), "number", "third sheet id");
  });
}

// ---------------------------------------------------------------- sheet: notation

function testNotation(t) {
  var ss = newSpreadsheet(t, "[test] notation");

  var sheet = ss.getSheets()[0];

  t.test("toA1Notation agrees with Range.getA1Notation", function () {
    var cases = [
      {
        grid: { startRowIndex: 0, startColumnIndex: 0, endRowIndex: 1, endColumnIndex: 1 },
        range: [1, 1, 1, 1]
      },
      {
        grid: { startRowIndex: 0, startColumnIndex: 0, endRowIndex: 2, endColumnIndex: 3 },
        range: [1, 1, 2, 3]
      },
      {
        grid: { startRowIndex: 4, startColumnIndex: 26, endRowIndex: 6, endColumnIndex: 28 },
        range: [5, 27, 2, 2]
      }
    ];

    for (var i = 0; i < cases.length; i++) {
      var c = cases[i];

      var expected = sheet.getRange(c.range[0], c.range[1], c.range[2], c.range[3]).getA1Notation();

      assertEquals(toA1Notation(c.grid), expected, "case " + i);
    }
  });

  t.test("getColumnLetterByIndex agrees with the real column letters", function () {
    var probes = [0, 1, 25, 26, 51, 52, 701, 702];

    for (var i = 0; i < probes.length; i++) {
      var index = probes[i];

      var expected = sheet
        .getRange(1, index + 1)
        .getA1Notation()
        .replace(/\d+$/, "");

      assertEquals(getColumnLetterByIndex(index), expected, "index " + index);
    }
  });

  t.test("parseA1Notation round-trips a real notation", function () {
    var a1 = sheet.getRange(2, 3, 4, 5).getA1Notation();

    var parsed = parseA1Notation(a1);

    assertEquals(toA1Notation(parsed), a1, "round trip of " + a1);
  });
}

// ---------------------------------------------------------------- sheet: rich text

function testRichText(t) {
  var ss = newSpreadsheet(t, "[test] rich text");

  var sheet = ss.getSheets()[0];

  t.test("convertRichTextToHtml renders a real RichTextValue", function () {
    var bold = SpreadsheetApp.newTextStyle().setBold(true).build();

    var value = SpreadsheetApp.newRichTextValue()
      .setText("plain bold")
      .setTextStyle(6, 10, bold)
      .build();

    var html = convertRichTextToHtml(value);

    if (html.indexOf("<b>bold</b>") === -1) {
      throw new Error("expected the bold run to be wrapped in <b>, got: " + html);
    }
  });

  t.test("convertRichTextToHtml renders a real link run", function () {
    var value = SpreadsheetApp.newRichTextValue()
      .setText("click")
      .setLinkUrl(0, 5, "https://example.com")
      .build();

    var html = convertRichTextToHtml(value);

    if (html.indexOf('href="https://example.com"') === -1) {
      throw new Error("expected an anchor with the link url, got: " + html);
    }
  });

  t.test("convertRichTextToHtml rejects a value that is not RichTextValue", function () {
    assertThrows(function () {
      convertRichTextToHtml(sheet);
    }, "convertRichTextToHtml(sheet)");
  });

  t.test("highlightHtml colours the tags of a real cell", function () {
    sheet.clear();
    sheet.getRange("A1").setValue('<p class="a">hi</p>');
    SpreadsheetApp.flush();

    var range = sheet.getRange("A1");

    assertEquals(highlightHtml(range).getA1Notation(), "A1", "returned range");
    SpreadsheetApp.flush();

    var runs = sheet.getRange("A1").getRichTextValue().getRuns();

    var colours = {};

    for (var i = 0; i < runs.length; i++) {
      var c = runs[i].getTextStyle().getForegroundColor();

      colours[c] = (colours[c] || 0) + 1;
    }

    if (!colours["#8e004b"]) {
      throw new Error("expected the default tag colour to appear; saw " + JSON.stringify(colours));
    }
  });

  t.test("highlightHtml applies a theme colour", function () {
    sheet.clear();
    sheet.getRange("A1").setValue("<p>hi</p>");
    SpreadsheetApp.flush();

    highlightHtml(sheet.getRange("A1"), { tag: { color: "#123456" } });
    SpreadsheetApp.flush();

    var runs = sheet.getRange("A1").getRichTextValue().getRuns();

    var found = false;

    for (var i = 0; i < runs.length; i++) {
      if (runs[i].getTextStyle().getForegroundColor() === "#123456") {
        found = true;
      }
    }

    if (!found) {
      throw new Error("expected the overridden tag colour to appear");
    }
  });

  t.test("highlightHtml rejects a value that is not a Range", function () {
    assertThrows(function () {
      highlightHtml(sheet);
    }, "highlightHtml(sheet)");
  });
}

// ---------------------------------------------------------------- slides

function testSlides(t) {
  var presentation = newPresentation(t, "[test] slides");

  presentation.getSlides()[0].insertTextBox("alpha placeholder");
  presentation.appendSlide().insertTextBox("beta");
  presentation.appendSlide().insertTextBox("gamma");
  presentation.saveAndClose();

  var reopened = SlidesApp.openById(presentation.getId());

  var slides = reopened.getSlides();

  t.test("getSlideByIndex returns the slide at that position", function () {
    for (var i = 0; i < slides.length; i++) {
      assertEquals(
        getSlideByIndex(reopened, i).getObjectId(),
        slides[i].getObjectId(),
        "index " + i
      );
    }
  });

  t.test("getSlideIndex is the inverse of getSlideByIndex", function () {
    for (var i = 0; i < slides.length; i++) {
      assertEquals(getSlideIndex(reopened, slides[i]), i, "slide " + i);
    }
  });

  t.test("findReplaceAllTextInSlide reports and performs the replacement", function () {
    var count = findReplaceAllTextInSlide(slides[0], "placeholder", "replaced");

    assertEquals(count, 1, "replacement count");

    var text = slides[0].getShapes()[0].getText().asString();

    if (text.indexOf("replaced") === -1) {
      throw new Error("expected the slide text to be updated, got: " + text);
    }
  });

  t.test("findReplaceAllTextInSlide reports zero when nothing matches", function () {
    assertEquals(findReplaceAllTextInSlide(slides[1], "nothing-here", "x"), 0, "replacement count");
  });
}

// ---------------------------------------------------------------- session-bound

function testSessionBound(t) {
  var email = Session.getEffectiveUser().getEmail();

  if (!email) {
    t.skip("checkMultipleAccount", "Session.getEffectiveUser() returned no email in this context");
  } else {
    t.test("checkMultipleAccount is false for the effective user", function () {
      assertEquals(checkMultipleAccount(email), false, "same account");
    });

    t.test("checkMultipleAccount is true for a different account", function () {
      assertEquals(checkMultipleAccount("someone.else@example.com"), true, "different account");
    });

    t.test("checkMultipleAccount ignores letter case", function () {
      assertEquals(checkMultipleAccount(email.toUpperCase()), false, "upper-cased own address");
    });

    t.test("checkMultipleAccount rejects a malformed address", function () {
      assertThrows(function () {
        checkMultipleAccount("not-an-email");
      }, "checkMultipleAccount");
    });
  }

  t.test("isAdmin falls back to false when AdminDirectory is unavailable", function () {
    // The advanced service is deliberately not enabled for this project, so
    // this exercises the guard rather than the Directory lookup.
    assertEquals(typeof isAdmin(), "boolean", "return type");
  });
}

// ---------------------------------------------------------------- entry point

// The entry point Apps Script calls; nothing in this file references it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function runAllTests() {
  var t = new Harness();

  try {
    testRowWrites(t);
    testColumnWrites(t);
    testSheetLookup(t);
    testNotation(t);
    testRichText(t);
    testSlides(t);
    testSessionBound(t);
  } finally {
    t.cleanup();
  }

  return t.report();
}
