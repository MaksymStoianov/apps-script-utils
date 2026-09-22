/** Prose for the remaining functions and classes. */

import { code, entry } from "./_entry.mjs";

const NONE = { en: "", ru: "", uk: "", de: "", fr: "" };

/** A shorter form for entries that need one paragraph and no parameters table beyond the obvious. */
function simple({
  seeAlso,
  examples,
  summary,
  paragraph,
  params = {},
  returns = NONE,
  throws = {},
  title
}) {
  const description = {};

  for (const language of ["en", "ru", "uk", "de", "fr"]) {
    description[language] = [paragraph[language]];
  }

  return entry({ seeAlso, examples, summary, description, params, returns, throws, title });
}

const USE = {
  en: "In use",
  ru: "Применение",
  uk: "Застосування",
  de: "Im Einsatz",
  fr: "Utilisation"
};

export const FUNCTIONS = {
  isVersionCompatible: simple({
    seeAlso: ["versionCompare", "nonVersionCompatible", "requireVersionCompatible"],
    examples: code(
      [
        'isVersionCompatible("1.3.0", "1.2.0"); // => true',
        'isVersionCompatible("1.2.0", "1.3.0"); // => false'
      ].join("\n")
    ),
    summary: {
      en: "Checks whether a version is at least the one required.",
      ru: "Проверяет, что версия не ниже требуемой.",
      uk: "Перевіряє, що версія не нижча за потрібну.",
      de: "Prüft, ob eine Version mindestens der geforderten entspricht.",
      fr: "Vérifie qu'une version atteint au moins celle requise."
    },
    paragraph: {
      en: "`versionCompare` decides it, so the comparison is numeric group by group and `1.10` counts as above `1.2`. Both arguments have to be plain dotted numbers; a pre-release suffix is rejected rather than ordered.",
      ru: "Решение принимает `versionCompare`, поэтому сравнение идёт по числам группа за группой и `1.10` считается больше `1.2`. Оба аргумента должны быть числами через точку; суффикс предрелиза не упорядочивается, а отвергается.",
      uk: "Рішення ухвалює `versionCompare`, тому порівняння йде за числами група за групою і `1.10` вважається більшою за `1.2`. Обидва аргументи мають бути числами через крапку; суфікс передрелізу не впорядковується, а відхиляється.",
      de: "Entschieden wird es von `versionCompare`, der Vergleich läuft also Gruppe für Gruppe numerisch, und `1.10` steht über `1.2`. Beide Argumente müssen schlichte Punktzahlen sein; ein Vorabversions-Suffix wird nicht eingeordnet, sondern abgelehnt.",
      fr: "C'est `versionCompare` qui tranche : la comparaison est numérique, groupe par groupe, et `1.10` passe devant `1.2`. Les deux arguments doivent être des nombres séparés par des points ; un suffixe de préversion est refusé plutôt qu'ordonné."
    },
    params: {
      currentVersion: {
        en: "The version in hand.",
        ru: "Имеющаяся версия.",
        uk: "Наявна версія.",
        de: "Die vorliegende Version.",
        fr: "La version dont on dispose."
      },
      requiredVersion: {
        en: "The minimum that is acceptable.",
        ru: "Минимально приемлемая версия.",
        uk: "Мінімально прийнятна версія.",
        de: "Das akzeptable Minimum.",
        fr: "Le minimum acceptable."
      }
    },
    returns: {
      en: "`true` when the current version is the required one or higher.",
      ru: "`true`, если имеющаяся версия равна требуемой или выше.",
      uk: "`true`, якщо наявна версія дорівнює потрібній або вища.",
      de: "`true`, wenn die vorliegende Version der geforderten entspricht oder höher ist.",
      fr: "`true` si la version disponible égale la version requise ou la dépasse."
    },
    throws: {
      TypeError: {
        en: "either argument is not a valid version string.",
        ru: "любой из аргументов не является корректной строкой версии.",
        uk: "будь-який з аргументів не є коректним рядком версії.",
        de: "eines der Argumente ist keine gültige Versionsangabe.",
        fr: "l'un des arguments n'est pas une chaîne de version valide."
      }
    },
    title: {
      en: "Checking a requirement",
      ru: "Проверка требования",
      uk: "Перевірка вимоги",
      de: "Eine Anforderung prüfen",
      fr: "Vérifier une exigence"
    }
  }),

  nonVersionCompatible: simple({
    seeAlso: ["isVersionCompatible", "requireVersionCompatible"],
    examples: code('nonVersionCompatible("1.2.0", "1.3.0"); // => true'),
    summary: {
      en: "Checks whether a version falls short of the one required.",
      ru: "Проверяет, что версия ниже требуемой.",
      uk: "Перевіряє, що версія нижча за потрібну.",
      de: "Prüft, ob eine Version hinter der geforderten zurückbleibt.",
      fr: "Vérifie qu'une version reste en deçà de celle requise."
    },
    paragraph: {
      en: "The negation of `isVersionCompatible`, for the guard clause that stops early when the environment is too old.",
      ru: "Отрицание `isVersionCompatible` — для охранного условия, которое останавливается раньше, если окружение слишком старое.",
      uk: "Заперечення `isVersionCompatible` — для охоронної умови, яка зупиняється раніше, якщо середовище застаре.",
      de: "Die Verneinung von `isVersionCompatible`, für die Wächterklausel, die abbricht, wenn die Umgebung zu alt ist.",
      fr: "La négation d'`isVersionCompatible`, pour la clause de garde qui s'arrête tôt quand l'environnement est trop ancien."
    },
    params: {
      currentVersion: {
        en: "The version in hand.",
        ru: "Имеющаяся версия.",
        uk: "Наявна версія.",
        de: "Die vorliegende Version.",
        fr: "La version dont on dispose."
      },
      requiredVersion: {
        en: "The minimum that is acceptable.",
        ru: "Минимально приемлемая версия.",
        uk: "Мінімально прийнятна версія.",
        de: "Das akzeptable Minimum.",
        fr: "Le minimum acceptable."
      }
    },
    returns: {
      en: "`true` when the current version is lower than required.",
      ru: "`true`, если имеющаяся версия ниже требуемой.",
      uk: "`true`, якщо наявна версія нижча за потрібну.",
      de: "`true`, wenn die vorliegende Version niedriger ist als gefordert.",
      fr: "`true` si la version disponible est inférieure à celle requise."
    },
    title: {
      en: "Leaving early",
      ru: "Ранний выход",
      uk: "Ранній вихід",
      de: "Früh aussteigen",
      fr: "Sortir tôt"
    }
  }),

  requireVersionCompatible: simple({
    seeAlso: ["isVersionCompatible", "nonVersionCompatible"],
    examples: code('requireVersionCompatible("1.3.0", "1.2.0"); // => "1.3.0"'),
    summary: {
      en: "Returns the version once it is known to meet the requirement, or throws.",
      ru: "Возвращает версию, убедившись, что она удовлетворяет требованию, иначе бросает исключение.",
      uk: "Повертає версію, переконавшись, що вона задовольняє вимогу, інакше кидає виняток.",
      de: "Gibt die Version zurück, sobald sie die Anforderung erfüllt, sonst wirft sie.",
      fr: "Renvoie la version une fois l'exigence satisfaite, ou lève."
    },
    paragraph: {
      en: "The assertion form. The default message names both versions, which is what makes an unmet dependency readable in an execution log.",
      ru: "Утверждающая форма. Сообщение по умолчанию называет обе версии — именно это делает невыполненную зависимость понятной в журнале выполнения.",
      uk: "Стверджувальна форма. Типове повідомлення називає обидві версії — саме це робить невиконану залежність зрозумілою в журналі виконання.",
      de: "Die behauptende Form. Die Standardmeldung nennt beide Versionen, was eine nicht erfüllte Abhängigkeit im Ausführungsprotokoll lesbar macht.",
      fr: "La forme assertive. Le message par défaut nomme les deux versions, ce qui rend une dépendance non satisfaite lisible dans le journal d'exécution."
    },
    params: {
      currentVersion: {
        en: "The version in hand.",
        ru: "Имеющаяся версия.",
        uk: "Наявна версія.",
        de: "Die vorliegende Version.",
        fr: "La version dont on dispose."
      },
      requiredVersion: {
        en: "The minimum that is acceptable.",
        ru: "Минимально приемлемая версия.",
        uk: "Мінімально прийнятна версія.",
        de: "Das akzeptable Minimum.",
        fr: "Le minimum acceptable."
      },
      message: {
        en: "The message of the exception. A default naming both versions is used when omitted.",
        ru: "Сообщение исключения. Если не задано, используется сообщение с обеими версиями.",
        uk: "Повідомлення винятку. Якщо не задано, використовується повідомлення з обома версіями.",
        de: "Die Meldung der Ausnahme. Ohne Angabe wird eine Standardmeldung mit beiden Versionen verwendet.",
        fr: "Le message de l'exception. À défaut, un message nommant les deux versions est utilisé."
      }
    },
    returns: {
      en: "the current version, unchanged.",
      ru: "имеющаяся версия без изменений.",
      uk: "наявна версія без змін.",
      de: "die vorliegende Version, unverändert.",
      fr: "la version disponible, inchangée."
    },
    throws: {
      IllegalArgumentException: {
        en: "the current version is lower than required.",
        ru: "имеющаяся версия ниже требуемой.",
        uk: "наявна версія нижча за потрібну.",
        de: "die vorliegende Version ist niedriger als gefordert.",
        fr: "la version disponible est inférieure à celle requise."
      }
    },
    title: {
      en: "Guarding a dependency",
      ru: "Проверка зависимости",
      uk: "Перевірка залежності",
      de: "Eine Abhängigkeit absichern",
      fr: "Garder une dépendance"
    }
  }),

  requireNonEmptyString: simple({
    seeAlso: ["isString", "requireString", "isEmpty"],
    examples: code(
      [
        'requireNonEmptyString("Data"); // => "Data"',
        'requireNonEmptyString("   "); // throws EmptyStringException'
      ].join("\n")
    ),
    summary: {
      en: "Returns the value as a string that carries something, or throws.",
      ru: "Возвращает значение как непустую строку или бросает исключение.",
      uk: "Повертає значення як непорожній рядок або кидає виняток.",
      de: "Gibt den Wert als Zeichenkette mit Inhalt zurück oder wirft.",
      fr: "Renvoie la valeur comme une chaîne non vide, ou lève."
    },
    paragraph: {
      en: "Whitespace does not count as content: a string of spaces fails the check just as an empty one does. This is the guard most of the string helpers in this library open with.",
      ru: "Пробелы содержимым не считаются: строка из пробелов не проходит проверку так же, как пустая. Именно с этой проверки начинается большинство строковых функций библиотеки.",
      uk: "Пробіли вмістом не вважаються: рядок із пробілів не проходить перевірку так само, як порожній. Саме з цієї перевірки починається більшість рядкових функцій бібліотеки.",
      de: "Leerraum zählt nicht als Inhalt: eine Zeichenkette aus Leerzeichen besteht die Prüfung so wenig wie eine leere. Mit dieser Prüfung beginnen die meisten String-Helfer dieser Bibliothek.",
      fr: "Les espaces ne comptent pas comme du contenu : une chaîne d'espaces échoue au test comme une chaîne vide. C'est le garde par lequel commencent la plupart des aides de chaîne de cette bibliothèque."
    },
    params: {
      value: {
        en: "The value to validate.",
        ru: "Проверяемое значение.",
        uk: "Значення, що перевіряється.",
        de: "Der zu prüfende Wert.",
        fr: "La valeur à valider."
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
      en: "the same string.",
      ru: "та же строка.",
      uk: "той самий рядок.",
      de: "dieselbe Zeichenkette.",
      fr: "la même chaîne."
    },
    throws: {
      EmptyStringException: {
        en: "the value is not a string, or holds nothing but whitespace.",
        ru: "значение не строка или состоит из одних пробелов.",
        uk: "значення не рядок або складається з самих пробілів.",
        de: "der Wert ist keine Zeichenkette oder besteht nur aus Leerraum.",
        fr: "la valeur n'est pas une chaîne, ou ne contient que des espaces."
      }
    },
    title: USE
  }),

  nonEmptyString: simple({
    seeAlso: ["requireNonEmptyString"],
    examples: code('nonEmptyString("Data", "sheetName"); // => "Data"'),
    summary: {
      en: "Returns the value as a non-empty string, naming the argument in the failure.",
      ru: "Возвращает значение как непустую строку, называя аргумент в сообщении об ошибке.",
      uk: "Повертає значення як непорожній рядок, називаючи аргумент у повідомленні про помилку.",
      de: "Gibt den Wert als nicht leere Zeichenkette zurück und nennt im Fehlerfall das Argument.",
      fr: "Renvoie la valeur comme chaîne non vide, en nommant l'argument en cas d'échec."
    },
    paragraph: {
      en: "The older form of `requireNonEmptyString`, kept for the code that already calls it. Its second argument is the name to put in the message rather than the message itself, which is the opposite of every other guard here — that is why it was replaced.",
      ru: "Прежняя форма `requireNonEmptyString`, оставленная ради уже написанного кода. Второй аргумент здесь — имя для подстановки в сообщение, а не само сообщение, в отличие от всех остальных проверок; поэтому её и заменили.",
      uk: "Попередня форма `requireNonEmptyString`, залишена заради вже написаного коду. Другий аргумент тут — ім'я для підстановки в повідомлення, а не саме повідомлення, на відміну від решти перевірок; тому її й замінили.",
      de: "Die ältere Form von `requireNonEmptyString`, für bestehenden Code erhalten. Ihr zweites Argument ist der Name, der in die Meldung eingesetzt wird, nicht die Meldung selbst — anders als bei jeder anderen Prüfung hier, und genau deshalb wurde sie ersetzt.",
      fr: "L'ancienne forme de `requireNonEmptyString`, conservée pour le code qui l'appelle déjà. Son second argument est le nom à insérer dans le message, non le message lui-même — l'inverse de tous les autres gardes, et la raison de son remplacement."
    },
    params: {
      value: {
        en: "The value to validate.",
        ru: "Проверяемое значение.",
        uk: "Значення, що перевіряється.",
        de: "Der zu prüfende Wert.",
        fr: "La valeur à valider."
      },
      name: {
        en: 'The argument name to put in the message. `"value"` by default.',
        ru: 'Имя аргумента для подстановки в сообщение. По умолчанию `"value"`.',
        uk: 'Ім\'я аргументу для підстановки в повідомлення. Типово `"value"`.',
        de: 'Der Argumentname für die Meldung. Standardmäßig `"value"`.',
        fr: 'Le nom d\'argument à insérer dans le message. `"value"` par défaut.'
      }
    },
    returns: {
      en: "the same string.",
      ru: "та же строка.",
      uk: "той самий рядок.",
      de: "dieselbe Zeichenkette.",
      fr: "la même chaîne."
    },
    throws: {
      InvalidStringException: {
        en: "the value is not a string, or holds nothing but whitespace.",
        ru: "значение не строка или состоит из одних пробелов.",
        uk: "значення не рядок або складається з самих пробілів.",
        de: "der Wert ist keine Zeichenkette oder besteht nur aus Leerraum.",
        fr: "la valeur n'est pas une chaîne, ou ne contient que des espaces."
      }
    },
    title: USE
  }),

  nonNegative: simple({
    seeAlso: ["isNonNegative", "isCountable"],
    examples: code(["nonNegative(0); // => true", "nonNegative(-1); // => false"].join("\n")),
    summary: {
      en: "Checks whether a value is a number that is not negative.",
      ru: "Проверяет, что значение — неотрицательное число.",
      uk: "Перевіряє, що значення — невід'ємне число.",
      de: "Prüft, ob ein Wert eine nicht negative Zahl ist.",
      fr: "Vérifie qu'une valeur est un nombre non négatif."
    },
    paragraph: {
      en: "The name breaks the convention the rest of the library follows: everywhere else a `nonX` prefix means “is not X”, and here it means “is a non-negative number”. `isNonNegative` says the same thing under the right name and is what new code should call.",
      ru: "Имя нарушает соглашение, которому следует остальная библиотека: везде префикс `nonX` означает «не является X», а здесь — «является неотрицательным числом». То же самое под правильным именем делает `isNonNegative`, и в новом коде звать нужно его.",
      uk: "Ім'я порушує домовленість, якої дотримується решта бібліотеки: усюди префікс `nonX` означає «не є X», а тут — «є невід'ємним числом». Те саме під правильним іменем робить `isNonNegative`, і в новому коді кликати треба його.",
      de: "Der Name bricht die Konvention der übrigen Bibliothek: überall sonst heißt das Präfix `nonX` „ist kein X“, hier heißt es „ist eine nicht negative Zahl“. Dasselbe unter dem richtigen Namen leistet `isNonNegative`, und neuer Code sollte das aufrufen.",
      fr: "Le nom rompt la convention du reste de la bibliothèque : partout ailleurs, le préfixe `nonX` signifie « n'est pas un X », ici il signifie « est un nombre non négatif ». `isNonNegative` dit la même chose sous le bon nom, et c'est lui que doit appeler le code neuf."
    },
    params: {
      value: {
        en: "The value to check.",
        ru: "Проверяемое значение.",
        uk: "Значення, що перевіряється.",
        de: "Der zu prüfende Wert.",
        fr: "La valeur à vérifier."
      }
    },
    returns: {
      en: "`true` when the value is a number and is not negative.",
      ru: "`true`, если значение — число и оно не отрицательно.",
      uk: "`true`, якщо значення — число і воно не від'ємне.",
      de: "`true`, wenn der Wert eine Zahl und nicht negativ ist.",
      fr: "`true` si la valeur est un nombre et n'est pas négative."
    },
    title: USE
  }),

  getByteSize: simple({
    seeAlso: ["isString", "requireString"],
    examples: code(['getByteSize("abc"); // => 3'].join("\n")),
    summary: {
      en: "Returns the length of a string in code units.",
      ru: "Возвращает длину строки в кодовых единицах.",
      uk: "Повертає довжину рядка в кодових одиницях.",
      de: "Gibt die Länge einer Zeichenkette in Codeeinheiten zurück.",
      fr: "Renvoie la longueur d'une chaîne en unités de code."
    },
    paragraph: {
      en: "**Read the caveat before using this.** The name and the original intent are the UTF-8 byte length, but as it stands the function counts UTF-16 code units and only widens the first surrogate it meets. An ASCII string measures correctly; anything outside ASCII — Cyrillic, Greek, CJK, an emoji — measures short. Until that is fixed, measure a payload with `Utilities.newBlob(text).getBytes().length` instead.",
      ru: "**Прочитайте оговорку, прежде чем этим пользоваться.** По имени и по замыслу это длина в байтах UTF-8, но в нынешнем виде функция считает кодовые единицы UTF-16 и расширяет только первую встреченную суррогатную пару. Для строки из ASCII результат верен; для всего остального — кириллицы, греческого, CJK, эмодзи — занижен. Пока это не исправлено, измеряйте объём через `Utilities.newBlob(text).getBytes().length`.",
      uk: "**Прочитайте застереження, перш ніж цим користуватися.** За іменем і задумом це довжина в байтах UTF-8, але в теперішньому вигляді функція рахує кодові одиниці UTF-16 і розширює лише першу зустрінуту сурогатну пару. Для рядка з ASCII результат правильний; для всього іншого — кирилиці, грецької, CJK, емодзі — занижений. Поки це не виправлено, вимірюйте обсяг через `Utilities.newBlob(text).getBytes().length`.",
      de: "**Lesen Sie den Vorbehalt, bevor Sie das verwenden.** Name und ursprüngliche Absicht meinen die UTF-8-Byte-Länge, tatsächlich zählt die Funktion aber UTF-16-Codeeinheiten und verbreitert nur das erste angetroffene Surrogat. Bei ASCII stimmt das Maß; bei allem anderen — Kyrillisch, Griechisch, CJK, Emoji — fällt es zu klein aus. Bis das behoben ist, messen Sie mit `Utilities.newBlob(text).getBytes().length`.",
      fr: "**Lisez la réserve avant d'utiliser ceci.** Le nom et l'intention d'origine visent la longueur en octets UTF-8, mais en l'état la fonction compte des unités de code UTF-16 et n'élargit que le premier substitut rencontré. Pour de l'ASCII, la mesure est juste ; pour le reste — cyrillique, grec, CJK, emoji — elle est sous-évaluée. En attendant un correctif, mesurez avec `Utilities.newBlob(text).getBytes().length`."
    },
    params: {
      value: {
        en: "The string to measure.",
        ru: "Измеряемая строка.",
        uk: "Рядок, що вимірюється.",
        de: "Die zu messende Zeichenkette.",
        fr: "La chaîne à mesurer."
      }
    },
    returns: {
      en: "the length, in code units.",
      ru: "длина в кодовых единицах.",
      uk: "довжина в кодових одиницях.",
      de: "die Länge in Codeeinheiten.",
      fr: "la longueur, en unités de code."
    },
    throws: {
      InvalidStringException: {
        en: "the value is not a string.",
        ru: "значение не является строкой.",
        uk: "значення не є рядком.",
        de: "der Wert ist keine Zeichenkette.",
        fr: "la valeur n'est pas une chaîne."
      }
    },
    title: USE
  }),

  requireService: simple({
    seeAlso: ["requireRepository", "ServiceIsNotDefinedException"],
    examples: code(
      [
        "// An advanced service is a global that only exists once it has been enabled.",
        'const directory = requireService(AdminDirectory, "Enable the Admin SDK service.");'
      ].join("\n")
    ),
    summary: {
      en: "Returns a service once it is known to exist, or throws.",
      ru: "Возвращает сервис, убедившись, что он существует, иначе бросает исключение.",
      uk: "Повертає сервіс, переконавшись, що він існує, інакше кидає виняток.",
      de: "Gibt einen Dienst zurück, sobald er nachweislich existiert, sonst wirft er.",
      fr: "Renvoie un service une fois établi qu'il existe, ou lève."
    },
    paragraph: {
      en: "An advanced service that was never enabled is simply an undefined global, and the failure that follows is a `ReferenceError` far from its cause. This turns it into a named exception with a message that says what to switch on.",
      ru: "Невключённый расширенный сервис — это просто неопределённая глобальная переменная, и падение случается далеко от причины, в виде `ReferenceError`. Здесь оно превращается в именованное исключение с сообщением о том, что нужно включить.",
      uk: "Неувімкнений розширений сервіс — це просто невизначена глобальна змінна, і падіння стається далеко від причини, у вигляді `ReferenceError`. Тут воно перетворюється на іменований виняток із повідомленням про те, що треба увімкнути.",
      de: "Ein nie aktivierter erweiterter Dienst ist schlicht eine undefinierte globale Variable, und der Fehler fällt weit entfernt von seiner Ursache als `ReferenceError` an. Hier wird daraus eine benannte Ausnahme mit einer Meldung, die sagt, was einzuschalten ist.",
      fr: "Un service avancé jamais activé n'est qu'une globale indéfinie, et la panne survient loin de sa cause, sous forme de `ReferenceError`. Ici, elle devient une exception nommée dont le message dit quoi activer."
    },
    params: {
      service: {
        en: "The service to check.",
        ru: "Проверяемый сервис.",
        uk: "Сервіс, що перевіряється.",
        de: "Der zu prüfende Dienst.",
        fr: "Le service à vérifier."
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
      en: "the same service.",
      ru: "тот же сервис.",
      uk: "той самий сервіс.",
      de: "denselben Dienst.",
      fr: "le même service."
    },
    throws: {
      ServiceIsNotDefinedException: {
        en: "the service is `null` or `undefined`.",
        ru: "сервис равен `null` или `undefined`.",
        uk: "сервіс дорівнює `null` або `undefined`.",
        de: "der Dienst ist `null` oder `undefined`.",
        fr: "le service vaut `null` ou `undefined`."
      }
    },
    title: USE
  }),

  requireRepository: simple({
    seeAlso: ["requireService", "RepositoryIsNotDefinedException"],
    examples: code(
      'const users = requireRepository(registry.users, "The user repository is not wired up.");'
    ),
    summary: {
      en: "Returns a repository once it is known to exist, or throws.",
      ru: "Возвращает репозиторий, убедившись, что он существует, иначе бросает исключение.",
      uk: "Повертає репозиторій, переконавшись, що він існує, інакше кидає виняток.",
      de: "Gibt ein Repository zurück, sobald es nachweislich existiert, sonst wirft es.",
      fr: "Renvoie un dépôt une fois établi qu'il existe, ou lève."
    },
    paragraph: {
      en: "`requireService` for the layer above the services: a data source that a container was supposed to provide and did not. The exception names the situation instead of leaving a `null` to travel further.",
      ru: "То же, что `requireService`, но для слоя над сервисами: источник данных, который контейнер должен был предоставить и не предоставил. Исключение называет ситуацию, вместо того чтобы пустить `null` дальше по коду.",
      uk: "Те саме, що `requireService`, але для шару над сервісами: джерело даних, яке контейнер мав надати й не надав. Виняток називає ситуацію, замість того щоб пустити `null` далі по коду.",
      de: "`requireService` für die Schicht über den Diensten: eine Datenquelle, die ein Container hätte liefern sollen und nicht geliefert hat. Die Ausnahme benennt die Lage, statt ein `null` weiterreisen zu lassen.",
      fr: "`requireService` pour la couche au-dessus des services : une source de données qu'un conteneur devait fournir et n'a pas fournie. L'exception nomme la situation au lieu de laisser un `null` poursuivre sa route."
    },
    params: {
      repository: {
        en: "The repository to check.",
        ru: "Проверяемый репозиторий.",
        uk: "Репозиторій, що перевіряється.",
        de: "Das zu prüfende Repository.",
        fr: "Le dépôt à vérifier."
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
      en: "the same repository.",
      ru: "тот же репозиторий.",
      uk: "той самий репозиторій.",
      de: "dasselbe Repository.",
      fr: "le même dépôt."
    },
    throws: {
      RepositoryIsNotDefinedException: {
        en: "the repository is `null` or `undefined`.",
        ru: "репозиторий равен `null` или `undefined`.",
        uk: "репозиторій дорівнює `null` або `undefined`.",
        de: "das Repository ist `null` oder `undefined`.",
        fr: "le dépôt vaut `null` ou `undefined`."
      }
    },
    title: USE
  }),

  requireValidToken: simple({
    seeAlso: ["requireNonEmptyString", "AuthorizationException"],
    examples: code(
      [
        "function doPost(event) {",
        "  const key = requireValidToken(",
        "    event.parameter.key,",
        '    PropertiesService.getScriptProperties().getProperty("API_KEYS").split(","),',
        '    "Unknown API key."',
        "  );",
        "",
        "  // … the request is from someone we know",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Returns a token once it matches one of the keys allowed, or throws.",
      ru: "Возвращает токен, если он совпал с одним из разрешённых ключей, иначе бросает исключение.",
      uk: "Повертає токен, якщо він збігся з одним із дозволених ключів, інакше кидає виняток.",
      de: "Gibt ein Token zurück, sobald es einem erlaubten Schlüssel entspricht, sonst wirft es.",
      fr: "Renvoie un jeton une fois qu'il correspond à l'une des clés autorisées, ou lève."
    },
    paragraph: {
      en: "The allowed keys may be a single string, a list, or an object whose keys are the tokens. This is the check at the door of a web app: it returns the token so the call reads as one expression, and throws a named exception otherwise.",
      ru: "Разрешённые ключи можно передать одной строкой, списком или объектом, ключи которого и есть токены. Это проверка на входе веб-приложения: она возвращает токен, чтобы вызов читался одним выражением, а иначе бросает именованное исключение.",
      uk: "Дозволені ключі можна передати одним рядком, списком або об'єктом, ключі якого і є токенами. Це перевірка на вході вебзастосунку: вона повертає токен, щоб виклик читався одним виразом, а інакше кидає іменований виняток.",
      de: "Die erlaubten Schlüssel dürfen eine einzelne Zeichenkette, eine Liste oder ein Objekt sein, dessen Schlüssel die Token sind. Das ist die Prüfung an der Tür einer Web-App: sie gibt das Token zurück, damit der Aufruf ein Ausdruck bleibt, und wirft sonst eine benannte Ausnahme.",
      fr: "Les clés autorisées peuvent être une chaîne, une liste, ou un objet dont les clés sont les jetons. C'est le contrôle à l'entrée d'une application web : il renvoie le jeton pour que l'appel tienne en une expression, et lève une exception nommée sinon."
    },
    params: {
      token: {
        en: "The token presented by the caller.",
        ru: "Токен, предъявленный вызывающей стороной.",
        uk: "Токен, наданий стороною, що викликає.",
        de: "Das vom Aufrufer vorgelegte Token.",
        fr: "Le jeton présenté par l'appelant."
      },
      allowedKeys: {
        en: "One key, a list of keys, or an object keyed by them.",
        ru: "Один ключ, список ключей или объект с ключами-токенами.",
        uk: "Один ключ, список ключів або об'єкт із ключами-токенами.",
        de: "Ein Schlüssel, eine Liste von Schlüsseln oder ein danach indiziertes Objekt.",
        fr: "Une clé, une liste de clés, ou un objet indexé par celles-ci."
      },
      message: {
        en: 'The message of the exception. `"Invalid API key."` by default.',
        ru: 'Сообщение исключения. По умолчанию `"Invalid API key."`.',
        uk: 'Повідомлення винятку. Типово `"Invalid API key."`.',
        de: 'Die Meldung der Ausnahme. Standardmäßig `"Invalid API key."`.',
        fr: 'Le message de l\'exception. `"Invalid API key."` par défaut.'
      }
    },
    returns: {
      en: "the token, unchanged.",
      ru: "тот же токен.",
      uk: "той самий токен.",
      de: "das Token, unverändert.",
      fr: "le jeton, inchangé."
    },
    throws: {
      AuthenticationException: {
        en: "the token is missing or matches none of the allowed keys.",
        ru: "токен отсутствует или не совпал ни с одним разрешённым ключом.",
        uk: "токен відсутній або не збігся з жодним дозволеним ключем.",
        de: "das Token fehlt oder passt zu keinem erlaubten Schlüssel.",
        fr: "le jeton est absent ou ne correspond à aucune clé autorisée."
      }
    },
    title: USE
  }),

  checkMultipleAccount: simple({
    seeAlso: ["requireValidEmail", "isEmail"],
    examples: code(
      [
        "function onOpen(event) {",
        "  if (checkMultipleAccount(event.user.getEmail())) {",
        '    SpreadsheetApp.getUi().alert("You are signed in to more than one Google account.");',
        "  }",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Reports whether the script runs as a different account than the one that started it.",
      ru: "Сообщает, что скрипт выполняется от другого аккаунта, чем тот, что его запустил.",
      uk: "Повідомляє, що скрипт виконується від іншого облікового запису, ніж той, що його запустив.",
      de: "Meldet, ob das Skript unter einem anderen Konto läuft als dem, das es gestartet hat.",
      fr: "Indique si le script s'exécute sous un compte différent de celui qui l'a lancé."
    },
    paragraph: {
      en: "Signed in to several Google accounts in one browser, a person can trigger a script that then runs as another of their accounts — and writes, shares or mails as that one. Comparing the initiator's address with the effective user's is what catches it, so the script can say so instead of doing something surprising.",
      ru: "Когда в одном браузере выполнен вход в несколько аккаунтов Google, человек может запустить скрипт, который выполнится от другого его аккаунта — и запишет, поделится или отправит письмо уже от того. Сравнение адреса инициатора с адресом эффективного пользователя это и ловит, чтобы скрипт сказал об этом, а не сделал неожиданное.",
      uk: "Коли в одному браузері виконано вхід у кілька акаунтів Google, людина може запустити скрипт, який виконається від іншого її акаунта — і запише, поділиться або надішле лист уже від того. Порівняння адреси ініціатора з адресою ефективного користувача це й ловить, щоб скрипт сказав про це, а не зробив несподіване.",
      de: "Wer in einem Browser bei mehreren Google-Konten angemeldet ist, kann ein Skript auslösen, das dann unter einem anderen seiner Konten läuft — und unter diesem schreibt, teilt oder mailt. Der Vergleich der Adresse des Auslösers mit der des effektiven Nutzers fängt das ab, damit das Skript es sagen kann, statt Überraschendes zu tun.",
      fr: "Connecté à plusieurs comptes Google dans un même navigateur, quelqu'un peut déclencher un script qui s'exécute ensuite sous un autre de ses comptes — et écrit, partage ou envoie du courrier sous celui-là. Comparer l'adresse de l'initiateur à celle de l'utilisateur effectif attrape le cas, pour que le script le dise au lieu de faire quelque chose d'inattendu."
    },
    params: {
      email: {
        en: "The address of the person who triggered the script.",
        ru: "Адрес человека, запустившего скрипт.",
        uk: "Адреса людини, яка запустила скрипт.",
        de: "Die Adresse der Person, die das Skript ausgelöst hat.",
        fr: "L'adresse de la personne ayant déclenché le script."
      }
    },
    returns: {
      en: "`true` when the two addresses differ.",
      ru: "`true`, если адреса различаются.",
      uk: "`true`, якщо адреси різняться.",
      de: "`true`, wenn die beiden Adressen sich unterscheiden.",
      fr: "`true` lorsque les deux adresses diffèrent."
    },
    throws: {
      InvalidEmailFormatException: {
        en: "either address is missing or malformed.",
        ru: "любой из адресов отсутствует или имеет неверный формат.",
        uk: "будь-яка з адрес відсутня або має хибний формат.",
        de: "eine der Adressen fehlt oder ist fehlerhaft.",
        fr: "l'une des adresses est absente ou mal formée."
      }
    },
    title: USE
  })
};
