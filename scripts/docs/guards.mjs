/**
 * The subjects of the guard families, and how each language talks about them.
 *
 * `scripts/docs/author-guards.mjs` turns this into the prose files under
 * `docs/content/<language>/functions/`. Everything here is written by hand:
 * the grammatical forms a sentence needs, the one thing about each subject that
 * is worth knowing, and the values the examples are built from.
 *
 * `yes` and `no` are literal source expressions. They are checked against the
 * real implementation by `npm run docs:verify-examples`, so a wrong sample fails
 * the test suite rather than misleading a reader.
 */

export const SUBJECTS = {
  Array: {
    yes: ["[]", "[1, 2, 3]"],
    no: ['"abc"', "{ length: 0 }", "null"],
    en: {
      is: "an array",
      non: "an array",
      acc: "an array",
      note: "`Array.isArray` is the whole test, so an array from another frame counts and an array-like object — `arguments`, a `NodeList`, `{ length: 0 }` — does not."
    },
    ru: {
      is: "массивом",
      non: "массивом",
      acc: "массив",
      note: "Проверка целиком сводится к `Array.isArray`, поэтому массив из другого фрейма подходит, а похожий на массив объект — `arguments`, `NodeList`, `{ length: 0 }` — нет."
    },
    uk: {
      is: "масивом",
      non: "масивом",
      acc: "масив",
      note: "Перевірка цілком зводиться до `Array.isArray`, тому масив з іншого фрейму підходить, а схожий на масив об'єкт — `arguments`, `NodeList`, `{ length: 0 }` — ні."
    },
    de: {
      is: "ein Array",
      non: "ein Array",
      acc: "ein Array",
      note: "Die Prüfung ist genau `Array.isArray`: ein Array aus einem anderen Frame zählt, ein array-ähnliches Objekt — `arguments`, eine `NodeList`, `{ length: 0 }` — nicht."
    },
    fr: {
      is: "un tableau",
      non: "un tableau",
      acc: "un tableau",
      note: "Le test se réduit à `Array.isArray` : un tableau venu d'un autre frame compte, un objet ressemblant à un tableau — `arguments`, une `NodeList`, `{ length: 0 }` — non."
    }
  },

  Boolean: {
    yes: ["true", "false"],
    no: ['"true"', "1", "null"],
    en: {
      is: "a boolean",
      non: "a boolean",
      acc: "a boolean",
      note: 'Only the two primitives pass. `new Boolean(false)` is an object, and the strings `"true"` and `"false"` are strings.'
    },
    ru: {
      is: "логическим значением",
      non: "логическим значением",
      acc: "логическое значение",
      note: 'Подходят только два примитива. `new Boolean(false)` — это объект, а строки `"true"` и `"false"` остаются строками.'
    },
    uk: {
      is: "логічним значенням",
      non: "логічним значенням",
      acc: "логічне значення",
      note: 'Підходять лише два примітиви. `new Boolean(false)` — це об\'єкт, а рядки `"true"` і `"false"` лишаються рядками.'
    },
    de: {
      is: "ein boolescher Wert",
      non: "ein boolescher Wert",
      acc: "einen booleschen Wert",
      note: 'Nur die beiden Primitiven bestehen. `new Boolean(false)` ist ein Objekt, und die Zeichenketten `"true"` und `"false"` bleiben Zeichenketten.'
    },
    fr: {
      is: "un booléen",
      non: "un booléen",
      acc: "un booléen",
      note: 'Seules les deux primitives passent. `new Boolean(false)` est un objet, et les chaînes `"true"` et `"false"` restent des chaînes.'
    }
  },

  String: {
    yes: ['""', '"abc"'],
    no: ["1", "null", "[]"],
    en: {
      is: "a string",
      non: "a string",
      acc: "a string",
      note: 'The test is `typeof value === "string"`, so the empty string passes and a `String` object, being an object, does not.'
    },
    ru: {
      is: "строкой",
      non: "строкой",
      acc: "строку",
      note: 'Проверяется `typeof value === "string"`, поэтому пустая строка подходит, а объект `String` — нет, он объект.'
    },
    uk: {
      is: "рядком",
      non: "рядком",
      acc: "рядок",
      note: "Перевіряється `typeof value === \"string\"`, тому порожній рядок підходить, а об'єкт `String` — ні, він об'єкт."
    },
    de: {
      is: "eine Zeichenkette",
      non: "eine Zeichenkette",
      acc: "eine Zeichenkette",
      note: 'Geprüft wird `typeof value === "string"`: die leere Zeichenkette besteht, ein `String`-Objekt nicht, denn es ist ein Objekt.'
    },
    fr: {
      is: "une chaîne de caractères",
      non: "une chaîne de caractères",
      acc: "une chaîne de caractères",
      note: 'Le test est `typeof value === "string"` : la chaîne vide passe, un objet `String` non, puisque c\'est un objet.'
    }
  },

  Number: {
    yes: ["0", "1.5", "NaN", "Infinity"],
    no: ['"1"', "null"],
    en: {
      is: "a number",
      non: "a number",
      acc: "a number",
      note: 'The test is `typeof value === "number"`, which `NaN` and both infinities satisfy. Use `isFloat`, `isInteger` or `isNaN` when those cases have to be told apart.'
    },
    ru: {
      is: "числом",
      non: "числом",
      acc: "число",
      note: 'Проверяется `typeof value === "number"`, чему удовлетворяют и `NaN`, и обе бесконечности. Когда эти случаи нужно различать, берите `isFloat`, `isInteger` или `isNaN`.'
    },
    uk: {
      is: "числом",
      non: "числом",
      acc: "число",
      note: 'Перевіряється `typeof value === "number"`, чому задовольняють і `NaN`, і обидві нескінченності. Коли ці випадки треба розрізняти, беріть `isFloat`, `isInteger` або `isNaN`.'
    },
    de: {
      is: "eine Zahl",
      non: "eine Zahl",
      acc: "eine Zahl",
      note: 'Geprüft wird `typeof value === "number"`, was auch `NaN` und beide Unendlichkeiten erfüllen. Für diese Fälle sind `isFloat`, `isInteger` oder `isNaN` gedacht.'
    },
    fr: {
      is: "un nombre",
      non: "un nombre",
      acc: "un nombre",
      note: 'Le test est `typeof value === "number"`, que `NaN` et les deux infinis satisfont également. Utilisez `isFloat`, `isInteger` ou `isNaN` quand ces cas doivent être distingués.'
    }
  },

  Symbol: {
    yes: ['Symbol("id")', "Symbol.iterator"],
    no: ['"id"', "null"],
    en: {
      is: "a symbol",
      non: "a symbol",
      acc: "a symbol",
      note: "Registered symbols from `Symbol.for` and the well-known symbols both pass; nothing else does."
    },
    ru: {
      is: "символом",
      non: "символом",
      acc: "символ",
      note: "Подходят и символы из `Symbol.for`, и общеизвестные символы; больше ничего."
    },
    uk: {
      is: "символом",
      non: "символом",
      acc: "символ",
      note: "Підходять і символи з `Symbol.for`, і загальновідомі символи; більше нічого."
    },
    de: {
      is: "ein Symbol",
      non: "ein Symbol",
      acc: "ein Symbol",
      note: "Registrierte Symbole aus `Symbol.for` und die wohlbekannten Symbole bestehen beide; sonst nichts."
    },
    fr: {
      is: "un symbole",
      non: "un symbole",
      acc: "un symbole",
      note: "Les symboles enregistrés par `Symbol.for` et les symboles bien connus passent tous deux ; rien d'autre."
    }
  },

  Null: {
    yes: ["null"],
    no: ["undefined", "0", '""'],
    en: {
      is: "`null`",
      non: "`null`",
      acc: "`null`",
      note: "Strictly `null`. `undefined` is a separate case — `isNil` covers both."
    },
    ru: {
      is: "значением `null`",
      non: "значением `null`",
      acc: "`null`",
      note: "Строго `null`. `undefined` — отдельный случай, оба сразу покрывает `isNil`."
    },
    uk: {
      is: "значенням `null`",
      non: "значенням `null`",
      acc: "`null`",
      note: "Строго `null`. `undefined` — окремий випадок, обидва відразу покриває `isNil`."
    },
    de: {
      is: "`null`",
      non: "`null`",
      acc: "`null`",
      note: "Strikt `null`. `undefined` ist ein eigener Fall — `isNil` deckt beide ab."
    },
    fr: {
      is: "`null`",
      non: "`null`",
      acc: "`null`",
      note: "Strictement `null`. `undefined` est un cas distinct — `isNil` couvre les deux."
    }
  },

  Undefined: {
    yes: ["undefined"],
    no: ["null", "0", '""'],
    en: {
      is: "`undefined`",
      non: "`undefined`",
      acc: "`undefined`",
      note: 'The test is `typeof value === "undefined"`, which is safe for a variable that was never declared, unlike a bare comparison.'
    },
    ru: {
      is: "значением `undefined`",
      non: "значением `undefined`",
      acc: "`undefined`",
      note: 'Проверяется `typeof value === "undefined"` — в отличие от прямого сравнения, это безопасно даже для необъявленной переменной.'
    },
    uk: {
      is: "значенням `undefined`",
      non: "значенням `undefined`",
      acc: "`undefined`",
      note: 'Перевіряється `typeof value === "undefined"` — на відміну від прямого порівняння, це безпечно навіть для неоголошеної змінної.'
    },
    de: {
      is: "`undefined`",
      non: "`undefined`",
      acc: "`undefined`",
      note: 'Geprüft wird `typeof value === "undefined"`, was anders als ein direkter Vergleich auch bei einer nie deklarierten Variablen sicher ist.'
    },
    fr: {
      is: "`undefined`",
      non: "`undefined`",
      acc: "`undefined`",
      note: 'Le test est `typeof value === "undefined"`, sûr même pour une variable jamais déclarée, contrairement à une comparaison directe.'
    }
  },

  Nil: {
    yes: ["null", "undefined"],
    no: ["0", '""', "false"],
    en: {
      is: "`null` or `undefined`",
      non: "`null` or `undefined`",
      acc: "`null` or `undefined`",
      note: 'The absent values, and only those: `0`, `""` and `false` are present values and do not qualify.'
    },
    ru: {
      is: "значением `null` или `undefined`",
      non: "значением `null` или `undefined`",
      acc: "`null` или `undefined`",
      note: 'Только отсутствующие значения: `0`, `""` и `false` — это присутствующие значения, они не подходят.'
    },
    uk: {
      is: "значенням `null` або `undefined`",
      non: "значенням `null` або `undefined`",
      acc: "`null` або `undefined`",
      note: 'Лише відсутні значення: `0`, `""` і `false` — це наявні значення, вони не підходять.'
    },
    de: {
      is: "`null` oder `undefined`",
      non: "`null` oder `undefined`",
      acc: "`null` oder `undefined`",
      note: 'Nur die abwesenden Werte: `0`, `""` und `false` sind vorhandene Werte und zählen nicht.'
    },
    fr: {
      is: "`null` ou `undefined`",
      non: "`null` ou `undefined`",
      acc: "`null` ou `undefined`",
      note: 'Uniquement les valeurs absentes : `0`, `""` et `false` sont des valeurs présentes et ne comptent pas.'
    }
  },

  Object: {
    yes: ["{}", "[]", "new Date()"],
    no: ["null", '"abc"', "function () {}"],
    en: {
      is: "an object",
      non: "an object",
      acc: "an object",
      note: 'The test is `typeof value === "object"` with `null` excluded, so arrays, dates and class instances all count, while a function does not. `isObjectLike` is the one that also accepts functions.'
    },
    ru: {
      is: "объектом",
      non: "объектом",
      acc: "объект",
      note: 'Проверяется `typeof value === "object"` с исключением `null`, поэтому массивы, даты и экземпляры классов подходят, а функция — нет. Функции принимает `isObjectLike`.'
    },
    uk: {
      is: "об'єктом",
      non: "об'єктом",
      acc: "об'єкт",
      note: 'Перевіряється `typeof value === "object"` з винятком для `null`, тому масиви, дати та екземпляри класів підходять, а функція — ні. Функції приймає `isObjectLike`.'
    },
    de: {
      is: "ein Objekt",
      non: "ein Objekt",
      acc: "ein Objekt",
      note: 'Geprüft wird `typeof value === "object"` ohne `null`, sodass Arrays, Daten und Klasseninstanzen zählen, eine Funktion aber nicht. Funktionen akzeptiert `isObjectLike`.'
    },
    fr: {
      is: "un objet",
      non: "un objet",
      acc: "un objet",
      note: 'Le test est `typeof value === "object"` sans `null` : tableaux, dates et instances de classe comptent, une fonction non. C\'est `isObjectLike` qui accepte aussi les fonctions.'
    }
  },

  ObjectLike: {
    yes: ["{}", "[]", "function () {}"],
    no: ["null", '"abc"', "1"],
    en: {
      is: "object-like",
      non: "object-like",
      acc: "an object-like value",
      note: "Everything `isObject` accepts, plus functions: the question it answers is whether properties can be read off the value at all."
    },
    ru: {
      is: "объектоподобным значением",
      non: "объектоподобным значением",
      acc: "объектоподобное значение",
      note: "Всё, что принимает `isObject`, плюс функции: вопрос здесь в том, можно ли вообще читать у значения свойства."
    },
    uk: {
      is: "об'єктоподібним значенням",
      non: "об'єктоподібним значенням",
      acc: "об'єктоподібне значення",
      note: "Усе, що приймає `isObject`, плюс функції: питання тут у тому, чи можна взагалі читати у значення властивості."
    },
    de: {
      is: "objektartig",
      non: "objektartig",
      acc: "einen objektartigen Wert",
      note: "Alles, was `isObject` akzeptiert, und zusätzlich Funktionen: die Frage ist, ob sich am Wert überhaupt Eigenschaften lesen lassen."
    },
    fr: {
      is: "de type objet",
      non: "de type objet",
      acc: "une valeur de type objet",
      note: "Tout ce qu'accepte `isObject`, plus les fonctions : la question posée est de savoir si l'on peut lire des propriétés sur la valeur."
    }
  },

  Function: {
    yes: ["function () {}", "async function () {}", "Math.max"],
    no: ["null", '"fn"', "{}"],
    en: {
      is: "a function",
      non: "a function",
      acc: "a function",
      note: "Classified by its internal tag, so ordinary, `async`, generator and async-generator functions all pass. A class is a function too."
    },
    ru: {
      is: "функцией",
      non: "функцией",
      acc: "функцию",
      note: "Определяется по внутреннему тегу, поэтому подходят обычные, `async`, генераторы и асинхронные генераторы. Класс — тоже функция."
    },
    uk: {
      is: "функцією",
      non: "функцією",
      acc: "функцію",
      note: "Визначається за внутрішнім тегом, тому підходять звичайні, `async`, генератори та асинхронні генератори. Клас — теж функція."
    },
    de: {
      is: "eine Funktion",
      non: "eine Funktion",
      acc: "eine Funktion",
      note: "Anhand des internen Tags bestimmt: gewöhnliche, `async`-, Generator- und Async-Generator-Funktionen bestehen alle. Eine Klasse ist ebenfalls eine Funktion."
    },
    fr: {
      is: "une fonction",
      non: "une fonction",
      acc: "une fonction",
      note: "Déterminé par le tag interne : fonctions ordinaires, `async`, générateurs et générateurs asynchrones passent toutes. Une classe est également une fonction."
    }
  },

  FunctionLike: {
    yes: ["function () {}", "Math.max"],
    no: ["null", "{}", '"fn"'],
    en: {
      is: "callable",
      non: "callable",
      acc: "a callable value",
      note: 'The cheap test — `typeof value === "function"` — which is what you want before calling something. `isFunction` is the stricter reading of the same question.'
    },
    ru: {
      is: "вызываемым значением",
      non: "вызываемым значением",
      acc: "вызываемое значение",
      note: 'Дешёвая проверка — `typeof value === "function"`, — именно то, что нужно перед вызовом. `isFunction` отвечает на тот же вопрос строже.'
    },
    uk: {
      is: "викликаним значенням",
      non: "викликаним значенням",
      acc: "викликане значення",
      note: 'Дешева перевірка — `typeof value === "function"`, — саме те, що потрібно перед викликом. `isFunction` відповідає на те саме питання суворіше.'
    },
    de: {
      is: "aufrufbar",
      non: "aufrufbar",
      acc: "einen aufrufbaren Wert",
      note: 'Die billige Prüfung — `typeof value === "function"` — genau das, was man vor einem Aufruf braucht. `isFunction` liest dieselbe Frage strenger.'
    },
    fr: {
      is: "appelable",
      non: "appelable",
      acc: "une valeur appelable",
      note: "Le test bon marché — `typeof value === \"function\"` — celui qu'on veut avant d'appeler quelque chose. `isFunction` lit la même question plus strictement."
    }
  },

  RegExp: {
    yes: ["/a/", 'new RegExp("a")'],
    no: ['"/a/"', "{}", "null"],
    en: {
      is: "a regular expression",
      non: "a regular expression",
      acc: "a regular expression",
      note: "Identified by its internal tag rather than by `instanceof`, so a regular expression from another frame is recognised too."
    },
    ru: {
      is: "регулярным выражением",
      non: "регулярным выражением",
      acc: "регулярное выражение",
      note: "Определяется по внутреннему тегу, а не через `instanceof`, поэтому распознаётся и регулярное выражение из другого фрейма."
    },
    uk: {
      is: "регулярним виразом",
      non: "регулярним виразом",
      acc: "регулярний вираз",
      note: "Визначається за внутрішнім тегом, а не через `instanceof`, тому розпізнається й регулярний вираз з іншого фрейму."
    },
    de: {
      is: "ein regulärer Ausdruck",
      non: "ein regulärer Ausdruck",
      acc: "einen regulären Ausdruck",
      note: "Über den internen Tag bestimmt statt über `instanceof`, sodass auch ein regulärer Ausdruck aus einem anderen Frame erkannt wird."
    },
    fr: {
      is: "une expression régulière",
      non: "une expression régulière",
      acc: "une expression régulière",
      note: "Identifiée par son tag interne plutôt que par `instanceof`, si bien qu'une expression régulière venue d'un autre frame est reconnue aussi."
    }
  },

  Scalar: {
    yes: ['"abc"', "1", "true", "10n"],
    no: ["{}", "[]", "null"],
    en: {
      is: "a scalar",
      non: "a scalar",
      acc: "a scalar",
      note: "A primitive that carries a single value: string, number, boolean, symbol or bigint. `null` and `undefined` are primitives too, but they carry no value and do not qualify."
    },
    ru: {
      is: "скалярным значением",
      non: "скалярным значением",
      acc: "скалярное значение",
      note: "Примитив, несущий одно значение: строка, число, логическое значение, символ или bigint. `null` и `undefined` тоже примитивы, но значения не несут и не подходят."
    },
    uk: {
      is: "скалярним значенням",
      non: "скалярним значенням",
      acc: "скалярне значення",
      note: "Примітив, що несе одне значення: рядок, число, логічне значення, символ або bigint. `null` і `undefined` теж примітиви, але значення не несуть і не підходять."
    },
    de: {
      is: "ein Skalar",
      non: "ein Skalar",
      acc: "einen Skalar",
      note: "Ein Primitivwert, der genau einen Wert trägt: String, Zahl, Boolean, Symbol oder BigInt. `null` und `undefined` sind ebenfalls primitiv, tragen aber keinen Wert und zählen nicht."
    },
    fr: {
      is: "un scalaire",
      non: "un scalaire",
      acc: "un scalaire",
      note: "Une primitive porteuse d'une seule valeur : chaîne, nombre, booléen, symbole ou bigint. `null` et `undefined` sont primitifs aussi, mais ne portent aucune valeur et ne comptent pas."
    }
  },

  Exception: {
    yes: ["new IllegalArgumentException()"],
    no: ["new Error()", "{}", "null"],
    en: {
      is: "an `Exception`",
      non: "an `Exception`",
      acc: "an `Exception`",
      note: "The library's own hierarchy only. A plain `Error` does not qualify, which is exactly what makes the check useful in a `catch` block that has to tell the two apart."
    },
    ru: {
      is: "экземпляром `Exception`",
      non: "экземпляром `Exception`",
      acc: "`Exception`",
      note: "Только собственная иерархия библиотеки. Обычный `Error` не подходит — именно это делает проверку полезной в `catch`, где нужно отличить одно от другого."
    },
    uk: {
      is: "екземпляром `Exception`",
      non: "екземпляром `Exception`",
      acc: "`Exception`",
      note: "Лише власна ієрархія бібліотеки. Звичайний `Error` не підходить — саме це робить перевірку корисною в `catch`, де треба відрізнити одне від іншого."
    },
    de: {
      is: "eine `Exception`",
      non: "eine `Exception`",
      acc: "eine `Exception`",
      note: "Nur die eigene Hierarchie der Bibliothek. Ein einfacher `Error` zählt nicht — genau das macht die Prüfung in einem `catch` nützlich, das beide unterscheiden muss."
    },
    fr: {
      is: "une `Exception`",
      non: "une `Exception`",
      acc: "une `Exception`",
      note: "Uniquement la hiérarchie propre à la bibliothèque. Un `Error` ordinaire ne compte pas, ce qui rend le test utile dans un `catch` qui doit distinguer les deux."
    }
  },

  Empty: {
    yes: ["null", '""', '"   "', "[]", "{}", "new Map()"],
    no: ["0", "false", '"a"', "[0]"],
    en: {
      is: "empty",
      non: "empty",
      acc: "an empty value",
      note: "Emptiness is read per kind: `null` and `undefined`, a string with nothing but whitespace, an array, `Set` or `Map` with no entries, an object with no own keys. `0` and `false` are values, not emptiness."
    },
    ru: {
      is: "пустым значением",
      non: "пустым значением",
      acc: "пустое значение",
      note: "Пустота понимается по типу: `null` и `undefined`, строка из одних пробелов, массив, `Set` или `Map` без элементов, объект без собственных ключей. `0` и `false` — это значения, а не пустота."
    },
    uk: {
      is: "порожнім значенням",
      non: "порожнім значенням",
      acc: "порожнє значення",
      note: "Порожнеча визначається за типом: `null` і `undefined`, рядок з самих пробілів, масив, `Set` чи `Map` без елементів, об'єкт без власних ключів. `0` і `false` — це значення, а не порожнеча."
    },
    de: {
      is: "leer",
      non: "leer",
      acc: "einen leeren Wert",
      note: "Leere wird je nach Art gelesen: `null` und `undefined`, eine Zeichenkette aus reinem Leerraum, ein Array, `Set` oder `Map` ohne Einträge, ein Objekt ohne eigene Schlüssel. `0` und `false` sind Werte, keine Leere."
    },
    fr: {
      is: "vide",
      non: "vide",
      acc: "une valeur vide",
      note: "La vacuité se lit selon le type : `null` et `undefined`, une chaîne faite d'espaces, un tableau, `Set` ou `Map` sans entrée, un objet sans clé propre. `0` et `false` sont des valeurs, pas du vide."
    }
  },

  Length: {
    yes: ["0", "42", "Number.MAX_SAFE_INTEGER"],
    no: ["-1", "1.5", '"3"'],
    en: {
      is: "a valid array-like length",
      non: "a valid array-like length",
      acc: "a valid array-like length",
      note: "A whole number from `0` up to `Number.MAX_SAFE_INTEGER` — the range a `length` property may hold."
    },
    ru: {
      is: "допустимой длиной массива",
      non: "допустимой длиной массива",
      acc: "допустимую длину массива",
      note: "Целое число от `0` до `Number.MAX_SAFE_INTEGER` — диапазон, который может принимать свойство `length`."
    },
    uk: {
      is: "припустимою довжиною масиву",
      non: "припустимою довжиною масиву",
      acc: "припустиму довжину масиву",
      note: "Ціле число від `0` до `Number.MAX_SAFE_INTEGER` — діапазон, який може містити властивість `length`."
    },
    de: {
      is: "eine gültige Array-Länge",
      non: "eine gültige Array-Länge",
      acc: "eine gültige Array-Länge",
      note: "Eine ganze Zahl von `0` bis `Number.MAX_SAFE_INTEGER` — der Bereich, den eine `length`-Eigenschaft annehmen darf."
    },
    fr: {
      is: "une longueur de tableau valide",
      non: "une longueur de tableau valide",
      acc: "une longueur de tableau valide",
      note: "Un entier de `0` à `Number.MAX_SAFE_INTEGER` — l'intervalle qu'une propriété `length` peut contenir."
    }
  },

  NumberLike: {
    yes: ["1", '"1.5"', '" 42 "'],
    no: ["NaN", "Infinity", '""', "null"],
    en: {
      is: "convertible to a number",
      non: "convertible to a number",
      acc: "a numeric value",
      note: "A finite number, or a string that converts to one. `NaN`, the infinities and the empty string are excluded, which is what separates this from a bare `Number(value)`."
    },
    ru: {
      is: "преобразуемым в число",
      non: "преобразуемым в число",
      acc: "числовое значение",
      note: "Конечное число или строка, которая в него превращается. `NaN`, бесконечности и пустая строка исключены — этим проверка и отличается от простого `Number(value)`."
    },
    uk: {
      is: "перетворюваним на число",
      non: "перетворюваним на число",
      acc: "числове значення",
      note: "Скінченне число або рядок, який на нього перетворюється. `NaN`, нескінченності та порожній рядок виключені — цим перевірка й відрізняється від простого `Number(value)`."
    },
    de: {
      is: "in eine Zahl umwandelbar",
      non: "in eine Zahl umwandelbar",
      acc: "einen numerischen Wert",
      note: "Eine endliche Zahl oder eine Zeichenkette, die sich in eine solche umwandelt. `NaN`, die Unendlichkeiten und die leere Zeichenkette sind ausgeschlossen — das unterscheidet die Prüfung von einem bloßen `Number(value)`."
    },
    fr: {
      is: "convertible en nombre",
      non: "convertible en nombre",
      acc: "une valeur numérique",
      note: "Un nombre fini, ou une chaîne qui se convertit en un nombre fini. `NaN`, les infinis et la chaîne vide sont exclus, ce qui distingue ce test d'un simple `Number(value)`."
    }
  },

  Integer: {
    yes: ["42", "-7", "0"],
    no: ["1.5", "NaN", '"42"'],
    en: {
      is: "an integer",
      non: "an integer",
      acc: "an integer",
      note: 'A number with no fractional part. Nothing is coerced, so the string `"42"` is not an integer, and `NaN` is not either.'
    },
    ru: {
      is: "целым числом",
      non: "целым числом",
      acc: "целое число",
      note: 'Число без дробной части. Приведения типов нет, поэтому строка `"42"` целым числом не является, как и `NaN`.'
    },
    uk: {
      is: "цілим числом",
      non: "цілим числом",
      acc: "ціле число",
      note: 'Число без дробової частини. Приведення типів немає, тому рядок `"42"` цілим числом не є, як і `NaN`.'
    },
    de: {
      is: "eine ganze Zahl",
      non: "eine ganze Zahl",
      acc: "eine ganze Zahl",
      note: 'Eine Zahl ohne Nachkommateil. Es wird nichts umgewandelt: die Zeichenkette `"42"` ist keine ganze Zahl, `NaN` ebenso wenig.'
    },
    fr: {
      is: "un entier",
      non: "un entier",
      acc: "un entier",
      note: "Un nombre sans partie fractionnaire. Rien n'est converti : la chaîne `\"42\"` n'est pas un entier, et `NaN` non plus."
    }
  },

  SafeInteger: {
    yes: ["42", "Number.MAX_SAFE_INTEGER"],
    no: ["Number.MAX_SAFE_INTEGER + 2", "1.5", '"42"'],
    en: {
      is: "a safe integer",
      non: "a safe integer",
      acc: "a safe integer",
      note: "An integer that an IEEE-754 double represents exactly. Beyond that range distinct mathematical integers collapse onto the same value and arithmetic quietly stops being exact."
    },
    ru: {
      is: "безопасным целым числом",
      non: "безопасным целым числом",
      acc: "безопасное целое число",
      note: "Целое число, которое точно представимо в IEEE-754. За пределами этого диапазона разные математические целые схлопываются в одно значение, и арифметика незаметно перестаёт быть точной."
    },
    uk: {
      is: "безпечним цілим числом",
      non: "безпечним цілим числом",
      acc: "безпечне ціле число",
      note: "Ціле число, яке точно представне в IEEE-754. За межами цього діапазону різні математичні цілі схлопуються в одне значення, і арифметика непомітно перестає бути точною."
    },
    de: {
      is: "eine sichere ganze Zahl",
      non: "eine sichere ganze Zahl",
      acc: "eine sichere ganze Zahl",
      note: "Eine ganze Zahl, die ein IEEE-754-Double exakt darstellt. Jenseits dieses Bereichs fallen verschiedene mathematische Ganzzahlen auf denselben Wert und das Rechnen ist still nicht mehr exakt."
    },
    fr: {
      is: "un entier sûr",
      non: "un entier sûr",
      acc: "un entier sûr",
      note: "Un entier qu'un double IEEE-754 représente exactement. Au-delà, des entiers mathématiques distincts se confondent et l'arithmétique cesse discrètement d'être exacte."
    }
  },

  Float: {
    yes: ["1.5", "-0.1"],
    no: ["42", "1.0", "Infinity", '"1.5"'],
    en: {
      is: "a number with a fractional part",
      non: "a number with a fractional part",
      acc: "a number with a fractional part",
      note: "JavaScript has one numeric type, so `1.0` and `1` are the same value: the question answered is whether a fraction survives at runtime, not how the literal was written. The infinities have no fraction and are excluded."
    },
    ru: {
      is: "числом с дробной частью",
      non: "числом с дробной частью",
      acc: "число с дробной частью",
      note: "В JavaScript один числовой тип, поэтому `1.0` и `1` — одно значение: вопрос в том, сохранилась ли дробь во время выполнения, а не в том, как записан литерал. У бесконечностей дроби нет, они исключены."
    },
    uk: {
      is: "числом з дробовою частиною",
      non: "числом з дробовою частиною",
      acc: "число з дробовою частиною",
      note: "У JavaScript один числовий тип, тому `1.0` і `1` — одне значення: питання в тому, чи збереглася дріб під час виконання, а не в тому, як записано літерал. У нескінченностей дробу немає, вони виключені."
    },
    de: {
      is: "eine Zahl mit Nachkommateil",
      non: "eine Zahl mit Nachkommateil",
      acc: "eine Zahl mit Nachkommateil",
      note: "JavaScript hat einen einzigen Zahlentyp, `1.0` und `1` sind derselbe Wert: gefragt ist, ob zur Laufzeit ein Bruchteil übrig bleibt, nicht wie das Literal geschrieben wurde. Die Unendlichkeiten haben keinen Bruchteil und sind ausgeschlossen."
    },
    fr: {
      is: "un nombre avec une partie fractionnaire",
      non: "un nombre avec une partie fractionnaire",
      acc: "un nombre avec une partie fractionnaire",
      note: "JavaScript n'a qu'un type numérique : `1.0` et `1` sont la même valeur. La question est de savoir s'il reste une fraction à l'exécution, pas comment le littéral a été écrit. Les infinis n'ont pas de fraction et sont exclus."
    }
  },

  Double: {
    yes: ["1.5", "-0.1"],
    no: ["42", "1.0", "Infinity", '"1.5"'],
    en: {
      is: "a number with a fractional part",
      non: "a number with a fractional part",
      acc: "a number with a fractional part",
      note: "A synonym of the `Float` family, offered under the name people reach for first. In JavaScript every number already is a double, so `double` names no runtime distinction of its own."
    },
    ru: {
      is: "числом с дробной частью",
      non: "числом с дробной частью",
      acc: "число с дробной частью",
      note: "Синоним семейства `Float` под именем, к которому тянется рука первым делом. В JavaScript каждое число и так double, поэтому `double` не обозначает отдельного случая во время выполнения."
    },
    uk: {
      is: "числом з дробовою частиною",
      non: "числом з дробовою частиною",
      acc: "число з дробовою частиною",
      note: "Синонім родини `Float` під іменем, до якого тягнеться рука першим ділом. У JavaScript кожне число і так double, тому `double` не позначає окремого випадку під час виконання."
    },
    de: {
      is: "eine Zahl mit Nachkommateil",
      non: "eine Zahl mit Nachkommateil",
      acc: "eine Zahl mit Nachkommateil",
      note: "Ein Synonym der `Float`-Familie unter dem Namen, zu dem man zuerst greift. In JavaScript ist jede Zahl ohnehin ein Double, `double` benennt also keinen eigenen Laufzeitfall."
    },
    fr: {
      is: "un nombre avec une partie fractionnaire",
      non: "un nombre avec une partie fractionnaire",
      acc: "un nombre avec une partie fractionnaire",
      note: "Un synonyme de la famille `Float`, sous le nom auquel on pense d'abord. En JavaScript, tout nombre est déjà un double : `double` ne désigne aucun cas particulier à l'exécution."
    }
  },

  Countable: {
    yes: ["0", "42"],
    no: ["-1", "1.5", "Number.MAX_SAFE_INTEGER + 2"],
    en: {
      is: "a countable number",
      non: "a countable number",
      acc: "a countable number",
      note: "A value that can serve as a quantity, a length or a zero-based index: a whole number, not negative, and small enough that integer arithmetic on it is still exact."
    },
    ru: {
      is: "счётным числом",
      non: "счётным числом",
      acc: "счётное число",
      note: "Значение, годное как количество, длина или индекс с нуля: целое, неотрицательное и достаточно малое, чтобы арифметика над ним оставалась точной."
    },
    uk: {
      is: "лічильним числом",
      non: "лічильним числом",
      acc: "лічильне число",
      note: "Значення, придатне як кількість, довжина чи індекс від нуля: ціле, невід'ємне й достатньо мале, щоб арифметика над ним лишалася точною."
    },
    de: {
      is: "eine zählbare Zahl",
      non: "eine zählbare Zahl",
      acc: "eine zählbare Zahl",
      note: "Ein Wert, der als Anzahl, Länge oder nullbasierter Index taugt: ganzzahlig, nicht negativ und klein genug, dass das Rechnen damit exakt bleibt."
    },
    fr: {
      is: "un nombre dénombrable",
      non: "un nombre dénombrable",
      acc: "un nombre dénombrable",
      note: "Une valeur qui peut servir de quantité, de longueur ou d'indice à base zéro : entière, non négative et assez petite pour que l'arithmétique reste exacte."
    }
  },

  NaN: {
    yes: ["NaN", "0 / 0"],
    no: ["0", '"abc"', "undefined"],
    en: {
      is: "the `NaN` number",
      non: "the `NaN` number",
      acc: "`NaN`",
      note: 'Nothing is coerced first, which is where this differs from the global `isNaN`: that one converts its argument, so `isNaN("abc")` and `isNaN(undefined)` both report `true`.'
    },
    ru: {
      is: "числом `NaN`",
      non: "числом `NaN`",
      acc: "`NaN`",
      note: 'Аргумент не приводится к числу — этим проверка и отличается от глобального `isNaN`, который сначала преобразует значение, так что `isNaN("abc")` и `isNaN(undefined)` дают `true`.'
    },
    uk: {
      is: "числом `NaN`",
      non: "числом `NaN`",
      acc: "`NaN`",
      note: 'Аргумент не приводиться до числа — цим перевірка й відрізняється від глобального `isNaN`, який спершу перетворює значення, тож `isNaN("abc")` і `isNaN(undefined)` дають `true`.'
    },
    de: {
      is: "die Zahl `NaN`",
      non: "die Zahl `NaN`",
      acc: "`NaN`",
      note: 'Es wird nichts vorher umgewandelt — darin unterscheidet sich die Prüfung vom globalen `isNaN`, das sein Argument konvertiert, sodass `isNaN("abc")` und `isNaN(undefined)` beide `true` melden.'
    },
    fr: {
      is: "le nombre `NaN`",
      non: "le nombre `NaN`",
      acc: "`NaN`",
      note: "Rien n'est converti au préalable, et c'est là que ce test diffère du `isNaN` global : celui-ci convertit son argument, si bien que `isNaN(\"abc\")` et `isNaN(undefined)` renvoient `true`."
    }
  },

  NonNegative: {
    yes: ["0", "-0", "42", "Infinity"],
    no: ["-1", "NaN", '"1"'],
    en: {
      is: "a number that is not negative",
      non: "a number that is not negative",
      acc: "a non-negative number",
      note: "`NaN` does not qualify: it is a number, but it is neither negative nor non-negative. The infinities behave as their sign suggests, so `Infinity` qualifies and `-Infinity` does not."
    },
    ru: {
      is: "неотрицательным числом",
      non: "неотрицательным числом",
      acc: "неотрицательное число",
      note: "`NaN` не подходит: это число, но оно не является ни отрицательным, ни неотрицательным. Бесконечности ведут себя по знаку: `Infinity` подходит, `-Infinity` — нет."
    },
    uk: {
      is: "невід'ємним числом",
      non: "невід'ємним числом",
      acc: "невід'ємне число",
      note: "`NaN` не підходить: це число, але воно не є ні від'ємним, ні невід'ємним. Нескінченності поводяться за знаком: `Infinity` підходить, `-Infinity` — ні."
    },
    de: {
      is: "eine nicht negative Zahl",
      non: "eine nicht negative Zahl",
      acc: "eine nicht negative Zahl",
      note: "`NaN` zählt nicht: es ist eine Zahl, aber weder negativ noch nicht negativ. Die Unendlichkeiten verhalten sich nach ihrem Vorzeichen, `Infinity` zählt, `-Infinity` nicht."
    },
    fr: {
      is: "un nombre non négatif",
      non: "un nombre non négatif",
      acc: "un nombre non négatif",
      note: "`NaN` ne compte pas : c'est un nombre, mais il n'est ni négatif ni non négatif. Les infinis suivent leur signe : `Infinity` compte, `-Infinity` non."
    }
  },

  Email: {
    members: { is: "isEmail", non: "nonValidEmail", require: "requireValidEmail" },
    yes: ['"user@example.com"', '"first.last@sub.example.co.uk"'],
    no: ['"user@@example.com"', '"user@"', '"example.com"', '""'],
    en: {
      is: "an email address",
      non: "an email address",
      acc: "an email address",
      note: "The address is split at a single `@`: the domain is checked the way `isValidDomain` checks one, and the local part must be non-empty and free of spaces. It is a format check, not proof that the mailbox exists."
    },
    ru: {
      is: "адресом электронной почты",
      non: "адресом электронной почты",
      acc: "адрес электронной почты",
      note: "Адрес разбивается по единственному `@`: домен проверяется так же, как в `isValidDomain`, а локальная часть должна быть непустой и без пробелов. Это проверка формата, а не доказательство того, что ящик существует."
    },
    uk: {
      is: "адресою електронної пошти",
      non: "адресою електронної пошти",
      acc: "адресу електронної пошти",
      note: "Адреса розбивається за єдиним `@`: домен перевіряється так само, як у `isValidDomain`, а локальна частина має бути непорожньою і без пробілів. Це перевірка формату, а не доказ того, що скринька існує."
    },
    de: {
      is: "eine E-Mail-Adresse",
      non: "eine E-Mail-Adresse",
      acc: "eine E-Mail-Adresse",
      note: "Die Adresse wird an genau einem `@` geteilt: die Domain wird geprüft wie von `isValidDomain`, der lokale Teil muss nicht leer und frei von Leerzeichen sein. Eine Formatprüfung, kein Beleg dafür, dass das Postfach existiert."
    },
    fr: {
      is: "une adresse e-mail",
      non: "une adresse e-mail",
      acc: "une adresse e-mail",
      note: "L'adresse est coupée sur un unique `@` : le domaine est vérifié comme le fait `isValidDomain`, et la partie locale doit être non vide et sans espaces. C'est un contrôle de format, pas la preuve que la boîte existe."
    }
  },

  ValidLocale: {
    yes: ['"en"', '"UK"'],
    no: ['"en-US"', '"eng"', '""'],
    en: {
      is: "a locale code",
      non: "a locale code",
      acc: "a locale code",
      note: 'Exactly two ASCII letters, in either case — `"en"`, `"UK"`. A region or a script subtag, as in `"en-US"`, is rejected: this is the short language code, not a full BCP 47 tag.'
    },
    ru: {
      is: "кодом локали",
      non: "кодом локали",
      acc: "код локали",
      note: 'Ровно две латинские буквы в любом регистре — `"en"`, `"UK"`. Код региона или письменности, как в `"en-US"`, не проходит: это короткий код языка, а не полный тег BCP 47.'
    },
    uk: {
      is: "кодом локалі",
      non: "кодом локалі",
      acc: "код локалі",
      note: 'Рівно дві латинські літери в будь-якому регістрі — `"en"`, `"UK"`. Код регіону чи писемності, як у `"en-US"`, не проходить: це короткий код мови, а не повний тег BCP 47.'
    },
    de: {
      is: "ein Gebietsschema-Code",
      non: "ein Gebietsschema-Code",
      acc: "einen Gebietsschema-Code",
      note: 'Genau zwei ASCII-Buchstaben in beliebiger Schreibweise — `"en"`, `"UK"`. Ein Regions- oder Schrift-Subtag wie in `"en-US"` wird abgelehnt: gemeint ist der kurze Sprachcode, nicht ein vollständiges BCP-47-Tag.'
    },
    fr: {
      is: "un code de locale",
      non: "un code de locale",
      acc: "un code de locale",
      note: 'Exactement deux lettres ASCII, dans n\'importe quelle casse — `"en"`, `"UK"`. Un sous-tag de région ou d\'écriture, comme dans `"en-US"`, est refusé : il s\'agit du code de langue court, pas d\'une étiquette BCP 47 complète.'
    }
  },

  ValidSlug: {
    yes: ['"my-page"', '"a_1"'],
    no: ['"1-page"', '"my page"', '""'],
    en: {
      is: "a slug",
      non: "a slug",
      acc: "a slug",
      note: "Starts with a letter, then letters, digits, hyphens and underscores — the shape a URL segment or a key can take. Spaces, leading digits and an empty string are rejected."
    },
    ru: {
      is: "слагом",
      non: "слагом",
      acc: "слаг",
      note: "Начинается с буквы, дальше буквы, цифры, дефисы и подчёркивания — форма, годная для сегмента URL или ключа. Пробелы, цифра в начале и пустая строка не проходят."
    },
    uk: {
      is: "слагом",
      non: "слагом",
      acc: "слаг",
      note: "Починається з літери, далі літери, цифри, дефіси та підкреслення — форма, придатна для сегмента URL чи ключа. Пробіли, цифра на початку та порожній рядок не проходять."
    },
    de: {
      is: "ein Slug",
      non: "ein Slug",
      acc: "einen Slug",
      note: "Beginnt mit einem Buchstaben, danach Buchstaben, Ziffern, Bindestriche und Unterstriche — die Form, die ein URL-Segment oder ein Schlüssel annehmen kann. Leerzeichen, führende Ziffern und die leere Zeichenkette werden abgelehnt."
    },
    fr: {
      is: "un slug",
      non: "un slug",
      acc: "un slug",
      note: "Commence par une lettre, puis lettres, chiffres, tirets et tirets bas — la forme que peut prendre un segment d'URL ou une clé. Les espaces, un chiffre initial et la chaîne vide sont refusés."
    }
  },

  ValidVersion: {
    yes: ['"1"', '"1.2.3"', '"2026.01.15"'],
    no: ['"1.2.3-beta"', '"v1.2"', '"1..2"'],
    en: {
      is: "a version string",
      non: "a version string",
      acc: "a version string",
      note: 'Dot-separated groups of digits, any number of them. A pre-release suffix, a leading `v` and an empty group are all rejected, so `"1.2.3-beta"` does not pass even though SemVer allows it.'
    },
    ru: {
      is: "строкой версии",
      non: "строкой версии",
      acc: "строку версии",
      note: 'Группы цифр через точку, в любом количестве. Суффикс предрелиза, ведущая `v` и пустая группа не проходят, поэтому `"1.2.3-beta"` не подходит, хотя SemVer его допускает.'
    },
    uk: {
      is: "рядком версії",
      non: "рядком версії",
      acc: "рядок версії",
      note: 'Групи цифр через крапку, у будь-якій кількості. Суфікс передрелізу, провідна `v` та порожня група не проходять, тому `"1.2.3-beta"` не підходить, хоча SemVer його дозволяє.'
    },
    de: {
      is: "eine Versionsangabe",
      non: "eine Versionsangabe",
      acc: "eine Versionsangabe",
      note: 'Durch Punkte getrennte Zifferngruppen, beliebig viele. Ein Vorabversions-Suffix, ein führendes `v` und eine leere Gruppe werden abgelehnt: `"1.2.3-beta"` besteht also nicht, obwohl SemVer es erlaubt.'
    },
    fr: {
      is: "une chaîne de version",
      non: "une chaîne de version",
      acc: "une chaîne de version",
      note: 'Des groupes de chiffres séparés par des points, en nombre quelconque. Un suffixe de préversion, un `v` initial et un groupe vide sont refusés : `"1.2.3-beta"` ne passe donc pas, bien que SemVer l\'autorise.'
    }
  },

  Absolute: {
    yes: ['"/var/log"', '"https://example.com/a"', '"mailto:a@example.com"'],
    no: ['"docs/readme.md"', '"./a"', '""'],
    en: {
      is: "an absolute path",
      non: "an absolute path",
      acc: "an absolute path",
      note: "A path that starts at a root: a leading `/`, or a scheme such as `https://` or `mailto:`. Everything else, the empty string included, is relative."
    },
    ru: {
      is: "абсолютным путём",
      non: "абсолютным путём",
      acc: "абсолютный путь",
      note: "Путь, начинающийся от корня: ведущий `/` либо схема вроде `https://` или `mailto:`. Всё остальное, включая пустую строку, относительно."
    },
    uk: {
      is: "абсолютним шляхом",
      non: "абсолютним шляхом",
      acc: "абсолютний шлях",
      note: "Шлях, що починається від кореня: провідний `/` або схема на кшталт `https://` чи `mailto:`. Усе інше, включно з порожнім рядком, відносне."
    },
    de: {
      is: "ein absoluter Pfad",
      non: "ein absoluter Pfad",
      acc: "einen absoluten Pfad",
      note: "Ein Pfad, der an einer Wurzel beginnt: ein führender `/` oder ein Schema wie `https://` oder `mailto:`. Alles andere, auch die leere Zeichenkette, ist relativ."
    },
    fr: {
      is: "un chemin absolu",
      non: "un chemin absolu",
      acc: "un chemin absolu",
      note: "Un chemin qui part d'une racine : un `/` initial, ou un schéma comme `https://` ou `mailto:`. Tout le reste, chaîne vide comprise, est relatif."
    }
  },

  Relative: {
    yes: ['"docs/readme.md"', '"./a"', '""'],
    no: ['"/var/log"', '"https://example.com/a"'],
    en: {
      is: "a relative path",
      non: "a relative path",
      acc: "a relative path",
      note: "The exact complement of `isAbsolute`: anything that does not start at a root, which includes the empty string."
    },
    ru: {
      is: "относительным путём",
      non: "относительным путём",
      acc: "относительный путь",
      note: "Точное дополнение `isAbsolute`: всё, что не начинается от корня, включая пустую строку."
    },
    uk: {
      is: "відносним шляхом",
      non: "відносним шляхом",
      acc: "відносний шлях",
      note: "Точне доповнення `isAbsolute`: усе, що не починається від кореня, включно з порожнім рядком."
    },
    de: {
      is: "ein relativer Pfad",
      non: "ein relativer Pfad",
      acc: "einen relativen Pfad",
      note: "Das exakte Gegenstück zu `isAbsolute`: alles, was nicht an einer Wurzel beginnt, die leere Zeichenkette eingeschlossen."
    },
    fr: {
      is: "un chemin relatif",
      non: "un chemin relatif",
      acc: "un chemin relatif",
      note: "Le complément exact de `isAbsolute` : tout ce qui ne part pas d'une racine, y compris la chaîne vide."
    }
  },

  ValidDomain: {
    yes: ['"example.com"', '"sub.example.co.uk"'],
    no: ['"-example.com"', '"example..com"', '"example.com."', '""'],
    en: {
      is: "a domain name",
      non: "a domain name",
      acc: "a domain name",
      note: "Labels separated by single dots, with no leading or trailing dot or hyphen and no empty label. It is a syntax check: whether the domain resolves is another question."
    },
    ru: {
      is: "доменным именем",
      non: "доменным именем",
      acc: "доменное имя",
      note: "Метки, разделённые одиночными точками, без точки или дефиса в начале и в конце и без пустых меток. Это проверка синтаксиса: резолвится ли домен — отдельный вопрос."
    },
    uk: {
      is: "доменним іменем",
      non: "доменним іменем",
      acc: "доменне ім'я",
      note: "Мітки, розділені одиночними крапками, без крапки чи дефіса на початку й у кінці та без порожніх міток. Це перевірка синтаксису: чи резолвиться домен — окреме питання."
    },
    de: {
      is: "ein Domainname",
      non: "ein Domainname",
      acc: "einen Domainnamen",
      note: "Labels, durch einzelne Punkte getrennt, ohne führenden oder abschließenden Punkt oder Bindestrich und ohne leeres Label. Eine Syntaxprüfung: ob die Domain auflöst, ist eine andere Frage."
    },
    fr: {
      is: "un nom de domaine",
      non: "un nom de domaine",
      acc: "un nom de domaine",
      note: "Des labels séparés par des points simples, sans point ni tiret en tête ou en fin, et sans label vide. C'est un contrôle de syntaxe : savoir si le domaine résout est une autre question."
    }
  },

  Url: {
    yes: ['"https://example.com"', '"http://example.com/a?b=1"'],
    no: ['"example.com"', '"https://"', '"https://exa mple.com"'],
    en: {
      is: "a URL",
      non: "a URL",
      acc: "a URL",
      note: 'An `http`, `https` or `ftp` URL with something after the scheme and no whitespace anywhere. A bare host such as `"example.com"` is not one.'
    },
    ru: {
      is: "URL-адресом",
      non: "URL-адресом",
      acc: "URL-адрес",
      note: 'Адрес по схеме `http`, `https` или `ftp`, у которого после схемы что-то есть и нигде нет пробелов. Голый хост вроде `"example.com"` таковым не является.'
    },
    uk: {
      is: "URL-адресою",
      non: "URL-адресою",
      acc: "URL-адресу",
      note: 'Адреса за схемою `http`, `https` або `ftp`, у якої після схеми щось є і ніде немає пробілів. Голий хост на кшталт `"example.com"` нею не є.'
    },
    de: {
      is: "eine URL",
      non: "eine URL",
      acc: "eine URL",
      note: 'Eine `http`-, `https`- oder `ftp`-URL, bei der nach dem Schema etwas folgt und nirgends Leerraum steht. Ein blanker Host wie `"example.com"` ist keine.'
    },
    fr: {
      is: "une URL",
      non: "une URL",
      acc: "une URL",
      note: 'Une URL en `http`, `https` ou `ftp`, avec quelque chose après le schéma et aucun espace nulle part. Un hôte seul comme `"example.com"` n\'en est pas une.'
    }
  },

  ValidSheetId: {
    yes: ["0", "1234567890"],
    no: ["-1", "1.5", '"0"'],
    en: {
      is: "a sheet id",
      non: "a sheet id",
      acc: "a sheet id",
      note: "Apps Script numbers its sheets from zero, so a sheet id is a non-negative safe integer — the same rule `isCountable` applies. The id of the first sheet in a spreadsheet is `0`."
    },
    ru: {
      is: "идентификатором листа",
      non: "идентификатором листа",
      acc: "идентификатор листа",
      note: "Apps Script нумерует листы с нуля, поэтому идентификатор листа — неотрицательное безопасное целое, то же правило, что у `isCountable`. У первого листа таблицы идентификатор `0`."
    },
    uk: {
      is: "ідентифікатором аркуша",
      non: "ідентифікатором аркуша",
      acc: "ідентифікатор аркуша",
      note: "Apps Script нумерує аркуші з нуля, тому ідентифікатор аркуша — невід'ємне безпечне ціле, те саме правило, що в `isCountable`. У першого аркуша таблиці ідентифікатор `0`."
    },
    de: {
      is: "eine Blatt-Id",
      non: "eine Blatt-Id",
      acc: "eine Blatt-Id",
      note: "Apps Script nummeriert Blätter ab null, eine Blatt-Id ist also eine nicht negative sichere Ganzzahl — dieselbe Regel wie bei `isCountable`. Das erste Blatt einer Tabelle hat die Id `0`."
    },
    fr: {
      is: "un identifiant de feuille",
      non: "un identifiant de feuille",
      acc: "un identifiant de feuille",
      note: "Apps Script numérote les feuilles à partir de zéro : un identifiant de feuille est un entier sûr non négatif — la règle qu'applique `isCountable`. La première feuille d'un classeur porte l'identifiant `0`."
    }
  },

  ValidSheetName: {
    yes: ['"Data"', '"Report 2026"'],
    no: ['"history"', '"Data/2026"', '""'],
    en: {
      is: "a sheet name",
      non: "a sheet name",
      acc: "a sheet name",
      note: "What Google Sheets accepts: at most 100 characters, not blank, none of `\\ / ? * [ ]`, and not the reserved name `history` in any case."
    },
    ru: {
      is: "именем листа",
      non: "именем листа",
      acc: "имя листа",
      note: "То, что принимает Google Таблицы: не длиннее 100 символов, не пустое, без символов `\\ / ? * [ ]` и не зарезервированное имя `history` в любом регистре."
    },
    uk: {
      is: "назвою аркуша",
      non: "назвою аркуша",
      acc: "назву аркуша",
      note: "Те, що приймають Google Таблиці: не довше 100 символів, не порожнє, без символів `\\ / ? * [ ]` і не зарезервована назва `history` у будь-якому регістрі."
    },
    de: {
      is: "ein Blattname",
      non: "ein Blattname",
      acc: "einen Blattnamen",
      note: "Was Google Tabellen akzeptiert: höchstens 100 Zeichen, nicht leer, keines von `\\ / ? * [ ]` und nicht der reservierte Name `history` in beliebiger Schreibweise."
    },
    fr: {
      is: "un nom de feuille",
      non: "un nom de feuille",
      acc: "un nom de feuille",
      note: "Ce que Google Sheets accepte : au plus 100 caractères, non vide, aucun des caractères `\\ / ? * [ ]`, et pas le nom réservé `history`, quelle que soit la casse."
    }
  },

  ValidSpreadsheetId: {
    yes: ['"1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"'],
    no: ['"short-id"', '"has space in it and is long enough to pass"'],
    en: {
      is: "a spreadsheet id",
      non: "a spreadsheet id",
      acc: "a spreadsheet id",
      note: "At least 25 characters of letters, digits, hyphens and underscores — the id that sits in a spreadsheet URL between `/d/` and `/edit`. Nothing is fetched: the format is all that is checked."
    },
    ru: {
      is: "идентификатором таблицы",
      non: "идентификатором таблицы",
      acc: "идентификатор таблицы",
      note: "Не меньше 25 символов из букв, цифр, дефисов и подчёркиваний — тот идентификатор, что стоит в URL таблицы между `/d/` и `/edit`. Никаких запросов не делается, проверяется только формат."
    },
    uk: {
      is: "ідентифікатором таблиці",
      non: "ідентифікатором таблиці",
      acc: "ідентифікатор таблиці",
      note: "Не менше 25 символів з літер, цифр, дефісів і підкреслень — той ідентифікатор, що стоїть в URL таблиці між `/d/` та `/edit`. Жодних запитів не робиться, перевіряється лише формат."
    },
    de: {
      is: "eine Tabellen-Id",
      non: "eine Tabellen-Id",
      acc: "eine Tabellen-Id",
      note: "Mindestens 25 Zeichen aus Buchstaben, Ziffern, Bindestrichen und Unterstrichen — die Id, die in der Tabellen-URL zwischen `/d/` und `/edit` steht. Es wird nichts abgerufen, geprüft wird nur das Format."
    },
    fr: {
      is: "un identifiant de classeur",
      non: "un identifiant de classeur",
      acc: "un identifiant de classeur",
      note: "Au moins 25 caractères parmi lettres, chiffres, tirets et tirets bas — l'identifiant qui figure dans l'URL du classeur entre `/d/` et `/edit`. Rien n'est récupéré : seul le format est vérifié."
    }
  },

  ValidPresentationId: {
    yes: ['"1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"'],
    no: ['"short-id"', '"has space in it and is long enough to pass"'],
    en: {
      is: "a presentation id",
      non: "a presentation id",
      acc: "a presentation id",
      note: "At least 25 characters of letters, digits, hyphens and underscores — the id from a Slides URL. The format is all that is checked."
    },
    ru: {
      is: "идентификатором презентации",
      non: "идентификатором презентации",
      acc: "идентификатор презентации",
      note: "Не меньше 25 символов из букв, цифр, дефисов и подчёркиваний — идентификатор из URL презентации. Проверяется только формат."
    },
    uk: {
      is: "ідентифікатором презентації",
      non: "ідентифікатором презентації",
      acc: "ідентифікатор презентації",
      note: "Не менше 25 символів з літер, цифр, дефісів і підкреслень — ідентифікатор з URL презентації. Перевіряється лише формат."
    },
    de: {
      is: "eine Präsentations-Id",
      non: "eine Präsentations-Id",
      acc: "eine Präsentations-Id",
      note: "Mindestens 25 Zeichen aus Buchstaben, Ziffern, Bindestrichen und Unterstrichen — die Id aus einer Slides-URL. Geprüft wird nur das Format."
    },
    fr: {
      is: "un identifiant de présentation",
      non: "un identifiant de présentation",
      acc: "un identifiant de présentation",
      note: "Au moins 25 caractères parmi lettres, chiffres, tirets et tirets bas — l'identifiant tiré d'une URL Slides. Seul le format est vérifié."
    }
  },

  ValidSlideId: {
    yes: ['"p1"', '"SLIDES_api123"'],
    no: ['"has space"', '""'],
    en: {
      is: "a slide id",
      non: "a slide id",
      acc: "a slide id",
      note: "Letters, digits, hyphens and underscores, at least one of them. Slide ids are short — `p1` is a perfectly ordinary one — so no minimum length is imposed."
    },
    ru: {
      is: "идентификатором слайда",
      non: "идентификатором слайда",
      acc: "идентификатор слайда",
      note: "Буквы, цифры, дефисы и подчёркивания, хотя бы один символ. Идентификаторы слайдов короткие — `p1` вполне обычный, — поэтому минимальная длина не задаётся."
    },
    uk: {
      is: "ідентифікатором слайда",
      non: "ідентифікатором слайда",
      acc: "ідентифікатор слайда",
      note: "Літери, цифри, дефіси та підкреслення, хоча б один символ. Ідентифікатори слайдів короткі — `p1` цілком звичайний, — тому мінімальна довжина не задається."
    },
    de: {
      is: "eine Folien-Id",
      non: "eine Folien-Id",
      acc: "eine Folien-Id",
      note: "Buchstaben, Ziffern, Bindestriche und Unterstriche, mindestens eines davon. Folien-Ids sind kurz — `p1` ist eine ganz gewöhnliche — daher gibt es keine Mindestlänge."
    },
    fr: {
      is: "un identifiant de diapositive",
      non: "un identifiant de diapositive",
      acc: "un identifiant de diapositive",
      note: "Lettres, chiffres, tirets et tirets bas, au moins un caractère. Les identifiants de diapositive sont courts — `p1` est tout à fait ordinaire — donc aucune longueur minimale n'est imposée."
    }
  },
  Sheet: {
    tag: "Sheet",
    prelude: ["const sheet = SpreadsheetApp.getActiveSheet();", ""],
    yes: ["sheet"],
    no: ["{}", "null"],
    en: {
      is: "a sheet",
      non: "a sheet",
      acc: "a sheet"
    },
    ru: {
      is: "листом",
      non: "листом",
      acc: "лист"
    },
    uk: {
      is: "аркушем",
      non: "аркушем",
      acc: "аркуш"
    },
    de: {
      is: "ein Blatt",
      non: "ein Blatt",
      acc: "ein Blatt"
    },
    fr: {
      is: "une feuille",
      non: "une feuille",
      acc: "une feuille"
    }
  },
  Spreadsheet: {
    tag: "Spreadsheet",
    prelude: ["const spreadsheet = SpreadsheetApp.getActive();", ""],
    yes: ["spreadsheet"],
    no: ["{}", "null"],
    en: {
      is: "a spreadsheet",
      non: "a spreadsheet",
      acc: "a spreadsheet"
    },
    ru: {
      is: "таблицей",
      non: "таблицей",
      acc: "таблицу"
    },
    uk: {
      is: "таблицею",
      non: "таблицею",
      acc: "таблицю"
    },
    de: {
      is: "eine Tabelle",
      non: "eine Tabelle",
      acc: "eine Tabelle"
    },
    fr: {
      is: "un classeur",
      non: "un classeur",
      acc: "un classeur"
    }
  },
  Range: {
    tag: "Range",
    prelude: ["const range = SpreadsheetApp.getActiveRange();", ""],
    yes: ["range"],
    no: ["{}", "null"],
    en: {
      is: "a range",
      non: "a range",
      acc: "a range"
    },
    ru: {
      is: "диапазоном",
      non: "диапазоном",
      acc: "диапазон"
    },
    uk: {
      is: "діапазоном",
      non: "діапазоном",
      acc: "діапазон"
    },
    de: {
      is: "ein Bereich",
      non: "ein Bereich",
      acc: "einen Bereich"
    },
    fr: {
      is: "une plage",
      non: "une plage",
      acc: "une plage"
    }
  },
  RichTextValue: {
    tag: "RichTextValue",
    prelude: ['const value = SpreadsheetApp.newRichTextValue().setText("a").build();', ""],
    yes: ["value"],
    no: ["{}", "null"],
    en: {
      is: "a rich text value",
      non: "a rich text value",
      acc: "a rich text value"
    },
    ru: {
      is: "форматированным текстом",
      non: "форматированным текстом",
      acc: "форматированный текст"
    },
    uk: {
      is: "форматованим текстом",
      non: "форматованим текстом",
      acc: "форматований текст"
    },
    de: {
      is: "ein Rich-Text-Wert",
      non: "ein Rich-Text-Wert",
      acc: "einen Rich-Text-Wert"
    },
    fr: {
      is: "une valeur de texte enrichi",
      non: "une valeur de texte enrichi",
      acc: "une valeur de texte enrichi"
    }
  },
  TextStyle: {
    tag: "TextStyle",
    prelude: ["const style = SpreadsheetApp.newTextStyle().setBold(true).build();", ""],
    yes: ["style"],
    no: ["{}", "null"],
    en: {
      is: "a text style",
      non: "a text style",
      acc: "a text style"
    },
    ru: {
      is: "стилем текста",
      non: "стилем текста",
      acc: "стиль текста"
    },
    uk: {
      is: "стилем тексту",
      non: "стилем тексту",
      acc: "стиль тексту"
    },
    de: {
      is: "ein Textstil",
      non: "ein Textstil",
      acc: "einen Textstil"
    },
    fr: {
      is: "un style de texte",
      non: "un style de texte",
      acc: "un style de texte"
    }
  },
  Ui: {
    tag: "Ui",
    prelude: ["const ui = SpreadsheetApp.getUi();", ""],
    yes: ["ui"],
    no: ["{}", "null"],
    en: {
      is: "a Ui object",
      non: "a Ui object",
      acc: "a Ui object"
    },
    ru: {
      is: "объектом Ui",
      non: "объектом Ui",
      acc: "объект Ui"
    },
    uk: {
      is: "об'єктом Ui",
      non: "об'єктом Ui",
      acc: "об'єкт Ui"
    },
    de: {
      is: "ein Ui-Objekt",
      non: "ein Ui-Objekt",
      acc: "ein Ui-Objekt"
    },
    fr: {
      is: "un objet Ui",
      non: "un objet Ui",
      acc: "un objet Ui"
    }
  },
  Presentation: {
    methods: ["getId", "getSlides"],
    prelude: ["const presentation = SlidesApp.getActivePresentation();", ""],
    yes: ["presentation"],
    no: ["{}", "null"],
    en: {
      is: "a presentation",
      non: "a presentation",
      acc: "a presentation"
    },
    ru: {
      is: "презентацией",
      non: "презентацией",
      acc: "презентацию"
    },
    uk: {
      is: "презентацією",
      non: "презентацією",
      acc: "презентацію"
    },
    de: {
      is: "eine Präsentation",
      non: "eine Präsentation",
      acc: "eine Präsentation"
    },
    fr: {
      is: "une présentation",
      non: "une présentation",
      acc: "une présentation"
    }
  },
  Slide: {
    methods: ["getObjectId", "getPageElementById"],
    prelude: ["const slide = SlidesApp.getActivePresentation().getSlides()[0];", ""],
    yes: ["slide"],
    no: ["{}", "null"],
    en: {
      is: "a slide",
      non: "a slide",
      acc: "a slide"
    },
    ru: {
      is: "слайдом",
      non: "слайдом",
      acc: "слайд"
    },
    uk: {
      is: "слайдом",
      non: "слайдом",
      acc: "слайд"
    },
    de: {
      is: "eine Folie",
      non: "eine Folie",
      acc: "eine Folie"
    },
    fr: {
      is: "une diapositive",
      non: "une diapositive",
      acc: "une diapositive"
    }
  },
  HtmlOutput: {
    methods: ["getContent", "setTitle", "setXFrameOptionsMode"],
    prelude: ['const output = HtmlService.createHtmlOutput("<p>hi</p>");', ""],
    yes: ["output"],
    no: ["{}", "null"],
    en: {
      is: "an HtmlOutput",
      non: "an HtmlOutput",
      acc: "an HtmlOutput"
    },
    ru: {
      is: "объектом HtmlOutput",
      non: "объектом HtmlOutput",
      acc: "объект HtmlOutput"
    },
    uk: {
      is: "об'єктом HtmlOutput",
      non: "об'єктом HtmlOutput",
      acc: "об'єкт HtmlOutput"
    },
    de: {
      is: "ein HtmlOutput",
      non: "ein HtmlOutput",
      acc: "ein HtmlOutput"
    },
    fr: {
      is: "un HtmlOutput",
      non: "un HtmlOutput",
      acc: "un HtmlOutput"
    }
  },
  TextOutput: {
    methods: ["getMimeType", "getContent"],
    prelude: ['const output = ContentService.createTextOutput("hi");', ""],
    yes: ["output"],
    no: ["{}", "null"],
    en: {
      is: "a TextOutput",
      non: "a TextOutput",
      acc: "a TextOutput"
    },
    ru: {
      is: "объектом TextOutput",
      non: "объектом TextOutput",
      acc: "объект TextOutput"
    },
    uk: {
      is: "об'єктом TextOutput",
      non: "об'єктом TextOutput",
      acc: "об'єкт TextOutput"
    },
    de: {
      is: "ein TextOutput",
      non: "ein TextOutput",
      acc: "ein TextOutput"
    },
    fr: {
      is: "un TextOutput",
      non: "un TextOutput",
      acc: "un TextOutput"
    }
  },

  CellGridRange: {
    yes: ["{ startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 }"],
    no: [
      "{ startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 1 }",
      "{}",
      "null"
    ],
    en: {
      is: "a single-cell range",
      non: "a single-cell range",
      acc: "a single-cell range",
      note: "One row and one column, measured by the bounds rather than by how the range was written: the end indices are exclusive, so a single cell is `endRowIndex - startRowIndex === 1` and the same for the columns. A range with a bound left out is open in that direction and is never a single cell."
    },
    ru: {
      is: "диапазоном из одной ячейки",
      non: "диапазоном из одной ячейки",
      acc: "диапазон из одной ячейки",
      note: "Одна строка и один столбец, считая по границам, а не по тому, как диапазон записали: конечные индексы не включаются, поэтому одна ячейка — это `endRowIndex - startRowIndex === 1` и то же для столбцов. Диапазон с пропущенной границей открыт в эту сторону и одной ячейкой не бывает."
    },
    uk: {
      is: "діапазоном з однієї комірки",
      non: "діапазоном з однієї комірки",
      acc: "діапазон з однієї комірки",
      note: "Один рядок і один стовпець, рахуючи за межами, а не за тим, як діапазон записали: кінцеві індекси не включаються, тому одна комірка — це `endRowIndex - startRowIndex === 1` і те саме для стовпців. Діапазон із пропущеною межею відкритий у цей бік і однією коміркою не буває."
    },
    de: {
      is: "ein Einzelzellbereich",
      non: "ein Einzelzellbereich",
      acc: "einen Einzelzellbereich",
      note: "Eine Zeile und eine Spalte, gemessen an den Grenzen und nicht daran, wie der Bereich geschrieben wurde: die Endindizes gehören nicht dazu, eine einzelne Zelle ist also `endRowIndex - startRowIndex === 1` und ebenso bei den Spalten. Ein Bereich mit weggelassener Grenze ist in diese Richtung offen und nie eine einzelne Zelle."
    },
    fr: {
      is: "une plage d'une seule cellule",
      non: "une plage d'une seule cellule",
      acc: "une plage d'une seule cellule",
      note: "Une ligne et une colonne, mesurées d'après les bornes et non d'après l'écriture de la plage : les indices de fin sont exclus, une cellule unique vaut donc `endRowIndex - startRowIndex === 1`, de même pour les colonnes. Une plage dont une borne est omise est ouverte de ce côté et n'est jamais une cellule unique."
    }
  }
};
