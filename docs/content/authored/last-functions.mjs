/** Prose for the last of the Apps Script helpers. */

import { code, entry } from "./_entry.mjs";

const USE = {
  en: "In use",
  ru: "Применение",
  uk: "Застосування",
  de: "Im Einsatz",
  fr: "Utilisation"
};

function simple({
  seeAlso,
  examples,
  summary,
  paragraph,
  params = {},
  returns,
  throws = {},
  title = USE
}) {
  const description = {};

  for (const language of ["en", "ru", "uk", "de", "fr"]) {
    description[language] = [paragraph[language]];
  }

  return entry({ seeAlso, examples, summary, description, params, returns, throws, title });
}

export const FUNCTIONS = {
  getSlideByIndex: simple({
    seeAlso: ["getSlideIndex", "requireSlide", "isValidSlideId"],
    examples: code(
      [
        "const presentation = SlidesApp.getActivePresentation();",
        "",
        "const first = getSlideByIndex(presentation, 0);"
      ].join("\n")
    ),
    summary: {
      en: "Finds a slide by its position in a presentation.",
      ru: "Находит слайд по его позиции в презентации.",
      uk: "Знаходить слайд за його позицією в презентації.",
      de: "Findet eine Folie anhand ihrer Position in einer Präsentation.",
      fr: "Trouve une diapositive par sa position dans une présentation."
    },
    paragraph: {
      en: "The index counts from zero. A position past the end gives `null` rather than an exception, which is what a loop over a deck that someone may be editing needs.",
      ru: "Индекс считается от нуля. Позиция за пределами даёт `null`, а не исключение, — именно это нужно циклу по презентации, которую кто-то может править.",
      uk: "Індекс рахується від нуля. Позиція поза межами дає `null`, а не виняток, — саме це потрібно циклу по презентації, яку хтось може правити.",
      de: "Der Index zählt ab null. Eine Position hinter dem Ende ergibt `null` statt einer Ausnahme — genau das braucht eine Schleife über ein Deck, an dem jemand gerade arbeitet.",
      fr: "L'indice compte à partir de zéro. Une position au-delà de la fin donne `null` plutôt qu'une exception, ce dont a besoin une boucle sur un diaporama que quelqu'un peut modifier."
    },
    params: {
      presentation: {
        en: "The presentation to look in.",
        ru: "Презентация, в которой искать.",
        uk: "Презентація, у якій шукати.",
        de: "Die Präsentation, in der gesucht wird.",
        fr: "La présentation où chercher."
      },
      index: {
        en: "The zero-based position of the slide.",
        ru: "Позиция слайда, считая от нуля.",
        uk: "Позиція слайда, рахуючи від нуля.",
        de: "Die nullbasierte Position der Folie.",
        fr: "La position de la diapositive, à base zéro."
      }
    },
    returns: {
      en: "the slide, or `null` when the index is past the end.",
      ru: "слайд или `null`, если индекс за пределами.",
      uk: "слайд або `null`, якщо індекс поза межами.",
      de: "die Folie oder `null`, wenn der Index hinter dem Ende liegt.",
      fr: "la diapositive, ou `null` si l'indice dépasse la fin."
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  }),

  getSlideIndex: simple({
    seeAlso: ["getSlideByIndex", "isSlide"],
    examples: code(
      [
        "const presentation = SlidesApp.getActivePresentation();",
        "const slide = presentation.getSlides()[2];",
        "",
        "getSlideIndex(slide, presentation); // => 2"
      ].join("\n")
    ),
    summary: {
      en: "Finds the position of a slide in a presentation.",
      ru: "Находит позицию слайда в презентации.",
      uk: "Знаходить позицію слайда в презентації.",
      de: "Findet die Position einer Folie in einer Präsentation.",
      fr: "Trouve la position d'une diapositive dans une présentation."
    },
    paragraph: {
      en: "The slides are compared by their object id, so a slide read earlier is still recognised. A slide that belongs to another presentation, or has since been removed, gives `null`.",
      ru: "Слайды сравниваются по идентификатору объекта, поэтому слайд, прочитанный ранее, по-прежнему опознаётся. Слайд из другой презентации или уже удалённый даёт `null`.",
      uk: "Слайди порівнюються за ідентифікатором об'єкта, тому слайд, прочитаний раніше, так само розпізнається. Слайд з іншої презентації або вже видалений дає `null`.",
      de: "Die Folien werden über ihre Objekt-Id verglichen, eine früher gelesene Folie wird also weiterhin erkannt. Eine Folie aus einer anderen Präsentation oder eine inzwischen gelöschte ergibt `null`.",
      fr: "Les diapositives sont comparées par leur identifiant d'objet : une diapositive lue plus tôt reste reconnue. Une diapositive appartenant à une autre présentation, ou supprimée depuis, donne `null`."
    },
    params: {
      slide: {
        en: "The slide to locate.",
        ru: "Слайд, позицию которого ищем.",
        uk: "Слайд, позицію якого шукаємо.",
        de: "Die zu findende Folie.",
        fr: "La diapositive à localiser."
      },
      presentation: {
        en: "The presentation to look in.",
        ru: "Презентация, в которой искать.",
        uk: "Презентація, у якій шукати.",
        de: "Die Präsentation, in der gesucht wird.",
        fr: "La présentation où chercher."
      }
    },
    returns: {
      en: "the zero-based position, or `null` when the slide is not there.",
      ru: "позиция, считая от нуля, или `null`, если слайда нет.",
      uk: "позиція, рахуючи від нуля, або `null`, якщо слайда немає.",
      de: "die nullbasierte Position oder `null`, wenn die Folie nicht da ist.",
      fr: "la position à base zéro, ou `null` si la diapositive n'y est pas."
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  }),

  findReplaceAllTextInSlide: simple({
    seeAlso: ["getSlideByIndex", "requireSlide"],
    examples: code(
      [
        "const slide = SlidesApp.getActivePresentation().getSlides()[0];",
        "",
        'const replaced = findReplaceAllTextInSlide(slide, "{{ client }}", "Acme", false);'
      ].join("\n")
    ),
    summary: {
      en: "Replaces every occurrence of a text on one slide.",
      ru: "Заменяет все вхождения текста на одном слайде.",
      uk: "Замінює всі входження тексту на одному слайді.",
      de: "Ersetzt jedes Vorkommen eines Textes auf einer Folie.",
      fr: "Remplace chaque occurrence d'un texte sur une diapositive."
    },
    paragraph: {
      en: "Slides offers find-and-replace across a whole presentation; this narrows it to a single slide, which is what filling one templated page at a time needs. Matching is case-sensitive unless told otherwise.",
      ru: "Slides умеет искать и заменять по всей презентации; здесь область сужена до одного слайда — именно это нужно, когда шаблонные страницы заполняются по одной. Регистр учитывается, если не указано иное.",
      uk: "Slides уміє шукати й замінювати по всій презентації; тут область звужено до одного слайда — саме це потрібно, коли шаблонні сторінки заповнюються по одній. Регістр враховується, якщо не вказано інше.",
      de: "Slides bietet Suchen und Ersetzen über eine ganze Präsentation; hier ist es auf eine einzelne Folie eingegrenzt — genau das, was das Füllen einer Vorlagenseite nach der anderen braucht. Groß- und Kleinschreibung zählen, sofern nicht anders angegeben.",
      fr: "Slides propose un rechercher-remplacer sur toute une présentation ; ici, la portée est réduite à une seule diapositive — ce qu'il faut pour remplir une page de gabarit à la fois. La casse compte, sauf indication contraire."
    },
    params: {
      slide: {
        en: "The slide to work on.",
        ru: "Слайд, с которым работаем.",
        uk: "Слайд, з яким працюємо.",
        de: "Die zu bearbeitende Folie.",
        fr: "La diapositive à traiter."
      },
      findText: {
        en: "The text to look for.",
        ru: "Искомый текст.",
        uk: "Шуканий текст.",
        de: "Der zu suchende Text.",
        fr: "Le texte recherché."
      },
      replaceText: {
        en: "The text to put in its place.",
        ru: "Текст, который ставится вместо него.",
        uk: "Текст, який ставиться замість нього.",
        de: "Der Text, der an seine Stelle tritt.",
        fr: "Le texte qui le remplace."
      },
      matchCase: {
        en: "Whether the search is case-sensitive. `true` by default.",
        ru: "Учитывать ли регистр. По умолчанию `true`.",
        uk: "Чи враховувати регістр. Типово `true`.",
        de: "Ob Groß- und Kleinschreibung zählt. Standardmäßig `true`.",
        fr: "Si la recherche respecte la casse. `true` par défaut."
      }
    },
    returns: {
      en: "how many occurrences were replaced.",
      ru: "сколько вхождений было заменено.",
      uk: "скільки входжень було замінено.",
      de: "wie viele Vorkommen ersetzt wurden.",
      fr: "le nombre d'occurrences remplacées."
    },
    throws: {
      SlideNotFoundException: {
        en: "the first argument is not a slide.",
        ru: "первый аргумент не является слайдом.",
        uk: "перший аргумент не є слайдом.",
        de: "das erste Argument ist keine Folie.",
        fr: "le premier argument n'est pas une diapositive."
      }
    }
  }),

  convertRichTextToHtml: simple({
    seeAlso: ["escapeHtml", "isRichTextValue", "highlightHtml"],
    examples: code(
      [
        "const range = SpreadsheetApp.getActiveRange();",
        "",
        "const html = convertRichTextToHtml(range.getRichTextValue());"
      ].join("\n")
    ),
    summary: {
      en: "Renders a rich text cell value as HTML.",
      ru: "Преобразует форматированное значение ячейки в HTML.",
      uk: "Перетворює форматоване значення комірки на HTML.",
      de: "Gibt einen Rich-Text-Zellwert als HTML aus.",
      fr: "Rend une valeur de cellule en texte enrichi sous forme de HTML."
    },
    paragraph: {
      en: "Each run of the value becomes a span carrying the styles it had — weight, slant, underline, strikethrough, colour, size and family — and a link becomes an anchor. The text itself is escaped, so a cell holding `<b>` comes out as text and not as markup.",
      ru: "Каждый фрагмент значения превращается в span со своими стилями — насыщенность, наклон, подчёркивание, зачёркивание, цвет, размер и семейство, — а ссылка становится тегом `a`. Сам текст экранируется, поэтому ячейка с `<b>` выводится как текст, а не как разметка.",
      uk: "Кожен фрагмент значення перетворюється на span зі своїми стилями — насиченість, нахил, підкреслення, закреслення, колір, розмір і сімейство, — а посилання стає тегом `a`. Сам текст екранується, тому комірка з `<b>` виводиться як текст, а не як розмітка.",
      de: "Jeder Abschnitt des Werts wird zu einem Span mit seinen Stilen — Stärke, Neigung, Unterstreichung, Durchstreichung, Farbe, Größe und Schriftfamilie — und ein Link zu einem Anker. Der Text selbst wird maskiert, eine Zelle mit `<b>` erscheint also als Text und nicht als Markup.",
      fr: "Chaque segment de la valeur devient un span portant ses styles — graisse, italique, soulignement, barré, couleur, taille et famille — et un lien devient une ancre. Le texte lui-même est échappé : une cellule contenant `<b>` ressort comme du texte, pas comme du balisage."
    },
    params: {
      richText: {
        en: "The rich text value to render.",
        ru: "Форматированное значение, которое нужно преобразовать.",
        uk: "Форматоване значення, яке потрібно перетворити.",
        de: "Der auszugebende Rich-Text-Wert.",
        fr: "La valeur de texte enrichi à rendre."
      }
    },
    returns: {
      en: "the HTML.",
      ru: "получившийся HTML.",
      uk: "отриманий HTML.",
      de: "das HTML.",
      fr: "le HTML obtenu."
    }
  }),

  convertMarkdownToRichText: simple({
    seeAlso: ["convertRichTextToHtml", "isRichTextValue"],
    examples: code('const runs = convertMarkdownToRichText("**bold** and `code`");'),
    summary: {
      en: "Turns a small subset of Markdown into styled text runs.",
      ru: "Превращает небольшое подмножество Markdown в форматированные фрагменты текста.",
      uk: "Перетворює невелику підмножину Markdown на форматовані фрагменти тексту.",
      de: "Verwandelt eine kleine Teilmenge von Markdown in formatierte Textabschnitte.",
      fr: "Transforme un petit sous-ensemble de Markdown en segments de texte stylés."
    },
    paragraph: {
      en: "Bold, italic, code and links are recognised and become runs carrying the style each one implies, ready to be written into a slide or a cell. A theme can change what those styles are — the font of a code run, say — without touching the text.",
      ru: "Распознаются жирный, курсив, код и ссылки: каждый становится фрагментом со своим стилем, готовым к записи в слайд или ячейку. Тема позволяет изменить сами стили — например, шрифт кода, — не трогая текст.",
      uk: "Розпізнаються жирний, курсив, код і посилання: кожен стає фрагментом зі своїм стилем, готовим до запису в слайд чи комірку. Тема дозволяє змінити самі стилі — наприклад, шрифт коду, — не чіпаючи текст.",
      de: "Fett, kursiv, Code und Links werden erkannt und zu Abschnitten mit dem jeweils passenden Stil, bereit für eine Folie oder eine Zelle. Ein Theme ändert diese Stile — etwa die Schrift eines Code-Abschnitts — ohne den Text anzufassen.",
      fr: "Gras, italique, code et liens sont reconnus et deviennent des segments portant le style correspondant, prêts à être écrits dans une diapositive ou une cellule. Un thème permet de changer ces styles — la police d'un segment de code, par exemple — sans toucher au texte."
    },
    params: {
      text: {
        en: "The Markdown to convert.",
        ru: "Markdown, который нужно преобразовать.",
        uk: "Markdown, який потрібно перетворити.",
        de: "Das umzuwandelnde Markdown.",
        fr: "Le Markdown à convertir."
      },
      theme: {
        en: "The styles each kind of run is given.",
        ru: "Стили, которые получает каждый вид фрагмента.",
        uk: "Стилі, які отримує кожен вид фрагмента.",
        de: "Die Stile, die jede Art von Abschnitt erhält.",
        fr: "Les styles attribués à chaque type de segment."
      }
    },
    returns: {
      en: "the runs, in order, each with its text and its style.",
      ru: "фрагменты по порядку, каждый со своим текстом и стилем.",
      uk: "фрагменти по порядку, кожен зі своїм текстом і стилем.",
      de: "die Abschnitte der Reihe nach, jeder mit Text und Stil.",
      fr: "les segments, dans l'ordre, chacun avec son texte et son style."
    }
  }),

  highlightHtml: simple({
    seeAlso: ["convertRichTextToHtml", "isRange"],
    examples: code(
      ["const range = SpreadsheetApp.getActiveRange();", "", "highlightHtml(range);"].join("\n")
    ),
    summary: {
      en: "Colours the HTML in a range as source code.",
      ru: "Раскрашивает HTML в диапазоне как исходный код.",
      uk: "Розфарбовує HTML у діапазоні як вихідний код.",
      de: "Färbt das HTML in einem Bereich wie Quellcode ein.",
      fr: "Colore le HTML d'une plage comme du code source."
    },
    paragraph: {
      en: "The cells are read as text, tags, attribute names, values, comments and text content are told apart, and the cells are written back as rich text with each part in its own colour. A theme decides the colours.",
      ru: "Ячейки читаются как текст, в нём различаются теги, имена атрибутов, значения, комментарии и содержимое, и ячейки записываются обратно форматированным текстом, где каждая часть своего цвета. Цвета задаёт тема.",
      uk: "Комірки читаються як текст, у ньому розрізняються теги, імена атрибутів, значення, коментарі та вміст, і комірки записуються назад форматованим текстом, де кожна частина свого кольору. Кольори задає тема.",
      de: "Die Zellen werden als Text gelesen, darin Tags, Attributnamen, Werte, Kommentare und Inhalt unterschieden, und die Zellen als Rich Text zurückgeschrieben, jeder Teil in seiner Farbe. Die Farben bestimmt ein Theme.",
      fr: "Les cellules sont lues comme du texte, on y distingue balises, noms d'attributs, valeurs, commentaires et contenu, puis elles sont réécrites en texte enrichi, chaque partie dans sa couleur. Un thème décide des couleurs."
    },
    params: {
      range: {
        en: "The range whose cells are highlighted.",
        ru: "Диапазон, ячейки которого раскрашиваются.",
        uk: "Діапазон, комірки якого розфарбовуються.",
        de: "Der Bereich, dessen Zellen eingefärbt werden.",
        fr: "La plage dont les cellules sont colorées."
      },
      theme: {
        en: "The colour for each kind of token.",
        ru: "Цвет для каждого вида токена.",
        uk: "Колір для кожного виду токена.",
        de: "Die Farbe für jede Art von Token.",
        fr: "La couleur de chaque type de jeton."
      }
    },
    returns: {
      en: "the same range.",
      ru: "тот же диапазон.",
      uk: "той самий діапазон.",
      de: "denselben Bereich.",
      fr: "la même plage."
    },
    throws: {
      InvalidRangeException: {
        en: "the first argument is not a range.",
        ru: "первый аргумент не является диапазоном.",
        uk: "перший аргумент не є діапазоном.",
        de: "das erste Argument ist kein Bereich.",
        fr: "le premier argument n'est pas une plage."
      }
    }
  }),

  createFolder: simple({
    seeAlso: ["join", "normalize"],
    examples: code('const folder = createFolder("reports/2026/january");'),
    summary: {
      en: "Creates a folder path in Drive, reusing the folders that already exist.",
      ru: "Создаёт путь папок на Диске, переиспользуя уже существующие папки.",
      uk: "Створює шлях папок на Диску, перевикористовуючи вже наявні папки.",
      de: "Legt einen Ordnerpfad in Drive an und nutzt bereits vorhandene Ordner weiter.",
      fr: "Crée un chemin de dossiers dans Drive en réutilisant ceux qui existent déjà."
    },
    paragraph: {
      en: "The path is walked segment by segment: an existing folder of that name is entered, a missing one is created. Drive allows two folders to share a name, so the first match wins rather than a second one being made.",
      ru: "Путь проходится по сегментам: существующая папка с таким именем открывается, отсутствующая создаётся. На Диске имена папок могут повторяться, поэтому берётся первое совпадение, а не создаётся вторая папка.",
      uk: "Шлях проходиться посегментно: наявна папка з таким іменем відкривається, відсутня створюється. На Диску імена папок можуть повторюватися, тому береться перший збіг, а не створюється друга папка.",
      de: "Der Pfad wird Segment für Segment durchlaufen: ein vorhandener Ordner dieses Namens wird betreten, ein fehlender angelegt. Drive erlaubt gleichnamige Ordner, daher gewinnt der erste Treffer, statt dass ein zweiter entsteht.",
      fr: "Le chemin est parcouru segment par segment : un dossier existant de ce nom est ouvert, un dossier manquant est créé. Drive autorise les homonymes, donc la première correspondance l'emporte plutôt que d'en créer une seconde."
    },
    params: {
      path: {
        en: "The folder path, separated by `/`.",
        ru: "Путь папок, разделённый `/`.",
        uk: "Шлях папок, розділений `/`.",
        de: "Der Ordnerpfad, durch `/` getrennt.",
        fr: "Le chemin de dossiers, séparé par `/`."
      },
      rootFolder: {
        en: "Where to start. The Drive root by default.",
        ru: "Откуда начинать. По умолчанию корень Диска.",
        uk: "Звідки починати. Типово корінь Диска.",
        de: "Wo begonnen wird. Standardmäßig die Drive-Wurzel.",
        fr: "Le point de départ. La racine de Drive par défaut."
      }
    },
    returns: {
      en: "the folder at the end of the path.",
      ru: "папка в конце пути.",
      uk: "папка в кінці шляху.",
      de: "der Ordner am Ende des Pfades.",
      fr: "le dossier au bout du chemin."
    }
  }),

  getTriggerById: simple({
    seeAlso: ["requireNonEmptyString"],
    examples: code(
      [
        'const id = PropertiesService.getScriptProperties().getProperty("TRIGGER_ID");',
        "",
        "const trigger = getTriggerById(id);",
        "",
        "if (trigger !== null) {",
        "  ScriptApp.deleteTrigger(trigger);",
        "}"
      ].join("\n")
    ),
    summary: {
      en: "Finds one of the project's triggers by its id.",
      ru: "Находит триггер проекта по идентификатору.",
      uk: "Знаходить тригер проєкту за ідентифікатором.",
      de: "Findet einen Trigger des Projekts anhand seiner Id.",
      fr: "Trouve l'un des déclencheurs du projet par son identifiant."
    },
    paragraph: {
      en: "Apps Script hands out a trigger id when a trigger is created but offers no way to look one up again, so the project's triggers are walked and compared. A trigger that has since been deleted gives `null`, which is the case a stored id has to handle.",
      ru: "Apps Script выдаёт идентификатор при создании триггера, но не даёт способа найти его потом, поэтому триггеры проекта перебираются и сравниваются. Уже удалённый триггер даёт `null` — этот случай и должен обрабатывать сохранённый идентификатор.",
      uk: "Apps Script видає ідентифікатор під час створення тригера, але не дає способу знайти його потім, тому тригери проєкту перебираються та порівнюються. Уже видалений тригер дає `null` — саме цей випадок і має обробляти збережений ідентифікатор.",
      de: "Apps Script vergibt beim Anlegen eines Triggers eine Id, bietet aber keine Suche danach, also werden die Trigger des Projekts durchlaufen und verglichen. Ein inzwischen gelöschter Trigger ergibt `null` — der Fall, den eine gespeicherte Id behandeln muss.",
      fr: "Apps Script attribue un identifiant à la création d'un déclencheur mais n'offre aucun moyen de le retrouver : les déclencheurs du projet sont donc parcourus et comparés. Un déclencheur supprimé depuis donne `null`, cas que doit gérer un identifiant stocké."
    },
    params: {
      id: {
        en: "The trigger id. It must not be empty.",
        ru: "Идентификатор триггера. Не должен быть пустым.",
        uk: "Ідентифікатор тригера. Не має бути порожнім.",
        de: "Die Trigger-Id. Sie darf nicht leer sein.",
        fr: "L'identifiant du déclencheur. Il ne doit pas être vide."
      }
    },
    returns: {
      en: "the trigger, or `null` when the project has none with that id.",
      ru: "триггер или `null`, если такого идентификатора у проекта нет.",
      uk: "тригер або `null`, якщо такого ідентифікатора в проєкту немає.",
      de: "den Trigger oder `null`, wenn das Projekt keinen mit dieser Id hat.",
      fr: "le déclencheur, ou `null` si le projet n'en a aucun avec cet identifiant."
    },
    throws: {
      EmptyStringException: {
        en: "the id is not a string, or is empty.",
        ru: "идентификатор не строка или строка пуста.",
        uk: "ідентифікатор не рядок або рядок порожній.",
        de: "die Id ist keine Zeichenkette oder ist leer.",
        fr: "l'identifiant n'est pas une chaîne, ou il est vide."
      }
    },
    title: { en: "Looking up", ru: "Поиск", uk: "Пошук", de: "Nachschlagen", fr: "Recherche" }
  })
};
