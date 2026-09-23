# net

<link-summary>Helfer für URLs, Pfade und Domains.</link-summary>

<web-summary>Das net-Modul von apps-script-utils: URL-Prüfung, Pfade zerlegen, zusammenfügen und normalisieren, Domain-Prüfungen — alles auch innerhalb von Google Apps Script.</web-summary>

`net` behandelt Pfade, URLs und das, was darum herum liegt. Wie `lang` hängt es nicht von der Apps-Script-Laufzeit
ab.

## Pakete

| Paket         | Enthält                                                    |
| :------------ | :--------------------------------------------------------- |
| `net/path`    | Pfade zusammenfügen, normalisieren, zerlegen und einordnen |
| `net/url`     | URL-Prüfung                                                |
| `net/emitter` | reserviert, noch nicht umgesetzt                           |

Die Authentifizierung von Anfragen liegt in `appsscript/net` statt hier, weil sie an das Anfrageobjekt von Apps
Script gebunden ist — siehe [](module-appsscript.md).

## Pfade

```typescript
import { join, normalize, parse, isAbsolute, isRelative } from "apps-script-utils";

join("/a", "b", "../c"); // "/a/c"
normalize("/a/b/../c"); // "/a/c"

parse("/a/b/file.txt");
// { root: "/", dir: "/a/b", base: "file.txt", name: "file", ext: ".txt" }

isAbsolute("/a/b"); // true
isRelative("a/b"); // true
```

Sie sind der Form von Nodes `path`-Modul nachgebildet, was sie für den Aufbau von Drive-Ordnerpfaden nützlich macht
— und für jeden Code, der einen Ort aus Teilen zusammensetzen muss, ohne ein echtes Dateisystem darunter.

## Domains und URLs

```typescript
import { isValidDomain, isUrl } from "apps-script-utils";

isValidDomain("example.com"); // true
isValidDomain("not a domain"); // false

isUrl("https://example.com/path"); // true
isUrl("ftp://ftp.example.org/file.txt"); // true
isUrl("invalid-url"); // false
isUrl("  https://example.com "); // false — umgebender Leerraum wird nicht entfernt
```

`isUrl` akzeptiert die Schemata `http`, `https` und `ftp` und verlangt eine nicht leere Authority; ein blankes
Schema wie `"https://"` fällt also durch. Weder `mailto:` noch ein protokollrelatives `//example.com` wird
akzeptiert.

## Vollständige Liste

[](reference-path.md) listet die `path`-Funktionen. `isUrl` steht bei den laufzeitunabhängigen Funktionen in
[](reference-base.md).
