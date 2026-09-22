# net

<link-summary>URL, path, and domain helpers.</link-summary>

<web-summary>The net module of apps-script-utils: URL validation, path parsing, joining and normalisation, and domain checks that work inside Google Apps Script.</web-summary>

`net` covers paths, URLs, and the pieces around them. Like `lang`, it does not depend on the Apps Script runtime.

## Packages

| Package       | Covers                                                   |
| :------------ | :------------------------------------------------------- |
| `net/path`    | path joining, normalisation, parsing, and classification |
| `net/url`     | URL validation                                           |
| `net/emitter` | reserved; not implemented yet                            |

Request authentication lives in `appsscript/net` rather than here, because it is bound to the Apps Script request
object — see [](module-appsscript.md).

## Paths

```typescript
import { join, normalize, parse, isAbsolute, isRelative } from "apps-script-utils";

join("/a", "b", "../c"); // "/a/c"
normalize("/a/b/../c"); // "/a/c"

parse("/a/b/file.txt");
// { root: "/", dir: "/a/b", base: "file.txt", name: "file", ext: ".txt" }

isAbsolute("/a/b"); // true
isRelative("a/b"); // true
```

These mirror the shape of Node's `path` module, which makes them useful for building Drive folder paths and for any
code that has to assemble a location out of parts without a real filesystem underneath.

## Domains and URLs

```typescript
import { isValidDomain, isUrl } from "apps-script-utils";

isValidDomain("example.com"); // true
isValidDomain("not a domain"); // false

isUrl("https://example.com/path"); // true
isUrl("ftp://ftp.example.org/file.txt"); // true
isUrl("invalid-url"); // false
isUrl("  https://example.com "); // false — surrounding whitespace is not trimmed
```

`isUrl` accepts the `http`, `https`, and `ftp` schemes and requires a non-empty authority, so it rejects a bare
scheme such as `"https://"`. It does not accept `mailto:` or a protocol-relative `//example.com`.

## Full list

[](reference-path.md) lists the `path` functions. `isUrl` is listed with the runtime-independent functions in
[](reference-base.md).
