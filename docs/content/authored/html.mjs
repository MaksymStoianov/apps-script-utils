/** Prose for the HTML and XML helpers. */

import { code, entry } from "./_entry.mjs";

const STRING_PARAM = {
  en: "The string to convert. It must not be empty.",
  ru: "Строка для преобразования. Не должна быть пустой.",
  uk: "Рядок для перетворення. Не має бути порожнім.",
  de: "Die umzuwandelnde Zeichenkette. Sie darf nicht leer sein.",
  fr: "La chaîne à convertir. Elle ne doit pas être vide."
};

const EMPTY_THROW = {
  EmptyStringException: {
    en: "the value is not a string, or is empty.",
    ru: "значение не строка или строка пуста.",
    uk: "значення не рядок або рядок порожній.",
    de: "der Wert ist keine Zeichenkette oder ist leer.",
    fr: "la valeur n'est pas une chaîne, ou elle est vide."
  }
};

const TITLE = {
  en: "Converting",
  ru: "Преобразование",
  uk: "Перетворення",
  de: "Umwandeln",
  fr: "Conversion"
};

export const FUNCTIONS = {
  escapeHtml: entry({
    seeAlso: ["encodeHtml", "escapeXml", "merge"],
    examples: code('escapeHtml("<a>&"); // => "&lt;a&gt;&amp;"'),
    summary: {
      en: "Replaces the five characters that would otherwise be read as markup.",
      ru: "Заменяет пять символов, которые иначе были бы прочитаны как разметка.",
      uk: "Замінює п'ять символів, які інакше були б прочитані як розмітка.",
      de: "Ersetzt die fünf Zeichen, die sonst als Markup gelesen würden.",
      fr: "Remplace les cinq caractères qui seraient autrement lus comme du balisage."
    },
    description: {
      en: [
        "`<`, `>`, `&`, `\"` and `'` become named entities. This is what to call on anything a user supplied before it reaches an `HtmlOutput` or a template."
      ],
      ru: [
        "`<`, `>`, `&`, `\"` и `'` превращаются в именованные сущности. Именно это стоит вызвать для всего, что пришло от пользователя, прежде чем оно попадёт в `HtmlOutput` или шаблон."
      ],
      uk: [
        "`<`, `>`, `&`, `\"` та `'` перетворюються на іменовані сутності. Саме це варто викликати для всього, що надійшло від користувача, перш ніж воно потрапить у `HtmlOutput` чи шаблон."
      ],
      de: [
        "`<`, `>`, `&`, `\"` und `'` werden zu benannten Entities. Genau das gehört auf alles angewendet, was von einem Nutzer kam, bevor es in ein `HtmlOutput` oder eine Vorlage geht."
      ],
      fr: [
        "`<`, `>`, `&`, `\"` et `'` deviennent des entités nommées. C'est ce qu'il faut appeler sur tout ce qui vient d'un utilisateur avant que cela n'atteigne un `HtmlOutput` ou un gabarit."
      ]
    },
    params: { value: STRING_PARAM },
    returns: {
      en: "the escaped string.",
      ru: "экранированная строка.",
      uk: "екранований рядок.",
      de: "die maskierte Zeichenkette.",
      fr: "la chaîne échappée."
    },
    throws: EMPTY_THROW,
    title: TITLE
  }),

  encodeHtml: entry({
    seeAlso: ["decodeHtml", "escapeHtml"],
    examples: code('encodeHtml("<a>"); // => "&#60;a&#62;"'),
    summary: {
      en: "Encodes every character as a numeric character reference.",
      ru: "Кодирует каждый символ числовой ссылкой.",
      uk: "Кодує кожен символ числовим посиланням.",
      de: "Kodiert jedes Zeichen als numerische Zeichenreferenz.",
      fr: "Encode chaque caractère en référence numérique."
    },
    description: {
      en: [
        "Unlike `escapeHtml`, which touches only the five dangerous characters, this rewrites the whole string as `&#NN;` references. `decodeHtml` is its inverse."
      ],
      ru: [
        "В отличие от `escapeHtml`, который трогает только пять опасных символов, здесь вся строка переписывается ссылками вида `&#NN;`. Обратная функция — `decodeHtml`."
      ],
      uk: [
        "На відміну від `escapeHtml`, який чіпає лише п'ять небезпечних символів, тут увесь рядок переписується посиланнями виду `&#NN;`. Зворотна функція — `decodeHtml`."
      ],
      de: [
        "Anders als `escapeHtml`, das nur die fünf gefährlichen Zeichen anfasst, schreibt dies die ganze Zeichenkette in `&#NN;`-Referenzen um. `decodeHtml` ist die Umkehrung."
      ],
      fr: [
        "Contrairement à `escapeHtml`, qui ne touche que les cinq caractères dangereux, celle-ci réécrit toute la chaîne en références `&#NN;`. `decodeHtml` en est l'inverse."
      ]
    },
    params: { value: STRING_PARAM },
    returns: {
      en: "the encoded string.",
      ru: "закодированная строка.",
      uk: "закодований рядок.",
      de: "die kodierte Zeichenkette.",
      fr: "la chaîne encodée."
    },
    throws: EMPTY_THROW,
    title: TITLE
  }),

  decodeHtml: entry({
    seeAlso: ["encodeHtml", "escapeHtml"],
    examples: code('decodeHtml("&#60;a&#62;"); // => "<a>"\ndecodeHtml("&amp;"); // => "&amp;"'),
    summary: {
      en: "Turns numeric character references back into characters.",
      ru: "Превращает числовые ссылки на символы обратно в символы.",
      uk: "Перетворює числові посилання на символи назад у символи.",
      de: "Verwandelt numerische Zeichenreferenzen zurück in Zeichen.",
      fr: "Retransforme les références numériques en caractères."
    },
    description: {
      en: [
        'Decimal (`&#60;`) and hexadecimal (`&#x3C;`) references are decoded. Named entities are **not**: `"&amp;"` comes back unchanged, because this is the inverse of `encodeHtml`, which only ever emits numeric references.'
      ],
      ru: [
        'Раскодируются десятичные (`&#60;`) и шестнадцатеричные (`&#x3C;`) ссылки. Именованные сущности — **нет**: `"&amp;"` возвращается без изменений, потому что это обратная функция к `encodeHtml`, а тот выдаёт только числовые ссылки.'
      ],
      uk: [
        'Розкодовуються десяткові (`&#60;`) та шістнадцяткові (`&#x3C;`) посилання. Іменовані сутності — **ні**: `"&amp;"` повертається без змін, бо це зворотна функція до `encodeHtml`, а той видає лише числові посилання.'
      ],
      de: [
        'Dezimale (`&#60;`) und hexadezimale (`&#x3C;`) Referenzen werden dekodiert. Benannte Entities **nicht**: `"&amp;"` kommt unverändert zurück, denn dies ist die Umkehrung von `encodeHtml`, das ausschließlich numerische Referenzen erzeugt.'
      ],
      fr: [
        "Les références décimales (`&#60;`) et hexadécimales (`&#x3C;`) sont décodées. Les entités nommées **non** : `\"&amp;\"` revient inchangée, car il s'agit de l'inverse d'`encodeHtml`, qui n'émet que des références numériques."
      ]
    },
    params: { value: STRING_PARAM },
    returns: {
      en: "the decoded string.",
      ru: "раскодированная строка.",
      uk: "розкодований рядок.",
      de: "die dekodierte Zeichenkette.",
      fr: "la chaîne décodée."
    },
    throws: EMPTY_THROW,
    title: TITLE
  }),

  escapeXml: entry({
    seeAlso: ["escapeHtml"],
    examples: code('escapeXml("<a>&"); // => "&lt;a&gt;&amp;"'),
    summary: {
      en: "Escapes the characters XML reserves.",
      ru: "Экранирует символы, зарезервированные в XML.",
      uk: "Екранує символи, зарезервовані в XML.",
      de: "Maskiert die von XML reservierten Zeichen.",
      fr: "Échappe les caractères réservés par XML."
    },
    description: {
      en: [
        "The same five characters as `escapeHtml`, for content going into an XML document rather than a page."
      ],
      ru: [
        "Те же пять символов, что и в `escapeHtml`, но для содержимого, которое идёт в XML-документ, а не на страницу."
      ],
      uk: [
        "Ті самі п'ять символів, що й у `escapeHtml`, але для вмісту, який іде в XML-документ, а не на сторінку."
      ],
      de: [
        "Dieselben fünf Zeichen wie bei `escapeHtml`, für Inhalt, der in ein XML-Dokument statt auf eine Seite geht."
      ],
      fr: [
        "Les mêmes cinq caractères qu'`escapeHtml`, pour du contenu destiné à un document XML plutôt qu'à une page."
      ]
    },
    params: { value: STRING_PARAM },
    returns: {
      en: "the escaped string.",
      ru: "экранированная строка.",
      uk: "екранований рядок.",
      de: "die maskierte Zeichenkette.",
      fr: "la chaîne échappée."
    },
    throws: EMPTY_THROW,
    title: TITLE
  })
};
