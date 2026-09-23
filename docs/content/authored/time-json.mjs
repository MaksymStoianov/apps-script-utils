/** Prose for the JSON pair, the time helpers and the path helpers. */

import { code, entry } from "./_entry.mjs";

const DATE_PARAM = {
  en: "The date to read. It must be a valid `Date`.",
  ru: "Дата, которую читаем. Должна быть корректным `Date`.",
  uk: "Дата, яку читаємо. Має бути коректним `Date`.",
  de: "Das zu lesende Datum. Es muss ein gültiges `Date` sein.",
  fr: "La date à lire. Ce doit être un `Date` valide."
};

const INVALID_DATE = {
  IllegalArgumentException: {
    en: "an argument is not a valid `Date`.",
    ru: "аргумент не является корректным `Date`.",
    uk: "аргумент не є коректним `Date`.",
    de: "ein Argument ist kein gültiges `Date`.",
    fr: "un argument n'est pas un `Date` valide."
  }
};

export const FUNCTIONS = {
  parseJson: entry({
    seeAlso: ["stringifyJson"],
    examples: code(
      [
        'parseJson(\'{"a":1,"b":[1,2]}\'); // => {"a":1,"b":[1,2]}',
        'parseJson("{a: \'x\', b: 1}"); // => {"a":"x","b":1}'
      ].join("\n")
    ),
    summary: {
      en: "Parses JSON, and retries with a relaxed reader when strict parsing fails.",
      ru: "Разбирает JSON, а при неудаче строгого разбора пробует нестрогий.",
      uk: "Розбирає JSON, а при невдачі суворого розбору пробує нестрогий.",
      de: "Liest JSON und versucht es bei striktem Fehlschlag mit einem toleranten Leser erneut.",
      fr: "Analyse du JSON, puis réessaie avec un lecteur permissif si l'analyse stricte échoue."
    },
    description: {
      en: [
        "`JSON.parse` runs first. If it refuses, the text is tokenised again by rules that accept what hand-written configuration usually contains: unquoted keys and single-quoted strings.",
        "Text that neither reader can make sense of throws. This is for configuration a person typed, not for a payload from a service — for that, `JSON.parse` and its error are clearer."
      ],
      ru: [
        "Сначала работает `JSON.parse`. Если он отказывается, текст разбирается заново по правилам, допускающим то, что обычно встречается в конфигурации, написанной руками: ключи без кавычек и строки в одинарных кавычках.",
        "Текст, который не понял ни один из разборщиков, приводит к исключению. Это инструмент для конфигурации, набранной человеком, а не для ответа сервиса — там понятнее `JSON.parse` с его ошибкой."
      ],
      uk: [
        "Спершу працює `JSON.parse`. Якщо він відмовляється, текст розбирається заново за правилами, що допускають те, що зазвичай трапляється в конфігурації, написаній руками: ключі без лапок і рядки в одинарних лапках.",
        "Текст, якого не зрозумів жоден з розбірників, призводить до винятку. Це інструмент для конфігурації, набраної людиною, а не для відповіді сервісу — там зрозуміліший `JSON.parse` з його помилкою."
      ],
      de: [
        "Zuerst läuft `JSON.parse`. Weigert es sich, wird der Text nach Regeln erneut zerlegt, die zulassen, was handgeschriebene Konfiguration meist enthält: Schlüssel ohne Anführungszeichen und Zeichenketten in einfachen Anführungszeichen.",
        "Text, mit dem keiner der beiden Leser etwas anfangen kann, wirft. Gedacht für von Hand getippte Konfiguration, nicht für die Antwort eines Dienstes — dort ist `JSON.parse` mit seinem Fehler klarer."
      ],
      fr: [
        "`JSON.parse` s'exécute d'abord. S'il refuse, le texte est relu selon des règles qui acceptent ce que contient d'ordinaire une configuration écrite à la main : clés sans guillemets et chaînes entre apostrophes.",
        "Un texte qu'aucun des deux lecteurs ne comprend lève. C'est fait pour de la configuration saisie par une personne, pas pour la réponse d'un service — là, `JSON.parse` et son erreur sont plus clairs."
      ]
    },
    params: {
      value: {
        en: "The text to parse. It must not be empty.",
        ru: "Текст для разбора. Не должен быть пустым.",
        uk: "Текст для розбору. Не має бути порожнім.",
        de: "Der zu lesende Text. Er darf nicht leer sein.",
        fr: "Le texte à analyser. Il ne doit pas être vide."
      }
    },
    returns: {
      en: "the parsed value.",
      ru: "разобранное значение.",
      uk: "розібране значення.",
      de: "den gelesenen Wert.",
      fr: "la valeur analysée."
    },
    throws: {
      EmptyStringException: {
        en: "the value is not a string, or is empty.",
        ru: "значение не строка или строка пуста.",
        uk: "значення не рядок або рядок порожній.",
        de: "der Wert ist keine Zeichenkette oder ist leer.",
        fr: "la valeur n'est pas une chaîne, ou elle est vide."
      },
      SyntaxError: {
        en: "neither reader can parse the text.",
        ru: "ни один из разборщиков не смог прочитать текст.",
        uk: "жоден з розбірників не зміг прочитати текст.",
        de: "keiner der beiden Leser kann den Text lesen.",
        fr: "aucun des deux lecteurs ne peut analyser le texte."
      }
    },
    title: { en: "Parsing", ru: "Разбор", uk: "Розбір", de: "Lesen", fr: "Analyse" }
  }),

  stringifyJson: entry({
    seeAlso: ["parseJson", "hashCode", "equals"],
    examples: code(
      [
        'stringifyJson({ b: 1, a: 2 }); // => "{\\"a\\":2,\\"b\\":1}"',
        'stringifyJson([1, "a", null]); // => "[1,\\"a\\",null]"'
      ].join("\n")
    ),
    summary: {
      en: "Serialises a value to JSON with the object keys in a fixed order.",
      ru: "Сериализует значение в JSON с фиксированным порядком ключей.",
      uk: "Серіалізує значення в JSON із фіксованим порядком ключів.",
      de: "Serialisiert einen Wert nach JSON mit fester Schlüsselreihenfolge.",
      fr: "Sérialise une valeur en JSON avec un ordre de clés fixe."
    },
    description: {
      en: [
        "`JSON.stringify` writes keys in insertion order, so two objects that carry the same data can produce different text. Here the keys of every object are sorted, which makes the output a stable key — for a cache, a checksum or a comparison.",
        "It is what `hashCode` hashes, and the reason two equal objects hash alike."
      ],
      ru: [
        "`JSON.stringify` пишет ключи в порядке вставки, поэтому два объекта с одинаковыми данными могут дать разный текст. Здесь ключи каждого объекта сортируются, и результат годится как устойчивый ключ — для кеша, контрольной суммы или сравнения.",
        "Именно его хеширует `hashCode`, и именно поэтому два равных объекта дают одинаковый хеш."
      ],
      uk: [
        "`JSON.stringify` пише ключі в порядку вставлення, тому два об'єкти з однаковими даними можуть дати різний текст. Тут ключі кожного об'єкта сортуються, і результат годиться як стійкий ключ — для кешу, контрольної суми чи порівняння.",
        "Саме його хешує `hashCode`, і саме тому два рівні об'єкти дають однаковий хеш."
      ],
      de: [
        "`JSON.stringify` schreibt Schlüssel in Einfügereihenfolge, zwei Objekte mit denselben Daten können also unterschiedlichen Text ergeben. Hier werden die Schlüssel jedes Objekts sortiert, womit die Ausgabe als stabiler Schlüssel taugt — für einen Cache, eine Prüfsumme oder einen Vergleich.",
        "Genau das hasht `hashCode`, und deshalb hashen zwei gleiche Objekte gleich."
      ],
      fr: [
        "`JSON.stringify` écrit les clés dans l'ordre d'insertion : deux objets portant les mêmes données peuvent donc produire des textes différents. Ici, les clés de chaque objet sont triées, ce qui fait de la sortie une clé stable — pour un cache, une somme de contrôle ou une comparaison.",
        "C'est ce que condense `hashCode`, et la raison pour laquelle deux objets égaux donnent le même condensé."
      ]
    },
    params: {
      value: {
        en: "The value to serialise.",
        ru: "Значение для сериализации.",
        uk: "Значення для серіалізації.",
        de: "Der zu serialisierende Wert.",
        fr: "La valeur à sérialiser."
      }
    },
    returns: {
      en: "the JSON text, with object keys sorted.",
      ru: "текст JSON с отсортированными ключами объектов.",
      uk: "текст JSON із відсортованими ключами об'єктів.",
      de: "den JSON-Text mit sortierten Objektschlüsseln.",
      fr: "le texte JSON, clés d'objet triées."
    },
    title: {
      en: "Serialising",
      ru: "Сериализация",
      uk: "Серіалізація",
      de: "Serialisieren",
      fr: "Sérialisation"
    }
  }),

  diff: entry({
    seeAlso: ["offset", "getDaysInMonth"],
    examples: code(
      [
        'diff(new Date(2026, 0, 31), new Date(2026, 0, 1), "day"); // => 30',
        'diff(new Date(2026, 0, 1), new Date(2026, 0, 1, 12), "hour"); // => -12',
        'diff(new Date(2026, 0, 2, 1), new Date(2026, 0, 1, 23), "day"); // => 0'
      ].join("\n")
    ),
    summary: {
      en: "Returns the interval between two dates in a chosen unit.",
      ru: "Возвращает интервал между двумя датами в выбранных единицах.",
      uk: "Повертає інтервал між двома датами у вибраних одиницях.",
      de: "Gibt den Abstand zweier Daten in einer gewählten Einheit zurück.",
      fr: "Renvoie l'intervalle entre deux dates dans l'unité choisie."
    },
    description: {
      en: [
        "The result is the first date minus the second, so it is negative when the second is later. Whole units are reported by default; pass `float` to get the fraction as well.",
        "Milliseconds, seconds, minutes and hours are fixed lengths and are divided out exactly. Days, months and years are counted as whole elapsed units, which is why two hours across midnight is `0` days and not `1`."
      ],
      ru: [
        "Результат — первая дата минус вторая, поэтому он отрицателен, если вторая позже. По умолчанию возвращаются целые единицы; передайте `float`, чтобы получить и дробную часть.",
        "Миллисекунды, секунды, минуты и часы имеют фиксированную длину и делятся точно. Дни, месяцы и годы считаются целыми прошедшими единицами — поэтому два часа через полночь дают `0` дней, а не `1`."
      ],
      uk: [
        "Результат — перша дата мінус друга, тому він від'ємний, якщо друга пізніша. Типово повертаються цілі одиниці; передайте `float`, щоб отримати й дробову частину.",
        "Мілісекунди, секунди, хвилини та години мають фіксовану довжину й діляться точно. Дні, місяці та роки рахуються цілими минулими одиницями — тому дві години через північ дають `0` днів, а не `1`."
      ],
      de: [
        "Das Ergebnis ist das erste Datum minus das zweite, also negativ, wenn das zweite später liegt. Standardmäßig werden ganze Einheiten gemeldet; mit `float` kommt der Bruchteil hinzu.",
        "Millisekunden, Sekunden, Minuten und Stunden haben feste Längen und werden exakt geteilt. Tage, Monate und Jahre zählen als ganze vergangene Einheiten — zwei Stunden über Mitternacht ergeben deshalb `0` Tage und nicht `1`."
      ],
      fr: [
        "Le résultat est la première date moins la seconde : il est donc négatif quand la seconde est postérieure. Des unités entières sont renvoyées par défaut ; passez `float` pour obtenir aussi la fraction.",
        "Millisecondes, secondes, minutes et heures ont des longueurs fixes et sont divisées exactement. Jours, mois et années sont comptés en unités entières écoulées : deux heures de part et d'autre de minuit font donc `0` jour et non `1`."
      ]
    },
    params: {
      left: {
        en: "The date the interval is measured from.",
        ru: "Дата, от которой отмеряется интервал.",
        uk: "Дата, від якої відмірюється інтервал.",
        de: "Das Datum, von dem aus gemessen wird.",
        fr: "La date depuis laquelle l'intervalle est mesuré."
      },
      right: {
        en: "The date subtracted from it.",
        ru: "Дата, которая вычитается.",
        uk: "Дата, яка віднімається.",
        de: "Das Datum, das davon abgezogen wird.",
        fr: "La date qui en est retranchée."
      },
      unit: {
        en: '`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"month"` or `"year"`.',
        ru: '`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"month"` или `"year"`.',
        uk: '`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"month"` або `"year"`.',
        de: '`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"month"` oder `"year"`.',
        fr: '`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"month"` ou `"year"`.'
      },
      float: {
        en: "Keep the fractional part instead of truncating. Fixed-length units only.",
        ru: "Сохранить дробную часть вместо усечения. Только для единиц фиксированной длины.",
        uk: "Зберегти дробову частину замість усічення. Лише для одиниць фіксованої довжини.",
        de: "Den Bruchteil behalten statt abzuschneiden. Nur bei Einheiten fester Länge.",
        fr: "Conserver la partie fractionnaire au lieu de tronquer. Unités de longueur fixe seulement."
      }
    },
    returns: {
      en: "the interval, negative when the second date is later.",
      ru: "интервал, отрицательный, если вторая дата позже.",
      uk: "інтервал, від'ємний, якщо друга дата пізніша.",
      de: "den Abstand, negativ wenn das zweite Datum später liegt.",
      fr: "l'intervalle, négatif lorsque la seconde date est postérieure."
    },
    throws: {
      IllegalArgumentException: {
        en: "an argument is not a valid `Date`, or the unit is unknown.",
        ru: "аргумент не является корректным `Date` или единица неизвестна.",
        uk: "аргумент не є коректним `Date` або одиниця невідома.",
        de: "ein Argument ist kein gültiges `Date` oder die Einheit ist unbekannt.",
        fr: "un argument n'est pas un `Date` valide, ou l'unité est inconnue."
      }
    },
    title: {
      en: "Measuring an interval",
      ru: "Измерение интервала",
      uk: "Вимірювання інтервалу",
      de: "Einen Abstand messen",
      fr: "Mesurer un intervalle"
    }
  }),

  offset: entry({
    seeAlso: ["diff", "getDaysInMonth"],
    examples: code(
      [
        "const start = new Date(2026, 0, 31);",
        "",
        'offset(start, 1, "month"); // 28 February 2026 — the day is clamped',
        'offset(start, -1, "day"); // 30 January 2026'
      ].join("\n")
    ),
    summary: {
      en: "Shifts a date by an amount of a unit.",
      ru: "Сдвигает дату на заданное количество единиц.",
      uk: "Зсуває дату на задану кількість одиниць.",
      de: "Verschiebt ein Datum um eine Anzahl einer Einheit.",
      fr: "Décale une date d'un certain nombre d'unités."
    },
    description: {
      en: [
        "A new `Date` is returned; the one passed in is untouched. A negative amount moves backwards.",
        "Adding a month keeps the day of the month where it exists and clamps it where it does not: 31 January plus one month is 28 February, not 3 March."
      ],
      ru: [
        "Возвращается новый `Date`, переданный остаётся нетронутым. Отрицательное количество сдвигает назад.",
        "Прибавление месяца сохраняет день месяца, если он существует, и подтягивает его к концу месяца, если нет: 31 января плюс месяц — это 28 февраля, а не 3 марта."
      ],
      uk: [
        "Повертається новий `Date`, переданий лишається недоторканим. Від'ємна кількість зсуває назад.",
        "Додавання місяця зберігає день місяця, якщо він існує, і підтягує його до кінця місяця, якщо ні: 31 січня плюс місяць — це 28 лютого, а не 3 березня."
      ],
      de: [
        "Zurück kommt ein neues `Date`; das übergebene bleibt unberührt. Ein negativer Betrag verschiebt rückwärts.",
        "Ein Monat weiter behält den Monatstag, wo es ihn gibt, und zieht ihn sonst ans Monatsende: der 31. Januar plus ein Monat ist der 28. Februar, nicht der 3. März."
      ],
      fr: [
        "Un nouveau `Date` est renvoyé ; celui passé en argument reste intact. Un montant négatif recule.",
        "Ajouter un mois conserve le quantième là où il existe et le ramène en fin de mois sinon : le 31 janvier plus un mois donne le 28 février, pas le 3 mars."
      ]
    },
    params: {
      date: DATE_PARAM,
      amount: {
        en: "How many units to move. Negative moves backwards.",
        ru: "На сколько единиц сдвигать. Отрицательное значение — назад.",
        uk: "На скільки одиниць зсувати. Від'ємне значення — назад.",
        de: "Um wie viele Einheiten verschoben wird. Negativ heißt rückwärts.",
        fr: "De combien d'unités décaler. Un nombre négatif recule."
      },
      unit: {
        en: '`"millisecond"` through `"year"`, as for `diff`.',
        ru: 'От `"millisecond"` до `"year"`, как у `diff`.',
        uk: 'Від `"millisecond"` до `"year"`, як у `diff`.',
        de: 'Von `"millisecond"` bis `"year"`, wie bei `diff`.',
        fr: 'De `"millisecond"` à `"year"`, comme pour `diff`.'
      }
    },
    returns: {
      en: "a new date, shifted.",
      ru: "новая, сдвинутая дата.",
      uk: "нова, зсунута дата.",
      de: "ein neues, verschobenes Datum.",
      fr: "une nouvelle date, décalée."
    },
    throws: INVALID_DATE,
    title: {
      en: "Shifting a date",
      ru: "Сдвиг даты",
      uk: "Зсув дати",
      de: "Ein Datum verschieben",
      fr: "Décaler une date"
    }
  }),

  getDaysInMonth: entry({
    seeAlso: ["getDaysLeftInMonth", "offset"],
    examples: code("getDaysInMonth(new Date(2026, 1, 10)); // => 28"),
    summary: {
      en: "Returns how many days the month of a date has.",
      ru: "Возвращает количество дней в месяце указанной даты.",
      uk: "Повертає кількість днів у місяці вказаної дати.",
      de: "Gibt zurück, wie viele Tage der Monat eines Datums hat.",
      fr: "Renvoie le nombre de jours du mois d'une date."
    },
    description: {
      en: [
        "Leap years are handled by the calendar itself, so February is 29 days where it should be. Only the month and the year of the date matter; the day and the time are ignored."
      ],
      ru: [
        "Високосные годы обрабатывает сам календарь, поэтому в феврале оказывается 29 дней там, где им положено быть. Важны только месяц и год даты; день и время не учитываются."
      ],
      uk: [
        "Високосні роки обробляє сам календар, тому в лютому виявляється 29 днів там, де їм належить бути. Важливі лише місяць і рік дати; день і час не враховуються."
      ],
      de: [
        "Schaltjahre erledigt der Kalender selbst, der Februar hat also 29 Tage, wo er sie haben soll. Nur Monat und Jahr des Datums zählen; Tag und Uhrzeit bleiben unbeachtet."
      ],
      fr: [
        "Les années bissextiles sont gérées par le calendrier lui-même : février compte 29 jours là où il le doit. Seuls le mois et l'année comptent ; le jour et l'heure sont ignorés."
      ]
    },
    params: { date: DATE_PARAM },
    returns: {
      en: "the number of days, from 28 to 31.",
      ru: "количество дней, от 28 до 31.",
      uk: "кількість днів, від 28 до 31.",
      de: "die Anzahl der Tage, 28 bis 31.",
      fr: "le nombre de jours, de 28 à 31."
    },
    throws: INVALID_DATE,
    title: { en: "Counting", ru: "Подсчёт", uk: "Підрахунок", de: "Zählen", fr: "Comptage" }
  }),

  getDaysLeftInMonth: entry({
    seeAlso: ["getDaysInMonth", "diff"],
    examples: code("getDaysLeftInMonth(new Date(2026, 0, 20)); // => 11"),
    summary: {
      en: "Returns how many days remain between a date and the end of its month.",
      ru: "Возвращает, сколько дней остаётся от даты до конца её месяца.",
      uk: "Повертає, скільки днів лишається від дати до кінця її місяця.",
      de: "Gibt zurück, wie viele Tage von einem Datum bis zum Monatsende bleiben.",
      fr: "Renvoie combien de jours séparent une date de la fin de son mois."
    },
    description: {
      en: [
        "The date itself is not counted: on the last day of a month the answer is `0`. It is the number of days still to come, which is what a quota or a billing period usually wants."
      ],
      ru: [
        "Сама дата не считается: в последний день месяца ответ равен `0`. Это количество ещё предстоящих дней — то, что обычно и нужно для квоты или расчётного периода."
      ],
      uk: [
        "Сама дата не рахується: в останній день місяця відповідь дорівнює `0`. Це кількість ще прийдешніх днів — те, що зазвичай і потрібно для квоти чи розрахункового періоду."
      ],
      de: [
        "Das Datum selbst zählt nicht mit: am letzten Tag eines Monats lautet die Antwort `0`. Gemeint sind die noch kommenden Tage, was ein Kontingent oder ein Abrechnungszeitraum meist braucht."
      ],
      fr: [
        "La date elle-même n'est pas comptée : le dernier jour du mois, la réponse est `0`. Ce sont les jours encore à venir, ce que demande d'ordinaire un quota ou une période de facturation."
      ]
    },
    params: { date: DATE_PARAM },
    returns: {
      en: "the number of days left, `0` on the last day.",
      ru: "количество оставшихся дней, `0` в последний день.",
      uk: "кількість днів, що лишилися, `0` в останній день.",
      de: "die Anzahl verbleibender Tage, am letzten Tag `0`.",
      fr: "le nombre de jours restants, `0` le dernier jour."
    },
    throws: INVALID_DATE,
    title: { en: "Counting", ru: "Подсчёт", uk: "Підрахунок", de: "Zählen", fr: "Comptage" }
  }),

  now: entry({
    seeAlso: ["diff", "offset"],
    examples: code(
      [
        "const started = now();",
        "",
        "// … work …",
        "",
        "const elapsed = now() - started; // milliseconds"
      ].join("\n")
    ),
    summary: {
      en: "Returns the current time in milliseconds since the epoch.",
      ru: "Возвращает текущее время в миллисекундах с начала эпохи.",
      uk: "Повертає поточний час у мілісекундах від початку епохи.",
      de: "Gibt die aktuelle Zeit in Millisekunden seit der Epoche zurück.",
      fr: "Renvoie l'heure courante en millisecondes depuis l'époque."
    },
    description: {
      en: [
        "A named function instead of `Date.now()` scattered through the code, so that measuring time is one thing a test can replace."
      ],
      ru: [
        "Именованная функция вместо разбросанных по коду `Date.now()`, чтобы измерение времени было одним местом, которое тест может подменить."
      ],
      uk: [
        "Іменована функція замість розкиданих по коду `Date.now()`, щоб вимірювання часу було одним місцем, яке тест може підмінити."
      ],
      de: [
        "Eine benannte Funktion statt über den Code verstreuter `Date.now()`-Aufrufe, damit die Zeitmessung eine Stelle ist, die ein Test ersetzen kann."
      ],
      fr: [
        "Une fonction nommée plutôt que des `Date.now()` disséminés dans le code, pour que la mesure du temps soit un seul endroit qu'un test peut remplacer."
      ]
    },
    returns: {
      en: "the current timestamp in milliseconds.",
      ru: "текущая метка времени в миллисекундах.",
      uk: "поточна позначка часу в мілісекундах.",
      de: "den aktuellen Zeitstempel in Millisekunden.",
      fr: "l'horodatage courant en millisecondes."
    },
    title: {
      en: "Measuring elapsed time",
      ru: "Измерение прошедшего времени",
      uk: "Вимірювання часу, що минув",
      de: "Vergangene Zeit messen",
      fr: "Mesurer le temps écoulé"
    }
  })
};
