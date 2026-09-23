# net

<link-summary>Aides pour les URL, les chemins et les domaines.</link-summary>

<web-summary>Le module net d'apps-script-utils : validation d'URL, analyse, assemblage et normalisation de chemins, contrôles de domaine — le tout utilisable dans Google Apps Script.</web-summary>

`net` couvre les chemins, les URL et ce qui gravite autour. Comme `lang`, il ne dépend pas de l'environnement Apps
Script.

## Paquets

| Paquet        | Couvre                                                          |
| :------------ | :-------------------------------------------------------------- |
| `net/path`    | assemblage, normalisation, analyse et classification de chemins |
| `net/url`     | validation d'URL                                                |
| `net/emitter` | réservé, pas encore implémenté                                  |

L'authentification des requêtes vit dans `appsscript/net` plutôt qu'ici, car elle est liée à l'objet de requête
d'Apps Script — voir [](module-appsscript.md).

## Chemins

```typescript
import { join, normalize, parse, isAbsolute, isRelative } from "apps-script-utils";

join("/a", "b", "../c"); // "/a/c"
normalize("/a/b/../c"); // "/a/c"

parse("/a/b/file.txt");
// { root: "/", dir: "/a/b", base: "file.txt", name: "file", ext: ".txt" }

isAbsolute("/a/b"); // true
isRelative("a/b"); // true
```

Elles reprennent la forme du module `path` de Node, ce qui les rend utiles pour construire des chemins de dossiers
Drive et, plus largement, pour tout code qui doit composer un emplacement à partir de morceaux sans système de
fichiers dessous.

## Domaines et URL

```typescript
import { isValidDomain, isUrl } from "apps-script-utils";

isValidDomain("example.com"); // true
isValidDomain("not a domain"); // false

isUrl("https://example.com/path"); // true
isUrl("ftp://ftp.example.org/file.txt"); // true
isUrl("invalid-url"); // false
isUrl("  https://example.com "); // false — les espaces autour ne sont pas retirés
```

`isUrl` accepte les schémas `http`, `https` et `ftp` et exige une autorité non vide : un schéma nu comme
`"https://"` est donc rejeté. Ni `mailto:` ni un `//example.com` relatif au protocole ne sont acceptés.

## Liste complète

[](reference-path.md) liste les fonctions `path`. `isUrl` figure parmi les fonctions indépendantes de
l'environnement, dans [](reference-base.md).
