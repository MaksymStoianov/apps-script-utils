/** Prose for the two-argument grid-range guards, the admin family and the leftovers. */

import { code, entry } from "./_entry.mjs";

const RANGE_PAIR_EXAMPLE = [
  "const inner = { startRowIndex: 1, endRowIndex: 2, startColumnIndex: 1, endColumnIndex: 2 };",
  "const outer = { startRowIndex: 0, endRowIndex: 5, startColumnIndex: 0, endColumnIndex: 5 };"
];

const RANGE_PARAMS = {
  range1: {
    en: "The range being placed.",
    ru: "Диапазон, который проверяется.",
    uk: "Діапазон, який перевіряється.",
    de: "Der zu prüfende Bereich.",
    fr: "La plage examinée."
  },
  range2: {
    en: "The range it is compared against.",
    ru: "Диапазон, с которым сравнивают.",
    uk: "Діапазон, з яким порівнюють.",
    de: "Der Bereich, mit dem verglichen wird.",
    fr: "La plage de comparaison."
  }
};

export const FUNCTIONS = {
  isGridRangeContainedIn: entry({
    seeAlso: ["nonGridRangeContainedIn", "requireGridRangeContainedIn", "doGridRangesIntersect"],
    examples: code(
      [...RANGE_PAIR_EXAMPLE, "", "isGridRangeContainedIn(inner, outer); // => true"].join("\n")
    ),
    summary: {
      en: "Checks whether one grid range lies entirely within another.",
      ru: "Проверяет, лежит ли один диапазон целиком внутри другого.",
      uk: "Перевіряє, чи лежить один діапазон цілком усередині іншого.",
      de: "Prüft, ob ein Rasterbereich vollständig in einem anderen liegt.",
      fr: "Vérifie si une plage de grille est entièrement contenue dans une autre."
    },
    description: {
      en: [
        "Containment is inclusive: a range contains itself. An absent bound on the outer range means it is open in that direction and so contains anything on that axis, which is how a whole column or a whole sheet is expressed.",
        "This is the check to run before writing into a range a user chose, so that a write cannot spill outside the area the script owns."
      ],
      ru: [
        "Вложенность нестрогая: диапазон содержит сам себя. Отсутствующая граница у внешнего диапазона означает, что он открыт в эту сторону и потому содержит что угодно по этой оси — так выражается целый столбец или целый лист.",
        "Эту проверку стоит делать перед записью в диапазон, выбранный пользователем, чтобы запись не вышла за пределы области, которой распоряжается скрипт."
      ],
      uk: [
        "Вкладеність нестрога: діапазон містить сам себе. Відсутня межа у зовнішнього діапазону означає, що він відкритий у цей бік і тому містить будь-що за цією віссю — так виражається цілий стовпець або цілий аркуш.",
        "Цю перевірку варто робити перед записом у діапазон, вибраний користувачем, щоб запис не вийшов за межі області, якою розпоряджається скрипт."
      ],
      de: [
        "Die Enthaltung ist einschließend: ein Bereich enthält sich selbst. Eine fehlende Grenze am äußeren Bereich heißt, er ist in diese Richtung offen und enthält auf dieser Achse alles — so wird eine ganze Spalte oder ein ganzes Blatt ausgedrückt.",
        "Das ist die Prüfung vor dem Schreiben in einen vom Nutzer gewählten Bereich, damit ein Schreibvorgang nicht über das Gebiet hinausläuft, das dem Skript gehört."
      ],
      fr: [
        "L'inclusion est large : une plage se contient elle-même. Une borne absente sur la plage extérieure signifie qu'elle est ouverte de ce côté et contient donc tout sur cet axe — c'est ainsi que s'expriment une colonne entière ou une feuille entière.",
        "C'est la vérification à faire avant d'écrire dans une plage choisie par l'utilisateur, pour qu'une écriture ne déborde pas de la zone dont le script a la charge."
      ]
    },
    params: RANGE_PARAMS,
    returns: {
      en: "`true` when the first range lies inside the second.",
      ru: "`true`, если первый диапазон лежит внутри второго.",
      uk: "`true`, якщо перший діапазон лежить усередині другого.",
      de: "`true`, wenn der erste Bereich im zweiten liegt.",
      fr: "`true` si la première plage est à l'intérieur de la seconde."
    },
    title: {
      en: "Checking containment",
      ru: "Проверка вложенности",
      uk: "Перевірка вкладеності",
      de: "Enthaltung prüfen",
      fr: "Vérifier l'inclusion"
    }
  }),

  nonGridRangeContainedIn: entry({
    seeAlso: ["isGridRangeContainedIn", "requireGridRangeContainedIn"],
    examples: code(
      [...RANGE_PAIR_EXAMPLE, "", "nonGridRangeContainedIn(outer, inner); // => true"].join("\n")
    ),
    summary: {
      en: "Checks whether one grid range is **not** entirely within another.",
      ru: "Проверяет, что один диапазон **не** лежит целиком внутри другого.",
      uk: "Перевіряє, що один діапазон **не** лежить цілком усередині іншого.",
      de: "Prüft, ob ein Rasterbereich **nicht** vollständig in einem anderen liegt.",
      fr: "Vérifie qu'une plage de grille n'est **pas** entièrement contenue dans une autre."
    },
    description: {
      en: [
        "The negation of `isGridRangeContainedIn`, written so that a guard clause reads as a sentence: a range that overlaps only partly, or lies elsewhere entirely, both answer `true`."
      ],
      ru: [
        "Отрицание `isGridRangeContainedIn`, записанное так, чтобы охранное условие читалось как утверждение: и частично перекрывающийся диапазон, и лежащий совсем в стороне дают `true`."
      ],
      uk: [
        "Заперечення `isGridRangeContainedIn`, записане так, щоб охоронна умова читалася як твердження: і частково перекритий діапазон, і той, що лежить зовсім осторонь, дають `true`."
      ],
      de: [
        "Die Verneinung von `isGridRangeContainedIn`, so geschrieben, dass eine Wächterklausel sich wie ein Satz liest: ein nur teilweise überlappender Bereich und einer ganz woanders liefern beide `true`."
      ],
      fr: [
        "La négation d'`isGridRangeContainedIn`, écrite pour qu'une clause de garde se lise comme une phrase : une plage qui ne recouvre que partiellement, comme une plage située ailleurs, répondent toutes deux `true`."
      ]
    },
    params: RANGE_PARAMS,
    returns: {
      en: "`true` when the first range is not inside the second.",
      ru: "`true`, если первый диапазон не лежит внутри второго.",
      uk: "`true`, якщо перший діапазон не лежить усередині другого.",
      de: "`true`, wenn der erste Bereich nicht im zweiten liegt.",
      fr: "`true` si la première plage n'est pas à l'intérieur de la seconde."
    },
    title: {
      en: "Checking containment",
      ru: "Проверка вложенности",
      uk: "Перевірка вкладеності",
      de: "Enthaltung prüfen",
      fr: "Vérifier l'inclusion"
    }
  }),

  requireGridRangeContainedIn: entry({
    seeAlso: ["isGridRangeContainedIn", "nonGridRangeContainedIn"],
    examples: code(
      [
        ...RANGE_PAIR_EXAMPLE,
        "",
        "requireGridRangeContainedIn(inner, outer); // => the inner range"
      ].join("\n")
    ),
    summary: {
      en: "Returns the range once it is known to lie within another, or throws.",
      ru: "Возвращает диапазон, убедившись, что он лежит внутри другого, иначе бросает исключение.",
      uk: "Повертає діапазон, переконавшись, що він лежить усередині іншого, інакше кидає виняток.",
      de: "Gibt den Bereich zurück, sobald er nachweislich in einem anderen liegt, sonst wirft er.",
      fr: "Renvoie la plage une fois établi qu'elle est contenue dans une autre, ou lève."
    },
    description: {
      en: [
        "The assertion form of `isGridRangeContainedIn`. The default message names both ranges in A1 notation, which is what makes the failure readable in an execution log."
      ],
      ru: [
        "Утверждающая форма `isGridRangeContainedIn`. Сообщение по умолчанию называет оба диапазона в нотации A1 — именно это делает ошибку читаемой в журнале выполнения."
      ],
      uk: [
        "Стверджувальна форма `isGridRangeContainedIn`. Типове повідомлення називає обидва діапазони в нотації A1 — саме це робить помилку читабельною в журналі виконання."
      ],
      de: [
        "Die behauptende Form von `isGridRangeContainedIn`. Die Standardmeldung nennt beide Bereiche in A1-Notation, was den Fehlschlag im Ausführungsprotokoll lesbar macht."
      ],
      fr: [
        "La forme assertive d'`isGridRangeContainedIn`. Le message par défaut nomme les deux plages en notation A1, ce qui rend l'échec lisible dans le journal d'exécution."
      ]
    },
    params: {
      ...RANGE_PARAMS,
      message: {
        en: "The message of the exception. A default naming both ranges is used when omitted.",
        ru: "Сообщение исключения. Если не задано, используется сообщение с обоими диапазонами.",
        uk: "Повідомлення винятку. Якщо не задано, використовується повідомлення з обома діапазонами.",
        de: "Die Meldung der Ausnahme. Ohne Angabe wird eine genannte Standardmeldung mit beiden Bereichen verwendet.",
        fr: "Le message de l'exception. À défaut, un message nommant les deux plages est utilisé."
      }
    },
    returns: {
      en: "the first range, unchanged.",
      ru: "первый диапазон без изменений.",
      uk: "перший діапазон без змін.",
      de: "den ersten Bereich, unverändert.",
      fr: "la première plage, inchangée."
    },
    throws: {
      InvalidGridRangeException: {
        en: "the first range is not contained in the second.",
        ru: "первый диапазон не лежит внутри второго.",
        uk: "перший діапазон не лежить усередині другого.",
        de: "der erste Bereich liegt nicht im zweiten.",
        fr: "la première plage n'est pas contenue dans la seconde."
      }
    },
    title: {
      en: "Guarding a write",
      ru: "Защита записи",
      uk: "Захист запису",
      de: "Einen Schreibvorgang absichern",
      fr: "Garder une écriture"
    }
  }),

  isGridRangeSameDimensions: entry({
    seeAlso: ["nonGridRangeSameDimensions", "requireGridRangeSameDimensions"],
    examples: code(
      [
        "const source = { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 };",
        "const target = { startRowIndex: 5, endRowIndex: 7, startColumnIndex: 5, endColumnIndex: 7 };",
        "",
        "isGridRangeSameDimensions(source, target); // => true"
      ].join("\n")
    ),
    summary: {
      en: "Checks whether two grid ranges have the same height and width.",
      ru: "Проверяет, совпадают ли два диапазона по высоте и ширине.",
      uk: "Перевіряє, чи збігаються два діапазони за висотою та шириною.",
      de: "Prüft, ob zwei Rasterbereiche gleich hoch und gleich breit sind.",
      fr: "Vérifie si deux plages de grille ont la même hauteur et la même largeur."
    },
    description: {
      en: [
        "Where they sit does not matter, only how big they are — the question to ask before copying values from one range into another, since `setValues` rejects a mismatch."
      ],
      ru: [
        "Где они расположены, неважно — важен только размер. Этот вопрос задают перед копированием значений из одного диапазона в другой, потому что `setValues` отвергает несовпадение."
      ],
      uk: [
        "Де вони розташовані, неважливо — важливий лише розмір. Це питання ставлять перед копіюванням значень з одного діапазону в інший, бо `setValues` відхиляє розбіжність."
      ],
      de: [
        "Wo sie liegen, spielt keine Rolle, nur wie groß sie sind — die Frage vor dem Kopieren von Werten aus einem Bereich in einen anderen, denn `setValues` lehnt eine Abweichung ab."
      ],
      fr: [
        "Leur emplacement importe peu, seule compte leur taille — la question à poser avant de copier des valeurs d'une plage vers une autre, puisque `setValues` refuse un écart."
      ]
    },
    params: {
      range1: {
        en: "The first range.",
        ru: "Первый диапазон.",
        uk: "Перший діапазон.",
        de: "Der erste Bereich.",
        fr: "La première plage."
      },
      range2: {
        en: "The second range.",
        ru: "Второй диапазон.",
        uk: "Другий діапазон.",
        de: "Der zweite Bereich.",
        fr: "La seconde plage."
      }
    },
    returns: {
      en: "`true` when both are the same size.",
      ru: "`true`, если размеры совпадают.",
      uk: "`true`, якщо розміри збігаються.",
      de: "`true`, wenn beide gleich groß sind.",
      fr: "`true` si les deux ont la même taille."
    },
    title: {
      en: "Comparing sizes",
      ru: "Сравнение размеров",
      uk: "Порівняння розмірів",
      de: "Größen vergleichen",
      fr: "Comparer les tailles"
    }
  }),

  nonGridRangeSameDimensions: entry({
    seeAlso: ["isGridRangeSameDimensions", "requireGridRangeSameDimensions"],
    examples: code(
      [
        "const source = { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 };",
        "const target = { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 };",
        "",
        "nonGridRangeSameDimensions(source, target); // => true"
      ].join("\n")
    ),
    summary: {
      en: "Checks whether two grid ranges differ in height or width.",
      ru: "Проверяет, различаются ли два диапазона по высоте или ширине.",
      uk: "Перевіряє, чи різняться два діапазони за висотою або шириною.",
      de: "Prüft, ob zwei Rasterbereiche sich in Höhe oder Breite unterscheiden.",
      fr: "Vérifie si deux plages de grille diffèrent en hauteur ou en largeur."
    },
    description: {
      en: [
        "The negation of `isGridRangeSameDimensions`, for the guard clause that returns early when a copy would not fit."
      ],
      ru: [
        "Отрицание `isGridRangeSameDimensions` — для охранного условия, которое выходит раньше, когда копирование не поместится."
      ],
      uk: [
        "Заперечення `isGridRangeSameDimensions` — для охоронної умови, яка виходить раніше, коли копіювання не помістилося б."
      ],
      de: [
        "Die Verneinung von `isGridRangeSameDimensions`, für die Wächterklausel, die früh zurückkehrt, wenn eine Kopie nicht passt."
      ],
      fr: [
        "La négation d'`isGridRangeSameDimensions`, pour la clause de garde qui sort tôt lorsqu'une copie ne tiendrait pas."
      ]
    },
    params: {
      range1: {
        en: "The first range.",
        ru: "Первый диапазон.",
        uk: "Перший діапазон.",
        de: "Der erste Bereich.",
        fr: "La première plage."
      },
      range2: {
        en: "The second range.",
        ru: "Второй диапазон.",
        uk: "Другий діапазон.",
        de: "Der zweite Bereich.",
        fr: "La seconde plage."
      }
    },
    returns: {
      en: "`true` when the sizes differ.",
      ru: "`true`, если размеры различаются.",
      uk: "`true`, якщо розміри різняться.",
      de: "`true`, wenn die Größen sich unterscheiden.",
      fr: "`true` si les tailles diffèrent."
    },
    title: {
      en: "Comparing sizes",
      ru: "Сравнение размеров",
      uk: "Порівняння розмірів",
      de: "Größen vergleichen",
      fr: "Comparer les tailles"
    }
  }),

  requireGridRangeSameDimensions: entry({
    seeAlso: ["isGridRangeSameDimensions", "nonGridRangeSameDimensions"],
    examples: code(
      [
        "const source = { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 };",
        "const target = { startRowIndex: 5, endRowIndex: 7, startColumnIndex: 5, endColumnIndex: 7 };",
        "",
        "requireGridRangeSameDimensions(source, target); // => the source range"
      ].join("\n")
    ),
    summary: {
      en: "Returns the range once both are known to be the same size, or throws.",
      ru: "Возвращает диапазон, убедившись, что размеры совпадают, иначе бросает исключение.",
      uk: "Повертає діапазон, переконавшись, що розміри збігаються, інакше кидає виняток.",
      de: "Gibt den Bereich zurück, sobald beide nachweislich gleich groß sind, sonst wirft er.",
      fr: "Renvoie la plage une fois établi que les deux ont la même taille, ou lève."
    },
    description: {
      en: [
        "The assertion form of `isGridRangeSameDimensions`. The default message states both sizes, so a mismatched copy says how far off it was."
      ],
      ru: [
        "Утверждающая форма `isGridRangeSameDimensions`. Сообщение по умолчанию называет оба размера, поэтому несовпавшее копирование сообщает, насколько именно."
      ],
      uk: [
        "Стверджувальна форма `isGridRangeSameDimensions`. Типове повідомлення називає обидва розміри, тому копіювання, що не збіглося, повідомляє, наскільки саме."
      ],
      de: [
        "Die behauptende Form von `isGridRangeSameDimensions`. Die Standardmeldung nennt beide Größen, eine unpassende Kopie sagt also, um wie viel sie danebenlag."
      ],
      fr: [
        "La forme assertive d'`isGridRangeSameDimensions`. Le message par défaut indique les deux tailles : une copie mal dimensionnée dit donc de combien elle s'écarte."
      ]
    },
    params: {
      range1: {
        en: "The first range.",
        ru: "Первый диапазон.",
        uk: "Перший діапазон.",
        de: "Der erste Bereich.",
        fr: "La première plage."
      },
      range2: {
        en: "The second range.",
        ru: "Второй диапазон.",
        uk: "Другий діапазон.",
        de: "Der zweite Bereich.",
        fr: "La seconde plage."
      },
      message: {
        en: "The message of the exception. A default stating both sizes is used when omitted.",
        ru: "Сообщение исключения. Если не задано, используется сообщение с обоими размерами.",
        uk: "Повідомлення винятку. Якщо не задано, використовується повідомлення з обома розмірами.",
        de: "Die Meldung der Ausnahme. Ohne Angabe wird eine Standardmeldung mit beiden Größen verwendet.",
        fr: "Le message de l'exception. À défaut, un message indiquant les deux tailles est utilisé."
      }
    },
    returns: {
      en: "the first range, unchanged.",
      ru: "первый диапазон без изменений.",
      uk: "перший діапазон без змін.",
      de: "den ersten Bereich, unverändert.",
      fr: "la première plage, inchangée."
    },
    throws: {
      InvalidGridRangeException: {
        en: "the two ranges are not the same size.",
        ru: "размеры диапазонов не совпадают.",
        uk: "розміри діапазонів не збігаються.",
        de: "die beiden Bereiche sind nicht gleich groß.",
        fr: "les deux plages n'ont pas la même taille."
      }
    },
    title: {
      en: "Guarding a copy",
      ru: "Защита копирования",
      uk: "Захист копіювання",
      de: "Eine Kopie absichern",
      fr: "Garder une copie"
    }
  }),

  isAdmin: entry({
    seeAlso: ["nonAdmin", "requireAdmin", "AdminDirectoryException"],
    examples: code(["if (isAdmin()) {", "  showAdminMenu();", "}"].join("\n")),
    summary: {
      en: "Reports whether the current user is a Workspace administrator.",
      ru: "Сообщает, является ли текущий пользователь администратором Workspace.",
      uk: "Повідомляє, чи є поточний користувач адміністратором Workspace.",
      de: "Meldet, ob der aktuelle Nutzer ein Workspace-Administrator ist.",
      fr: "Indique si l'utilisateur courant est administrateur Workspace."
    },
    description: {
      en: [
        "The active user is looked up through the Admin SDK Directory service, which the script has to have enabled and be authorised for. Anything that goes wrong — the service missing, the lookup refused — is logged and answered as `false`, so the call is safe to make from a menu builder.",
        "It is a question about the person running the script, not about a permission on a document."
      ],
      ru: [
        "Активный пользователь ищется через сервис Admin SDK Directory, который должен быть включён для скрипта и авторизован. Любая неудача — сервиса нет, запрос отклонён — записывается в журнал и даёт `false`, поэтому вызов безопасен даже при построении меню.",
        "Это вопрос о человеке, запустившем скрипт, а не о правах на документ."
      ],
      uk: [
        "Активний користувач шукається через сервіс Admin SDK Directory, який має бути увімкнений для скрипта й авторизований. Будь-яка невдача — сервісу немає, запит відхилено — записується в журнал і дає `false`, тому виклик безпечний навіть під час побудови меню.",
        "Це питання про людину, яка запустила скрипт, а не про права на документ."
      ],
      de: [
        "Der aktive Nutzer wird über den Admin-SDK-Directory-Dienst nachgeschlagen, der für das Skript aktiviert und autorisiert sein muss. Geht etwas schief — der Dienst fehlt, die Abfrage wird abgelehnt — wird es protokolliert und mit `false` beantwortet; der Aufruf ist also auch beim Aufbau eines Menüs sicher.",
        "Es ist eine Frage über die Person, die das Skript ausführt, nicht über eine Berechtigung an einem Dokument."
      ],
      fr: [
        "L'utilisateur actif est recherché via le service Admin SDK Directory, qui doit être activé et autorisé pour le script. Tout échec — service absent, requête refusée — est journalisé et répondu par `false` : l'appel est donc sûr, même depuis la construction d'un menu.",
        "C'est une question sur la personne qui exécute le script, pas sur une permission attachée à un document."
      ]
    },
    returns: {
      en: "`true` when the active user is an administrator.",
      ru: "`true`, если активный пользователь — администратор.",
      uk: "`true`, якщо активний користувач — адміністратор.",
      de: "`true`, wenn der aktive Nutzer Administrator ist.",
      fr: "`true` si l'utilisateur actif est administrateur."
    },
    title: {
      en: "Gating a feature",
      ru: "Ограничение возможности",
      uk: "Обмеження можливості",
      de: "Eine Funktion absichern",
      fr: "Conditionner une fonctionnalité"
    }
  }),

  nonAdmin: entry({
    seeAlso: ["isAdmin", "requireAdmin"],
    examples: code(["if (nonAdmin()) {", "  return;", "}"].join("\n")),
    summary: {
      en: "Reports whether the current user is **not** a Workspace administrator.",
      ru: "Сообщает, что текущий пользователь **не** является администратором Workspace.",
      uk: "Повідомляє, що поточний користувач **не** є адміністратором Workspace.",
      de: "Meldet, ob der aktuelle Nutzer **kein** Workspace-Administrator ist.",
      fr: "Indique que l'utilisateur courant n'est **pas** administrateur Workspace."
    },
    description: {
      en: [
        "The negation of `isAdmin`, for the guard clause that leaves early. Because a failed lookup answers `false` there, it answers `true` here: an unavailable Admin SDK is treated as “not an administrator”, which is the safe reading."
      ],
      ru: [
        "Отрицание `isAdmin` — для охранного условия, которое выходит раньше. Поскольку неудачный запрос там даёт `false`, здесь он даёт `true`: недоступный Admin SDK трактуется как «не администратор», и это безопасная трактовка."
      ],
      uk: [
        "Заперечення `isAdmin` — для охоронної умови, яка виходить раніше. Оскільки невдалий запит там дає `false`, тут він дає `true`: недоступний Admin SDK трактується як «не адміністратор», і це безпечне трактування."
      ],
      de: [
        "Die Verneinung von `isAdmin`, für die Wächterklausel, die früh aussteigt. Da eine fehlgeschlagene Abfrage dort `false` liefert, liefert sie hier `true`: ein nicht verfügbares Admin SDK gilt als „kein Administrator“, und das ist die sichere Lesart."
      ],
      fr: [
        "La négation d'`isAdmin`, pour la clause de garde qui sort tôt. Comme une recherche en échec y répond `false`, elle répond `true` ici : un Admin SDK indisponible est traité comme « pas administrateur », lecture la plus sûre."
      ]
    },
    returns: {
      en: "`true` when the active user is not an administrator.",
      ru: "`true`, если активный пользователь не администратор.",
      uk: "`true`, якщо активний користувач не адміністратор.",
      de: "`true`, wenn der aktive Nutzer kein Administrator ist.",
      fr: "`true` si l'utilisateur actif n'est pas administrateur."
    },
    title: {
      en: "Leaving early",
      ru: "Ранний выход",
      uk: "Ранній вихід",
      de: "Früh aussteigen",
      fr: "Sortir tôt"
    }
  }),

  requireAdmin: entry({
    seeAlso: ["isAdmin", "nonAdmin", "AuthorizationException"],
    examples: code(
      [
        "function deleteEverything() {",
        '  requireAdmin("Only an administrator may run this.");',
        "",
        "  // …",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Stops the call unless the current user is a Workspace administrator.",
      ru: "Прерывает вызов, если текущий пользователь не администратор Workspace.",
      uk: "Перериває виклик, якщо поточний користувач не адміністратор Workspace.",
      de: "Bricht den Aufruf ab, sofern der aktuelle Nutzer kein Workspace-Administrator ist.",
      fr: "Interrompt l'appel si l'utilisateur courant n'est pas administrateur Workspace."
    },
    description: {
      en: [
        "The assertion form of `isAdmin`, and the one to put at the top of anything destructive. It returns nothing: either the call continues or it does not."
      ],
      ru: [
        "Утверждающая форма `isAdmin` — то, что ставят в начало любой разрушительной операции. Функция ничего не возвращает: вызов либо продолжается, либо нет."
      ],
      uk: [
        "Стверджувальна форма `isAdmin` — те, що ставлять на початку будь-якої руйнівної операції. Функція нічого не повертає: виклик або триває, або ні."
      ],
      de: [
        "Die behauptende Form von `isAdmin`, die an den Anfang von allem Zerstörerischen gehört. Sie gibt nichts zurück: entweder geht der Aufruf weiter oder nicht."
      ],
      fr: [
        "La forme assertive d'`isAdmin`, à placer en tête de toute opération destructrice. Elle ne renvoie rien : soit l'appel continue, soit il s'arrête."
      ]
    },
    params: {
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
      AuthorizationException: {
        en: "the active user is not an administrator.",
        ru: "активный пользователь не администратор.",
        uk: "активний користувач не адміністратор.",
        de: "der aktive Nutzer ist kein Administrator.",
        fr: "l'utilisateur actif n'est pas administrateur."
      }
    },
    title: {
      en: "Guarding an action",
      ru: "Защита действия",
      uk: "Захист дії",
      de: "Eine Aktion absichern",
      fr: "Garder une action"
    }
  })
};
