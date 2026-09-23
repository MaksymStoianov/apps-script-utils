/** Prose for the path helpers and the odds and ends. */

import { code, entry } from "./_entry.mjs";

export const FUNCTIONS = {
  join: entry({
    seeAlso: ["normalize", "parse", "isAbsolute"],
    examples: code(
      [
        'join("a", "b/c"); // => "a/b/c"',
        'join("a", "", "b"); // => "a/b"',
        'join("/a", "../b"); // => "/b"'
      ].join("\n")
    ),
    summary: {
      en: "Joins path segments with a single separator between them.",
      ru: "Склеивает сегменты пути, оставляя между ними один разделитель.",
      uk: "Склеює сегменти шляху, лишаючи між ними один роздільник.",
      de: "Fügt Pfadsegmente mit genau einem Trenner dazwischen zusammen.",
      fr: "Assemble des segments de chemin avec un seul séparateur entre eux."
    },
    description: {
      en: [
        "Empty segments are dropped, doubled separators collapse into one, and the result is normalised afterwards — so a `..` written mid-path is resolved rather than carried along.",
        "This is string work, not filesystem work: nothing is checked for existence."
      ],
      ru: [
        "Пустые сегменты отбрасываются, сдвоенные разделители схлопываются в один, а результат затем нормализуется, поэтому `..` в середине пути разрешается, а не тащится дальше.",
        "Это работа со строками, а не с файловой системой: существование ничего не проверяется."
      ],
      uk: [
        "Порожні сегменти відкидаються, здвоєні роздільники схлопуються в один, а результат потім нормалізується, тому `..` посередині шляху розв'язується, а не тягнеться далі.",
        "Це робота з рядками, а не з файловою системою: існування нічого не перевіряється."
      ],
      de: [
        "Leere Segmente entfallen, doppelte Trenner fallen zu einem zusammen, und das Ergebnis wird anschließend normalisiert — ein `..` mitten im Pfad wird also aufgelöst statt mitgeschleppt.",
        "Das ist Zeichenkettenarbeit, keine Dateisystemarbeit: auf Existenz wird nichts geprüft."
      ],
      fr: [
        "Les segments vides sont écartés, les séparateurs doublés se réduisent à un seul, et le résultat est ensuite normalisé — un `..` au milieu du chemin est donc résolu plutôt que transporté.",
        "C'est du travail sur des chaînes, pas sur un système de fichiers : rien n'est vérifié quant à l'existence."
      ]
    },
    params: {
      paths: {
        en: "The segments to join.",
        ru: "Сегменты, которые нужно склеить.",
        uk: "Сегменти, які треба склеїти.",
        de: "Die zu verbindenden Segmente.",
        fr: "Les segments à assembler."
      }
    },
    returns: {
      en: "the joined, normalised path.",
      ru: "склеенный и нормализованный путь.",
      uk: "склеєний і нормалізований шлях.",
      de: "den zusammengefügten, normalisierten Pfad.",
      fr: "le chemin assemblé et normalisé."
    },
    title: {
      en: "Joining",
      ru: "Склеивание",
      uk: "Склеювання",
      de: "Zusammenfügen",
      fr: "Assemblage"
    }
  }),

  normalize: entry({
    seeAlso: ["join", "parse"],
    examples: code(
      ['normalize("a/./b/../c"); // => "/a/c"', 'normalize("/a/b/../c/"); // => "/a/c"'].join("\n")
    ),
    summary: {
      en: "Resolves the `.` and `..` segments of a path.",
      ru: "Разрешает сегменты `.` и `..` в пути.",
      uk: "Розв'язує сегменти `.` та `..` у шляху.",
      de: "Löst die Segmente `.` und `..` eines Pfades auf.",
      fr: "Résout les segments `.` et `..` d'un chemin."
    },
    description: {
      en: [
        "A `.` is dropped, a `..` removes the segment before it, repeated separators collapse, and a trailing separator is removed.",
        'The result always starts at the root: `normalize("a/b")` is `"/a/b"`. Use `join` when a relative path has to stay relative.'
      ],
      ru: [
        "`.` отбрасывается, `..` убирает предыдущий сегмент, повторяющиеся разделители схлопываются, конечный разделитель удаляется.",
        'Результат всегда начинается от корня: `normalize("a/b")` даёт `"/a/b"`. Если относительный путь должен остаться относительным, берите `join`.'
      ],
      uk: [
        "`.` відкидається, `..` прибирає попередній сегмент, повторювані роздільники схлопуються, кінцевий роздільник видаляється.",
        'Результат завжди починається від кореня: `normalize("a/b")` дає `"/a/b"`. Якщо відносний шлях має лишитися відносним, беріть `join`.'
      ],
      de: [
        "Ein `.` entfällt, ein `..` entfernt das Segment davor, wiederholte Trenner fallen zusammen, ein abschließender Trenner wird entfernt.",
        'Das Ergebnis beginnt immer an der Wurzel: `normalize("a/b")` ergibt `"/a/b"`. Soll ein relativer Pfad relativ bleiben, nehmen Sie `join`.'
      ],
      fr: [
        "Un `.` disparaît, un `..` supprime le segment précédent, les séparateurs répétés se réduisent, et un séparateur final est retiré.",
        'Le résultat part toujours de la racine : `normalize("a/b")` donne `"/a/b"`. Si un chemin relatif doit le rester, utilisez `join`.'
      ]
    },
    params: {
      path: {
        en: "The path to normalise.",
        ru: "Путь для нормализации.",
        uk: "Шлях для нормалізації.",
        de: "Der zu normalisierende Pfad.",
        fr: "Le chemin à normaliser."
      }
    },
    returns: {
      en: "the normalised path.",
      ru: "нормализованный путь.",
      uk: "нормалізований шлях.",
      de: "den normalisierten Pfad.",
      fr: "le chemin normalisé."
    },
    title: {
      en: "Normalising",
      ru: "Нормализация",
      uk: "Нормалізація",
      de: "Normalisieren",
      fr: "Normalisation"
    }
  }),

  parse: entry({
    seeAlso: ["join", "normalize"],
    examples: code(
      [
        'parse("/a/b/c.txt");',
        '// => { root: "/", dir: "/a/b", base: "c.txt", name: "c", ext: ".txt" }',
        "",
        'parse("readme.md");',
        '// => { base: "readme.md", name: "readme", ext: ".md" }'
      ].join("\n")
    ),
    summary: {
      en: "Breaks a path into its parts.",
      ru: "Разбирает путь на составные части.",
      uk: "Розбирає шлях на складові частини.",
      de: "Zerlegt einen Pfad in seine Teile.",
      fr: "Décompose un chemin en ses parties."
    },
    description: {
      en: [
        "The result carries `root`, `dir`, `base`, `name` and `ext`, the same five parts Node's `path.parse` reports. A part that the path does not have is simply absent from the object, so a bare file name comes back with `base`, `name` and `ext` only.",
        "`ext` includes the dot, and a name that begins with one — `.gitignore` — is a name, not an extension."
      ],
      ru: [
        "В результате есть `root`, `dir`, `base`, `name` и `ext` — те же пять частей, что возвращает `path.parse` в Node. Часть, которой в пути нет, просто отсутствует в объекте, поэтому голое имя файла возвращается только с `base`, `name` и `ext`.",
        "`ext` включает точку, а имя, начинающееся с точки, — `.gitignore` — это имя, а не расширение."
      ],
      uk: [
        "У результаті є `root`, `dir`, `base`, `name` та `ext` — ті самі п'ять частин, що повертає `path.parse` у Node. Частина, якої в шляху немає, просто відсутня в об'єкті, тому голе ім'я файлу повертається лише з `base`, `name` та `ext`.",
        "`ext` включає крапку, а ім'я, що починається з крапки, — `.gitignore` — це ім'я, а не розширення."
      ],
      de: [
        "Das Ergebnis trägt `root`, `dir`, `base`, `name` und `ext` — dieselben fünf Teile, die Nodes `path.parse` meldet. Ein Teil, den der Pfad nicht hat, fehlt im Objekt schlicht, ein blanker Dateiname kommt also nur mit `base`, `name` und `ext` zurück.",
        "`ext` enthält den Punkt, und ein Name, der mit einem beginnt — `.gitignore` — ist ein Name, keine Endung."
      ],
      fr: [
        "Le résultat porte `root`, `dir`, `base`, `name` et `ext`, les cinq mêmes parties que rapporte `path.parse` de Node. Une partie que le chemin n'a pas est simplement absente de l'objet : un simple nom de fichier revient avec `base`, `name` et `ext` seulement.",
        "`ext` inclut le point, et un nom qui commence par un point — `.gitignore` — est un nom, pas une extension."
      ]
    },
    params: {
      path: {
        en: "The path to break apart.",
        ru: "Путь, который нужно разобрать.",
        uk: "Шлях, який треба розібрати.",
        de: "Der zu zerlegende Pfad.",
        fr: "Le chemin à décomposer."
      }
    },
    returns: {
      en: "an object with the parts the path has.",
      ru: "объект с теми частями, которые есть в пути.",
      uk: "об'єкт із тими частинами, які є в шляху.",
      de: "ein Objekt mit den Teilen, die der Pfad hat.",
      fr: "un objet portant les parties présentes dans le chemin."
    },
    title: {
      en: "Breaking a path apart",
      ru: "Разбор пути",
      uk: "Розбір шляху",
      de: "Einen Pfad zerlegen",
      fr: "Décomposer un chemin"
    }
  }),

  toInteger: entry({
    seeAlso: ["isInteger", "isNumberLike", "requireInteger"],
    examples: code(
      [
        'toInteger(" 42 "); // => 42',
        'toInteger("12abc"); // => 12',
        'toInteger("abc"); // => null',
        "toInteger(null); // => null",
        "toInteger(1.9); // => 1.9"
      ].join("\n")
    ),
    summary: {
      en: "Reads a number out of a value, or reports that there is none.",
      ru: "Извлекает число из значения или сообщает, что числа нет.",
      uk: "Видобуває число зі значення або повідомляє, що числа немає.",
      de: "Liest eine Zahl aus einem Wert oder meldet, dass keine da ist.",
      fr: "Extrait un nombre d'une valeur, ou signale qu'il n'y en a pas."
    },
    description: {
      en: [
        'A string is read with `parseInt`, which takes the leading digits and stops: `"12abc"` gives `12`. Text with no leading digits, an empty string, `null` and `undefined` all give `null`, so the failure is a value you can check rather than a `NaN` that spreads.',
        "A number passes through untouched — including a fractional one, which is why `toInteger(1.9)` is `1.9` and not `1`. Reach for `Math.trunc` or `requireInteger` when a whole number is what the call actually needs."
      ],
      ru: [
        'Строка читается через `parseInt`, который берёт ведущие цифры и останавливается: `"12abc"` даёт `12`. Текст без ведущих цифр, пустая строка, `null` и `undefined` дают `null`, то есть неудача — это значение, которое можно проверить, а не расползающийся `NaN`.',
        "Число проходит насквозь без изменений, в том числе дробное, поэтому `toInteger(1.9)` — это `1.9`, а не `1`. Если нужно именно целое, берите `Math.trunc` или `requireInteger`."
      ],
      uk: [
        'Рядок читається через `parseInt`, який бере провідні цифри й зупиняється: `"12abc"` дає `12`. Текст без провідних цифр, порожній рядок, `null` і `undefined` дають `null`, тобто невдача — це значення, яке можна перевірити, а не `NaN`, що розповзається.',
        "Число проходить наскрізь без змін, зокрема й дробове, тому `toInteger(1.9)` — це `1.9`, а не `1`. Якщо потрібне саме ціле, беріть `Math.trunc` або `requireInteger`."
      ],
      de: [
        'Eine Zeichenkette wird mit `parseInt` gelesen, das die führenden Ziffern nimmt und dann aufhört: `"12abc"` ergibt `12`. Text ohne führende Ziffern, die leere Zeichenkette, `null` und `undefined` ergeben `null` — das Scheitern ist also ein prüfbarer Wert und kein sich ausbreitendes `NaN`.',
        "Eine Zahl geht unverändert durch, auch eine gebrochene: `toInteger(1.9)` ist `1.9`, nicht `1`. Wird wirklich eine ganze Zahl gebraucht, nehmen Sie `Math.trunc` oder `requireInteger`."
      ],
      fr: [
        "Une chaîne est lue par `parseInt`, qui prend les chiffres de tête et s'arrête : `\"12abc\"` donne `12`. Un texte sans chiffre initial, la chaîne vide, `null` et `undefined` donnent `null` : l'échec est donc une valeur vérifiable, pas un `NaN` qui se propage.",
        "Un nombre passe intact, y compris fractionnaire : `toInteger(1.9)` vaut `1.9`, pas `1`. Utilisez `Math.trunc` ou `requireInteger` lorsqu'un entier est réellement attendu."
      ]
    },
    params: {
      value: {
        en: "The value to read.",
        ru: "Значение, из которого читаем.",
        uk: "Значення, з якого читаємо.",
        de: "Der zu lesende Wert.",
        fr: "La valeur à lire."
      }
    },
    returns: {
      en: "the number, or `null` when there is none to read.",
      ru: "число или `null`, если читать нечего.",
      uk: "число або `null`, якщо читати нічого.",
      de: "die Zahl oder `null`, wenn nichts zu lesen ist.",
      fr: "le nombre, ou `null` s'il n'y a rien à lire."
    },
    title: {
      en: "Reading a number",
      ru: "Чтение числа",
      uk: "Читання числа",
      de: "Eine Zahl lesen",
      fr: "Lire un nombre"
    }
  }),

  requireState: entry({
    seeAlso: ["requireNonNull", "IllegalStateException"],
    examples: code(
      [
        "function close(connection) {",
        '  requireState(connection.isOpen, "The connection is already closed.");',
        "",
        "  connection.release();",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Asserts that a condition holds, throwing when it does not.",
      ru: "Утверждает, что условие выполняется, и бросает исключение, если нет.",
      uk: "Стверджує, що умова виконується, і кидає виняток, якщо ні.",
      de: "Behauptet, dass eine Bedingung gilt, und wirft, wenn nicht.",
      fr: "Affirme qu'une condition tient, et lève dans le cas contraire."
    },
    description: {
      en: [
        "For the checks that are about the moment rather than the arguments: a connection that is already closed, a sheet that has not been prepared yet, a value that was supposed to be cached by now.",
        "It is declared as a TypeScript assertion, so after the call the compiler treats the condition as true for the rest of the function."
      ],
      ru: [
        "Для проверок, которые касаются момента, а не аргументов: соединение уже закрыто, лист ещё не подготовлен, значение к этому времени должно было попасть в кеш.",
        "Функция объявлена как assertion в TypeScript, поэтому после вызова компилятор считает условие истинным до конца функции."
      ],
      uk: [
        "Для перевірок, що стосуються моменту, а не аргументів: з'єднання вже закрито, аркуш ще не підготовлено, значення на цей час мало потрапити в кеш.",
        "Функція оголошена як assertion у TypeScript, тому після виклику компілятор вважає умову істинною до кінця функції."
      ],
      de: [
        "Für Prüfungen, bei denen es um den Zeitpunkt geht und nicht um die Argumente: eine bereits geschlossene Verbindung, ein noch nicht vorbereitetes Blatt, ein Wert, der längst im Cache liegen sollte.",
        "Sie ist als TypeScript-Assertion deklariert, nach dem Aufruf hält der Compiler die Bedingung für den Rest der Funktion für wahr."
      ],
      fr: [
        "Pour les vérifications qui portent sur le moment plutôt que sur les arguments : une connexion déjà fermée, une feuille pas encore préparée, une valeur censée être en cache à cet instant.",
        "Elle est déclarée comme assertion TypeScript : après l'appel, le compilateur tient la condition pour vraie jusqu'à la fin de la fonction."
      ]
    },
    params: {
      condition: {
        en: "The condition that must hold.",
        ru: "Условие, которое должно выполняться.",
        uk: "Умова, яка має виконуватися.",
        de: "Die Bedingung, die gelten muss.",
        fr: "La condition qui doit tenir."
      },
      message: {
        en: "The message of the exception. A default is used when omitted.",
        ru: "Сообщение исключения. Если не задано, используется сообщение по умолчанию.",
        uk: "Повідомлення винятку. Якщо не задано, використовується типове повідомлення.",
        de: "Die Meldung der Ausnahme. Ohne Angabe wird eine Standardmeldung verwendet.",
        fr: "Le message de l'exception. À défaut, un message par défaut est utilisé."
      }
    },
    returns: {
      en: "nothing; it either passes or throws.",
      ru: "ничего: вызов либо проходит, либо бросает исключение.",
      uk: "нічого: виклик або проходить, або кидає виняток.",
      de: "nichts; der Aufruf besteht oder wirft.",
      fr: "rien ; l'appel passe ou lève."
    },
    throws: {
      IllegalStateException: {
        en: "the condition is falsy.",
        ru: "условие ложно.",
        uk: "умова хибна.",
        de: "die Bedingung ist unwahr.",
        fr: "la condition est fausse."
      }
    },
    title: {
      en: "Guarding a state",
      ru: "Проверка состояния",
      uk: "Перевірка стану",
      de: "Einen Zustand absichern",
      fr: "Garder un état"
    }
  }),

  retry: entry({
    seeAlso: ["requireState"],
    examples: code(
      [
        "const response = retry(() => UrlFetchApp.fetch(url), {",
        "  attempts: 4,",
        "  delay: 500,",
        "  multiplier: 2,",
        '  shouldRetry: (error) => String(error).includes("429")',
        "});"
      ].join("\n")
    ),
    summary: {
      en: "Calls a function again when it throws, with a growing wait between attempts.",
      ru: "Повторяет вызов функции при исключении, увеличивая паузу между попытками.",
      uk: "Повторює виклик функції при винятку, збільшуючи паузу між спробами.",
      de: "Ruft eine Funktion nach einem Fehler erneut auf, mit wachsender Wartezeit.",
      fr: "Rappelle une fonction quand elle lève, avec une attente croissante entre les tentatives."
    },
    description: {
      en: [
        "The wait starts at `delay`, is multiplied by `multiplier` after each failure and never exceeds `maxDelay`. `shouldRetry` decides whether a given failure is worth repeating at all — a rate limit usually is, a bad argument never is.",
        "The function receives the attempt number, starting at `1`. When the last attempt fails its error is thrown on. The wait itself goes through `sleep`, which defaults to `Utilities.sleep` where that exists and can be replaced in a test."
      ],
      ru: [
        "Пауза начинается с `delay`, после каждой неудачи умножается на `multiplier` и не превышает `maxDelay`. `shouldRetry` решает, стоит ли вообще повторять данную ошибку: превышение лимита обычно стоит, неверный аргумент — никогда.",
        "Функция получает номер попытки, начиная с `1`. Если последняя попытка не удалась, её ошибка пробрасывается наружу. Сама пауза выполняется через `sleep`, который по умолчанию берёт `Utilities.sleep`, где тот есть, и подменяется в тестах."
      ],
      uk: [
        "Пауза починається з `delay`, після кожної невдачі множиться на `multiplier` і не перевищує `maxDelay`. `shouldRetry` вирішує, чи варто взагалі повторювати цю помилку: перевищення ліміту зазвичай варто, хибний аргумент — ніколи.",
        "Функція отримує номер спроби, починаючи з `1`. Якщо остання спроба не вдалася, її помилка пробрасується назовні. Сама пауза виконується через `sleep`, який типово бере `Utilities.sleep`, де той є, і підміняється в тестах."
      ],
      de: [
        "Die Wartezeit beginnt bei `delay`, wird nach jedem Fehlschlag mit `multiplier` multipliziert und überschreitet `maxDelay` nie. `shouldRetry` entscheidet, ob ein Fehlschlag überhaupt eine Wiederholung wert ist — ein Ratenlimit meist, ein falsches Argument nie.",
        "Die Funktion bekommt die Versuchsnummer, beginnend bei `1`. Scheitert der letzte Versuch, wird sein Fehler weitergereicht. Das Warten läuft über `sleep`, standardmäßig `Utilities.sleep`, wo es das gibt, und in Tests ersetzbar."
      ],
      fr: [
        "L'attente part de `delay`, est multipliée par `multiplier` après chaque échec et ne dépasse jamais `maxDelay`. `shouldRetry` décide si un échec donné mérite d'être retenté — une limite de débit souvent, un mauvais argument jamais.",
        "La fonction reçoit le numéro de tentative, à partir de `1`. Si la dernière échoue, son erreur est relancée. L'attente passe par `sleep`, qui vaut `Utilities.sleep` là où il existe et se remplace dans un test."
      ]
    },
    params: {
      fn: {
        en: "The function to call. It receives the attempt number.",
        ru: "Вызываемая функция. Получает номер попытки.",
        uk: "Функція, що викликається. Отримує номер спроби.",
        de: "Die aufzurufende Funktion. Sie erhält die Versuchsnummer.",
        fr: "La fonction à appeler. Elle reçoit le numéro de tentative."
      },
      options: {
        en: "`attempts`, `delay`, `multiplier`, `maxDelay`, `shouldRetry` and `sleep`.",
        ru: "`attempts`, `delay`, `multiplier`, `maxDelay`, `shouldRetry` и `sleep`.",
        uk: "`attempts`, `delay`, `multiplier`, `maxDelay`, `shouldRetry` та `sleep`.",
        de: "`attempts`, `delay`, `multiplier`, `maxDelay`, `shouldRetry` und `sleep`.",
        fr: "`attempts`, `delay`, `multiplier`, `maxDelay`, `shouldRetry` et `sleep`."
      }
    },
    returns: {
      en: "whatever the function returns on the attempt that succeeds.",
      ru: "то, что вернула функция на удавшейся попытке.",
      uk: "те, що повернула функція на вдалій спробі.",
      de: "was die Funktion beim erfolgreichen Versuch zurückgibt.",
      fr: "ce que renvoie la fonction lors de la tentative réussie."
    },
    throws: {
      IllegalArgumentException: {
        en: "the first argument is not a function, or an option is out of range.",
        ru: "первый аргумент не функция или значение параметра вне допустимого диапазона.",
        uk: "перший аргумент не функція або значення параметра поза припустимим діапазоном.",
        de: "das erste Argument ist keine Funktion oder eine Option liegt außerhalb des Bereichs.",
        fr: "le premier argument n'est pas une fonction, ou une option est hors de l'intervalle."
      }
    },
    title: {
      en: "Retrying a flaky call",
      ru: "Повтор ненадёжного вызова",
      uk: "Повтор ненадійного виклику",
      de: "Einen unzuverlässigen Aufruf wiederholen",
      fr: "Retenter un appel instable"
    }
  })
};
