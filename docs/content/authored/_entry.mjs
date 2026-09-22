/** Assembles one prose entry from a table keyed by field, then by language. */

const LANGUAGE_CODES = ["en", "ru", "uk", "de", "fr"];

export function entry({
  examples,
  seeAlso,
  summary,
  description,
  params = {},
  returns,
  throws = {},
  title
}) {
  const result = { examples, seeAlso };

  for (const code of LANGUAGE_CODES) {
    result[code] = {
      summary: summary[code],
      description: description[code],
      params: Object.fromEntries(Object.entries(params).map(([name, text]) => [name, text[code]])),
      returns: returns[code],
      throws: Object.fromEntries(Object.entries(throws).map(([name, text]) => [name, text[code]])),
      titles: [title[code]]
    };
  }

  return result;
}

/** Short-hand for a value that is only described in one sentence per language. */
export function code(body) {
  return [{ body: ["```javascript", body, "```"].join("\n") }];
}
