/** Prose for the object helpers and the JSON pair. */

import { code, entry } from "./_entry.mjs";

const NOT_OBJECT = {
  IllegalArgumentException: {
    en: "the value is not an object.",
    ru: "значение не является объектом.",
    uk: "значення не є об'єктом.",
    de: "der Wert ist kein Objekt.",
    fr: "la valeur n'est pas un objet."
  }
};

export const FUNCTIONS = {
  equals: entry({
    seeAlso: ["hashCode"],
    examples: code(
      [
        "equals({ a: 1 }, { a: 1 }); // => true",
        "equals([1, { a: 2 }], [1, { a: 2 }]); // => true",
        "equals(NaN, NaN); // => true",
        "equals(new Date(0), new Date(0)); // => true"
      ].join("\n")
    ),
    summary: {
      en: "Compares two values deeply and null-safely.",
      ru: "Сравнивает два значения вглубь и безопасно относительно null.",
      uk: "Порівнює два значення вглиб і безпечно щодо null.",
      de: "Vergleicht zwei Werte tief und null-sicher.",
      fr: "Compare deux valeurs en profondeur et sans risque avec null."
    },
    description: {
      en: [
        "Objects and arrays are walked key by key, dates by their instant, and primitives by `SameValueZero` — so `NaN` equals `NaN`, which `===` never grants. A value carrying its own `equals` method is asked instead of being taken apart.",
        "Cycles are tolerated: a structure that refers back to itself is compared without looping."
      ],
      ru: [
        "Объекты и массивы обходятся по ключам, даты сравниваются по моменту времени, примитивы — по `SameValueZero`, поэтому `NaN` равен `NaN`, чего `===` никогда не даёт. Если у значения есть собственный метод `equals`, спрашивают его, а не разбирают значение по частям.",
        "Циклы допустимы: структура, ссылающаяся на себя, сравнивается без зацикливания."
      ],
      uk: [
        "Об'єкти та масиви обходяться за ключами, дати порівнюються за моментом часу, примітиви — за `SameValueZero`, тому `NaN` дорівнює `NaN`, чого `===` ніколи не дає. Якщо у значення є власний метод `equals`, питають його, а не розбирають значення на частини.",
        "Цикли припустимі: структура, що посилається на себе, порівнюється без зациклення."
      ],
      de: [
        "Objekte und Arrays werden Schlüssel für Schlüssel durchlaufen, Daten über ihren Zeitpunkt verglichen, Primitive über `SameValueZero` — `NaN` ist damit gleich `NaN`, was `===` nie zugesteht. Trägt ein Wert eine eigene `equals`-Methode, wird sie gefragt, statt den Wert zu zerlegen.",
        "Zyklen sind erlaubt: eine Struktur, die auf sich selbst verweist, wird ohne Endlosschleife verglichen."
      ],
      fr: [
        "Les objets et les tableaux sont parcourus clé par clé, les dates comparées par leur instant, et les primitives par `SameValueZero` — `NaN` égale donc `NaN`, ce que `===` n'accorde jamais. Une valeur portant sa propre méthode `equals` est interrogée plutôt que démontée.",
        "Les cycles sont tolérés : une structure qui se référence elle-même est comparée sans boucler."
      ]
    },
    params: {
      a: {
        en: "The first value.",
        ru: "Первое значение.",
        uk: "Перше значення.",
        de: "Der erste Wert.",
        fr: "La première valeur."
      },
      b: {
        en: "The second value.",
        ru: "Второе значение.",
        uk: "Друге значення.",
        de: "Der zweite Wert.",
        fr: "La seconde valeur."
      }
    },
    returns: {
      en: "`true` when the two are equal all the way down.",
      ru: "`true`, если значения равны на всю глубину.",
      uk: "`true`, якщо значення рівні на всю глибину.",
      de: "`true`, wenn beide bis in die Tiefe gleich sind.",
      fr: "`true` si les deux sont égales jusqu'au bout."
    },
    title: {
      en: "Comparing",
      ru: "Сравнение",
      uk: "Порівняння",
      de: "Vergleichen",
      fr: "Comparaison"
    }
  }),

  hashCode: entry({
    seeAlso: ["equals", "stringifyJson"],
    examples: code(['hashCode("abc"); // => 96354', 'hashCode(""); // => 0'].join("\n")),
    summary: {
      en: "Produces a numeric hash for any value.",
      ru: "Вычисляет числовой хеш для любого значения.",
      uk: "Обчислює числовий хеш для будь-якого значення.",
      de: "Erzeugt einen numerischen Hash für einen beliebigen Wert.",
      fr: "Produit un condensé numérique pour n'importe quelle valeur."
    },
    description: {
      en: [
        "The value is turned into a string first — an object through the key-sorted form `stringifyJson` produces — and the string is folded into a 32-bit integer. Two values that `equals` considers equal hash the same.",
        "It is a bucket key, not a checksum: different values can collide, and the result is not stable across releases of the library."
      ],
      ru: [
        "Значение сначала превращается в строку — объект через форму с отсортированными ключами, которую даёт `stringifyJson`, — а строка сворачивается в 32-битное целое. Два значения, равные по `equals`, дают одинаковый хеш.",
        "Это ключ корзины, а не контрольная сумма: разные значения могут совпасть, и результат не гарантирован между версиями библиотеки."
      ],
      uk: [
        "Значення спершу перетворюється на рядок — об'єкт через форму з відсортованими ключами, яку дає `stringifyJson`, — а рядок згортається в 32-бітне ціле. Два значення, рівні за `equals`, дають однаковий хеш.",
        "Це ключ кошика, а не контрольна сума: різні значення можуть збігтися, і результат не гарантований між версіями бібліотеки."
      ],
      de: [
        "Der Wert wird zuerst zu einer Zeichenkette — ein Objekt über die schlüsselsortierte Form von `stringifyJson` — und die Zeichenkette zu einer 32-Bit-Ganzzahl gefaltet. Zwei Werte, die `equals` für gleich hält, hashen gleich.",
        "Es ist ein Eimerschlüssel, keine Prüfsumme: verschiedene Werte können kollidieren, und das Ergebnis ist über Versionen der Bibliothek hinweg nicht garantiert."
      ],
      fr: [
        "La valeur est d'abord transformée en chaîne — un objet via la forme à clés triées que produit `stringifyJson` — puis la chaîne est repliée en un entier 32 bits. Deux valeurs qu'`equals` juge égales donnent le même condensé.",
        "C'est une clé de seau, pas une somme de contrôle : des valeurs différentes peuvent entrer en collision, et le résultat n'est pas garanti d'une version à l'autre."
      ]
    },
    params: {
      value: {
        en: "The value to hash.",
        ru: "Значение для хеширования.",
        uk: "Значення для хешування.",
        de: "Der zu hashende Wert.",
        fr: "La valeur à condenser."
      }
    },
    returns: {
      en: "a 32-bit integer; `0` for an empty string.",
      ru: "32-битное целое; `0` для пустой строки.",
      uk: "32-бітне ціле; `0` для порожнього рядка.",
      de: "eine 32-Bit-Ganzzahl; `0` bei leerer Zeichenkette.",
      fr: "un entier 32 bits ; `0` pour une chaîne vide."
    },
    title: { en: "Hashing", ru: "Хеширование", uk: "Хешування", de: "Hashen", fr: "Condensé" }
  }),

  flat: entry({
    seeAlso: ["getPath", "setPath"],
    examples: code(
      [
        'flat({ a: { b: 1 }, c: [1, 2] }); // => { "a.b": 1, "c": [1, 2] }',
        'flat({ a: { b: { c: 1 } } }, 1); // => { "a.b": { "c": 1 } }'
      ].join("\n")
    ),
    summary: {
      en: "Flattens a nested object into one level of dotted keys.",
      ru: "Разворачивает вложенный объект в один уровень с ключами через точку.",
      uk: "Розгортає вкладений об'єкт в один рівень з ключами через крапку.",
      de: "Flacht ein verschachteltes Objekt auf eine Ebene mit Punktschlüsseln ab.",
      fr: "Aplatit un objet imbriqué en un seul niveau de clés pointées."
    },
    description: {
      en: [
        "Nested objects become dotted paths; arrays are kept whole, because their indices are data rather than structure. `depth` stops the descent — `1` flattens the first level only.",
        "The inverse walk is `getPath`, which reads a value back out by the same kind of path."
      ],
      ru: [
        "Вложенные объекты превращаются в пути через точку; массивы остаются целыми, потому что их индексы — это данные, а не структура. `depth` останавливает спуск: `1` разворачивает только первый уровень.",
        "Обратный ход — `getPath`, который читает значение по такому же пути."
      ],
      uk: [
        "Вкладені об'єкти перетворюються на шляхи через крапку; масиви лишаються цілими, бо їхні індекси — це дані, а не структура. `depth` зупиняє спуск: `1` розгортає лише перший рівень.",
        "Зворотний хід — `getPath`, який читає значення за таким самим шляхом."
      ],
      de: [
        "Verschachtelte Objekte werden zu Punktpfaden; Arrays bleiben ganz, denn ihre Indizes sind Daten, keine Struktur. `depth` beendet den Abstieg — `1` flacht nur die erste Ebene ab.",
        "Der umgekehrte Weg ist `getPath`, das einen Wert über denselben Pfadtyp wieder ausliest."
      ],
      fr: [
        "Les objets imbriqués deviennent des chemins pointés ; les tableaux restent entiers, car leurs indices sont des données et non de la structure. `depth` arrête la descente — `1` n'aplatit que le premier niveau.",
        "Le chemin inverse est `getPath`, qui relit une valeur par le même type de chemin."
      ]
    },
    params: {
      source: {
        en: "The object to flatten. It must not be an array.",
        ru: "Объект для разворачивания. Не должен быть массивом.",
        uk: "Об'єкт для розгортання. Не має бути масивом.",
        de: "Das abzuflachende Objekt. Es darf kein Array sein.",
        fr: "L'objet à aplatir. Ce ne doit pas être un tableau."
      },
      depth: {
        en: "How many levels to descend. Any whole number; unlimited by default.",
        ru: "Сколько уровней проходить. Любое целое; по умолчанию без ограничения.",
        uk: "Скільки рівнів проходити. Будь-яке ціле; типово без обмеження.",
        de: "Wie viele Ebenen abgestiegen wird. Eine ganze Zahl; standardmäßig unbegrenzt.",
        fr: "Combien de niveaux descendre. Un entier ; illimité par défaut."
      }
    },
    returns: {
      en: "a new flat object keyed by dotted paths.",
      ru: "новый плоский объект с ключами-путями через точку.",
      uk: "новий плоский об'єкт з ключами-шляхами через крапку.",
      de: "ein neues flaches Objekt mit Punktpfaden als Schlüsseln.",
      fr: "un nouvel objet plat dont les clés sont des chemins pointés."
    },
    throws: NOT_OBJECT,
    title: {
      en: "Flattening",
      ru: "Разворачивание",
      uk: "Розгортання",
      de: "Abflachen",
      fr: "Aplatissement"
    }
  }),

  getPath: entry({
    seeAlso: ["setPath", "flat"],
    examples: code(
      [
        'getPath({ a: { b: 1 } }, "a.b"); // => 1',
        'getPath({}, "a.b", "fallback"); // => "fallback"',
        'getPath({ rows: [{ id: 7 }] }, ["rows", 0, "id"]); // => 7'
      ].join("\n")
    ),
    summary: {
      en: "Reads a nested property by path, with a fallback.",
      ru: "Читает вложенное свойство по пути, с запасным значением.",
      uk: "Читає вкладену властивість за шляхом, із запасним значенням.",
      de: "Liest eine verschachtelte Eigenschaft über einen Pfad, mit Rückfallwert.",
      fr: "Lit une propriété imbriquée par chemin, avec valeur de repli."
    },
    description: {
      en: [
        'The path is either a dotted string or an array of segments; array indices go in as numbers, as in `["rows", 0, "id"]`. Bracket syntax inside a string is **not** parsed — `"rows[0].id"` finds nothing.',
        "A missing or nil link anywhere along the path yields the fallback instead of throwing, which is the whole point over `a.b.c`."
      ],
      ru: [
        'Путь — либо строка через точку, либо массив сегментов; индексы массива передаются числами, как в `["rows", 0, "id"]`. Скобочный синтаксис внутри строки **не** разбирается: `"rows[0].id"` ничего не найдёт.',
        "Отсутствующее или пустое звено в любом месте пути даёт запасное значение, а не исключение, — ради этого функция и существует вместо `a.b.c`."
      ],
      uk: [
        'Шлях — або рядок через крапку, або масив сегментів; індекси масиву передаються числами, як у `["rows", 0, "id"]`. Дужковий синтаксис усередині рядка **не** розбирається: `"rows[0].id"` нічого не знайде.',
        "Відсутня або порожня ланка в будь-якому місці шляху дає запасне значення, а не виняток, — заради цього функція й існує замість `a.b.c`."
      ],
      de: [
        'Der Pfad ist entweder eine Punkt-Zeichenkette oder ein Array von Segmenten; Array-Indizes stehen als Zahlen darin, wie in `["rows", 0, "id"]`. Klammernsyntax innerhalb einer Zeichenkette wird **nicht** ausgewertet: `"rows[0].id"` findet nichts.',
        "Ein fehlendes oder leeres Glied irgendwo im Pfad liefert den Rückfallwert statt einer Ausnahme — genau dafür steht diese Funktion anstelle von `a.b.c`."
      ],
      fr: [
        'Le chemin est soit une chaîne pointée, soit un tableau de segments ; les indices de tableau y figurent en nombres, comme dans `["rows", 0, "id"]`. La syntaxe à crochets dans une chaîne n\'est **pas** analysée : `"rows[0].id"` ne trouve rien.',
        "Un maillon absent ou nul n'importe où sur le chemin renvoie la valeur de repli au lieu de lever, et c'est tout l'intérêt face à `a.b.c`."
      ]
    },
    params: {
      source: {
        en: "The value to read from.",
        ru: "Значение, из которого читаем.",
        uk: "Значення, з якого читаємо.",
        de: "Der Wert, aus dem gelesen wird.",
        fr: "La valeur d'où lire."
      },
      path: {
        en: "A dotted string, or an array of keys and indices.",
        ru: "Строка через точку или массив ключей и индексов.",
        uk: "Рядок через крапку або масив ключів та індексів.",
        de: "Eine Punkt-Zeichenkette oder ein Array aus Schlüsseln und Indizes.",
        fr: "Une chaîne pointée, ou un tableau de clés et d'indices."
      },
      fallback: {
        en: "Returned when the path does not resolve.",
        ru: "Возвращается, если путь не разрешается.",
        uk: "Повертається, якщо шлях не розв'язується.",
        de: "Wird zurückgegeben, wenn der Pfad ins Leere führt.",
        fr: "Renvoyée lorsque le chemin n'aboutit pas."
      }
    },
    returns: {
      en: "the value at the path, or the fallback.",
      ru: "значение по пути или запасное значение.",
      uk: "значення за шляхом або запасне значення.",
      de: "den Wert am Pfad oder den Rückfallwert.",
      fr: "la valeur au chemin, ou la valeur de repli."
    },
    title: { en: "Reading", ru: "Чтение", uk: "Читання", de: "Lesen", fr: "Lecture" }
  }),

  setPath: entry({
    seeAlso: ["getPath", "flat"],
    examples: code(
      [
        'setPath({}, "a.b", 1); // => { "a": { "b": 1 } }',
        'setPath({}, ["rows", 0, "id"], 7); // => { "rows": [{ "id": 7 }] }'
      ].join("\n")
    ),
    summary: {
      en: "Writes a nested property by path, creating what is missing.",
      ru: "Записывает вложенное свойство по пути, создавая недостающее.",
      uk: "Записує вкладену властивість за шляхом, створюючи те, чого бракує.",
      de: "Schreibt eine verschachtelte Eigenschaft über einen Pfad und legt Fehlendes an.",
      fr: "Écrit une propriété imbriquée par chemin, en créant ce qui manque."
    },
    description: {
      en: [
        'Missing links are created along the way: a numeric segment makes an array, a string segment an object. `setPath({}, ["rows", 0, "id"], 7)` therefore produces `{ rows: [{ id: 7 }] }`.',
        "**The target is modified in place** and returned, so the call composes but does not copy."
      ],
      ru: [
        'Недостающие звенья создаются по дороге: числовой сегмент даёт массив, строковый — объект. Поэтому `setPath({}, ["rows", 0, "id"], 7)` возвращает `{ rows: [{ id: 7 }] }`.',
        "**Целевой объект изменяется на месте** и возвращается: вызов удобно встраивать в выражение, но копии он не делает."
      ],
      uk: [
        'Відсутні ланки створюються дорогою: числовий сегмент дає масив, рядковий — об\'єкт. Тому `setPath({}, ["rows", 0, "id"], 7)` повертає `{ rows: [{ id: 7 }] }`.',
        "**Цільовий об'єкт змінюється на місці** й повертається: виклик зручно вбудовувати у вираз, але копії він не робить."
      ],
      de: [
        'Fehlende Glieder entstehen unterwegs: ein numerisches Segment erzeugt ein Array, ein Zeichenketten-Segment ein Objekt. `setPath({}, ["rows", 0, "id"], 7)` ergibt daher `{ rows: [{ id: 7 }] }`.',
        "**Das Ziel wird an Ort und Stelle verändert** und zurückgegeben; der Aufruf lässt sich einsetzen, kopiert aber nicht."
      ],
      fr: [
        'Les maillons manquants sont créés en chemin : un segment numérique fabrique un tableau, un segment textuel un objet. `setPath({}, ["rows", 0, "id"], 7)` donne donc `{ rows: [{ id: 7 }] }`.',
        "**La cible est modifiée sur place** puis renvoyée : l'appel s'insère dans une expression mais ne copie rien."
      ]
    },
    params: {
      target: {
        en: "The object to write into. It is modified.",
        ru: "Объект, в который пишем. Он изменяется.",
        uk: "Об'єкт, у який пишемо. Він змінюється.",
        de: "Das Objekt, in das geschrieben wird. Es wird verändert.",
        fr: "L'objet où écrire. Il est modifié."
      },
      path: {
        en: "A dotted string, or an array of keys and indices.",
        ru: "Строка через точку или массив ключей и индексов.",
        uk: "Рядок через крапку або масив ключів та індексів.",
        de: "Eine Punkt-Zeichenkette oder ein Array aus Schlüsseln und Indizes.",
        fr: "Une chaîne pointée, ou un tableau de clés et d'indices."
      },
      value: {
        en: "The value to write.",
        ru: "Записываемое значение.",
        uk: "Значення, що записується.",
        de: "Der zu schreibende Wert.",
        fr: "La valeur à écrire."
      }
    },
    returns: {
      en: "the same object, now carrying the value.",
      ru: "тот же объект, уже с записанным значением.",
      uk: "той самий об'єкт, уже із записаним значенням.",
      de: "dasselbe Objekt, nun mit dem Wert.",
      fr: "le même objet, portant désormais la valeur."
    },
    throws: {
      IllegalArgumentException: {
        en: "the target is not an object, or the path is empty.",
        ru: "цель не объект или путь пуст.",
        uk: "ціль не об'єкт або шлях порожній.",
        de: "das Ziel ist kein Objekt oder der Pfad ist leer.",
        fr: "la cible n'est pas un objet, ou le chemin est vide."
      }
    },
    title: { en: "Writing", ru: "Запись", uk: "Запис", de: "Schreiben", fr: "Écriture" }
  }),

  objectToString: entry({
    seeAlso: ["isObject", "isRegExp"],
    examples: code(
      [
        'objectToString([]); // => "[object Array]"',
        'objectToString(null); // => "[object Null]"',
        'objectToString(new Date()); // => "[object Date]"'
      ].join("\n")
    ),
    summary: {
      en: "Returns the internal tag of a value.",
      ru: "Возвращает внутренний тег значения.",
      uk: "Повертає внутрішній тег значення.",
      de: "Gibt den internen Tag eines Werts zurück.",
      fr: "Renvoie le tag interne d'une valeur."
    },
    description: {
      en: [
        "`Object.prototype.toString.call(value)`, in a form that is safe to call on anything, including `null` and `undefined`. Several guards in this library are built on it, because the tag survives crossing a frame boundary where `instanceof` does not."
      ],
      ru: [
        "`Object.prototype.toString.call(value)` в форме, которую можно вызывать на чём угодно, включая `null` и `undefined`. На нём построено несколько проверок библиотеки: тег переживает переход между фреймами, чего `instanceof` не умеет."
      ],
      uk: [
        "`Object.prototype.toString.call(value)` у формі, яку можна викликати на будь-чому, включно з `null` і `undefined`. На ньому побудовано кілька перевірок бібліотеки: тег переживає перехід між фреймами, чого `instanceof` не вміє."
      ],
      de: [
        "`Object.prototype.toString.call(value)`, in einer Form, die sich auf alles anwenden lässt, auch auf `null` und `undefined`. Mehrere Prüfungen dieser Bibliothek bauen darauf, denn der Tag übersteht einen Frame-Wechsel, den `instanceof` nicht übersteht."
      ],
      fr: [
        "`Object.prototype.toString.call(value)`, sous une forme appelable sur n'importe quoi, y compris `null` et `undefined`. Plusieurs gardes de cette bibliothèque s'appuient dessus, car le tag survit au passage d'un frame à l'autre, contrairement à `instanceof`."
      ]
    },
    params: {
      value: {
        en: "The value to tag.",
        ru: "Значение, тег которого нужен.",
        uk: "Значення, тег якого потрібен.",
        de: "Der Wert, dessen Tag gesucht ist.",
        fr: "La valeur dont on veut le tag."
      }
    },
    returns: {
      en: 'the tag, such as `"[object Array]"`.',
      ru: 'тег, например `"[object Array]"`.',
      uk: 'тег, наприклад `"[object Array]"`.',
      de: 'den Tag, etwa `"[object Array]"`.',
      fr: 'le tag, par exemple `"[object Array]"`.'
    },
    title: {
      en: "Reading the tag",
      ru: "Чтение тега",
      uk: "Читання тега",
      de: "Den Tag lesen",
      fr: "Lire le tag"
    }
  })
};
