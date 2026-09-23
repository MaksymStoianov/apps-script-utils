/**
 * The languages the documentation is published in.
 *
 * `en` is the source language: its Writerside project is `docs/writerside/`
 * and it is published at the site root. Every other language gets a generated
 * project of its own, `docs/writerside-<code>/`, published under `/<code>/`.
 *
 * The strings here are the page chrome — headings, table columns, the labels
 * around the prose. The prose itself lives in `docs/content/<code>/`.
 */

export const SITE = "https://maksymstoianov.github.io/apps-script-utils";

export const LANGUAGES = [
  {
    code: "en",
    locale: "en-US",
    name: "English",
    root: "docs/writerside",
    webRoot: SITE,
    instanceName: "apps-script-utils",
    strings: {
      parameters: "Parameters",
      parameter: "Parameter",
      type: "Type",
      description: "Description",
      optional: "optional",
      returns: "Returns",
      throws: "Throws",
      exception: "Exception",
      condition: "Condition",
      examples: "Examples",
      seeAlso: "See also",
      source: "Source",
      module: "Module",
      since: "Since",
      deprecated: "Deprecated",
      searchPlaceholder: "Search functions, guides and examples…",
      searchLabel: "Search",
      searchHint: "Type to search.",
      searchMissing: "The search index is not available on this build.",
      searchMatches: "matches",
      searchEmpty: "Nothing matches",
      language: "Language",
      englishNotice:
        "This page has not been translated yet. It is shown in English; the English reference is always the most current.",
      tocReference: "Function reference",
      tocGuides: "Guides",
      tocModules: "Modules",
      aiNotice: "This documentation was generated with AI (Claude) from the library's source code.",
      narrows: "In TypeScript the guard narrows `{name}` to `{type}` inside the branch.",
      tableFunction: "Function",
      tableReturns: "Return type",
      tableDescription: "Brief description",
      tableException: "Exception",
      tableAbstract: "Abstract",
      tableInterface: "Interface",
      tableDescriptionShort: "Description"
    }
  },
  {
    code: "ru",
    locale: "ru-RU",
    name: "Русский",
    root: "docs/writerside-ru",
    webRoot: `${SITE}/ru`,
    instanceName: "apps-script-utils (Русский)",
    strings: {
      parameters: "Параметры",
      parameter: "Параметр",
      type: "Тип",
      description: "Описание",
      optional: "необязательный",
      returns: "Возвращает",
      throws: "Исключения",
      exception: "Исключение",
      condition: "Условие",
      examples: "Примеры",
      seeAlso: "Смотрите также",
      source: "Исходный код",
      module: "Модуль",
      since: "Доступно с",
      deprecated: "Устарело",
      searchPlaceholder: "Поиск по функциям, руководствам и примерам…",
      searchLabel: "Поиск",
      searchHint: "Начните вводить запрос.",
      searchMissing: "Поисковый индекс недоступен в этой сборке.",
      searchMatches: "совпадений",
      searchEmpty: "Ничего не найдено по запросу",
      language: "Язык",
      englishNotice:
        "Эта страница ещё не переведена и показана на английском. Английская версия справочника всегда самая актуальная.",
      tocReference: "Справочник функций",
      tocGuides: "Руководства",
      tocModules: "Модули",
      aiNotice:
        "Эта документация сгенерирована нейросетью (Claude) на основе исходного кода библиотеки.",
      narrows: "В TypeScript внутри ветки значение `{name}` сужается до `{type}`.",
      tableFunction: "Функция",
      tableReturns: "Возвращает",
      tableDescription: "Краткое описание",
      tableException: "Исключение",
      tableAbstract: "Абстракция",
      tableInterface: "Интерфейс",
      tableDescriptionShort: "Описание"
    }
  },
  {
    code: "uk",
    locale: "uk-UA",
    name: "Українська",
    root: "docs/writerside-uk",
    webRoot: `${SITE}/uk`,
    instanceName: "apps-script-utils (Українська)",
    strings: {
      parameters: "Параметри",
      parameter: "Параметр",
      type: "Тип",
      description: "Опис",
      optional: "необов'язковий",
      returns: "Повертає",
      throws: "Винятки",
      exception: "Виняток",
      condition: "Умова",
      examples: "Приклади",
      seeAlso: "Дивіться також",
      source: "Вихідний код",
      module: "Модуль",
      since: "Доступно з",
      deprecated: "Застаріло",
      searchPlaceholder: "Пошук за функціями, посібниками та прикладами…",
      searchLabel: "Пошук",
      searchHint: "Почніть вводити запит.",
      searchMissing: "Пошуковий індекс недоступний у цій збірці.",
      searchMatches: "збігів",
      searchEmpty: "Нічого не знайдено за запитом",
      language: "Мова",
      englishNotice:
        "Цю сторінку ще не перекладено, вона показана англійською. Англійська версія довідника завжди найактуальніша.",
      tocReference: "Довідник функцій",
      tocGuides: "Посібники",
      tocModules: "Модулі",
      aiNotice:
        "Цю документацію згенеровано нейромережею (Claude) на основі вихідного коду бібліотеки.",
      narrows: "У TypeScript усередині гілки значення `{name}` звужується до `{type}`.",
      tableFunction: "Функція",
      tableReturns: "Повертає",
      tableDescription: "Короткий опис",
      tableException: "Виняток",
      tableAbstract: "Абстракція",
      tableInterface: "Інтерфейс",
      tableDescriptionShort: "Опис"
    }
  },
  {
    code: "de",
    locale: "de-DE",
    name: "Deutsch",
    root: "docs/writerside-de",
    webRoot: `${SITE}/de`,
    instanceName: "apps-script-utils (Deutsch)",
    strings: {
      parameters: "Parameter",
      parameter: "Parameter",
      type: "Typ",
      description: "Beschreibung",
      optional: "optional",
      returns: "Rückgabewert",
      throws: "Ausnahmen",
      exception: "Ausnahme",
      condition: "Bedingung",
      examples: "Beispiele",
      seeAlso: "Siehe auch",
      source: "Quellcode",
      module: "Modul",
      since: "Verfügbar seit",
      deprecated: "Veraltet",
      searchPlaceholder: "Funktionen, Anleitungen und Beispiele durchsuchen…",
      searchLabel: "Suche",
      searchHint: "Tippen, um zu suchen.",
      searchMissing: "Der Suchindex ist in diesem Build nicht verfügbar.",
      searchMatches: "Treffer",
      searchEmpty: "Nichts gefunden für",
      language: "Sprache",
      englishNotice:
        "Diese Seite ist noch nicht übersetzt und wird auf Englisch angezeigt. Die englische Referenz ist immer die aktuellste.",
      tocReference: "Funktionsreferenz",
      tocGuides: "Anleitungen",
      tocModules: "Module",
      aiNotice:
        "Diese Dokumentation wurde mit KI (Claude) aus dem Quellcode der Bibliothek erzeugt.",
      narrows: "In TypeScript verengt die Prüfung `{name}` innerhalb des Zweigs auf `{type}`.",
      tableFunction: "Funktion",
      tableReturns: "Rückgabetyp",
      tableDescription: "Kurzbeschreibung",
      tableException: "Ausnahme",
      tableAbstract: "Abstrakte Klasse",
      tableInterface: "Schnittstelle",
      tableDescriptionShort: "Beschreibung"
    }
  },
  {
    code: "fr",
    locale: "fr-FR",
    name: "Français",
    root: "docs/writerside-fr",
    webRoot: `${SITE}/fr`,
    instanceName: "apps-script-utils (Français)",
    strings: {
      parameters: "Paramètres",
      parameter: "Paramètre",
      type: "Type",
      description: "Description",
      optional: "facultatif",
      returns: "Valeur de retour",
      throws: "Exceptions",
      exception: "Exception",
      condition: "Condition",
      examples: "Exemples",
      seeAlso: "Voir aussi",
      source: "Code source",
      module: "Module",
      since: "Disponible depuis",
      deprecated: "Déprécié",
      searchPlaceholder: "Rechercher des fonctions, des guides et des exemples…",
      searchLabel: "Rechercher",
      searchHint: "Saisissez votre recherche.",
      searchMissing: "L'index de recherche n'est pas disponible dans cette version.",
      searchMatches: "résultats",
      searchEmpty: "Aucun résultat pour",
      language: "Langue",
      englishNotice:
        "Cette page n'est pas encore traduite et s'affiche en anglais. La référence anglaise est toujours la plus à jour.",
      tocReference: "Référence des fonctions",
      tocGuides: "Guides",
      tocModules: "Modules",
      aiNotice:
        "Cette documentation a été générée par une IA (Claude) à partir du code source de la bibliothèque.",
      narrows: "En TypeScript, le garde restreint `{name}` à `{type}` dans la branche.",
      tableFunction: "Fonction",
      tableReturns: "Type de retour",
      tableDescription: "Description brève",
      tableException: "Exception",
      tableAbstract: "Classe abstraite",
      tableInterface: "Interface",
      tableDescriptionShort: "Description"
    }
  }
];

export const SOURCE_LANGUAGE = LANGUAGES[0];

export function languageOf(code) {
  return LANGUAGES.find((language) => language.code === code);
}
