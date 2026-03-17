export interface Theme {
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  codeTheme?: {
    fontFamily?: string;
    textColor?: string;
    backgroundColor?: string;
  };
  linkColor?: string;
}

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  foregroundColor?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontFamily?: string;
  link?: { url: string };
}

export interface RichTextRun {
  text: string;
  style: TextStyle;
}

/**
 * Converts a Markdown-formatted string to an array of RichTextRun objects.
 *
 * @param {string} text The Markdown-formatted string.
 * @param {Theme} [theme={}] The theme settings for the rich text.
 * @returns {RichTextRun[]} An array of RichTextRun objects.
 * @since 1.5.0
 */
export function convertMarkdownToRichText(text: string, theme: Theme = {}): RichTextRun[] {
  const runs: RichTextRun[] = [];

  // Дефолтные значения темы
  const baseStyle: TextStyle = {
    fontSize: theme.fontSize || 12,
    fontFamily: theme.fontFamily || "Arial",
    foregroundColor: theme.textColor || "#000000"
  };

  const rules = [
    { name: "bold", regex: /\*\*(.*?)\*\*/ },
    { name: "italic", regex: /\*(.*?)\*/ },
    { name: "strikethrough", regex: /~~(.*?)~~/ },
    { name: "code", regex: /`(.*?)`/ },
    { name: "link", regex: /\[(.*?)\]\((.*?)\)/ }
  ];

  function parse(input: string, currentStyle: TextStyle): void {
    if (!input) {
      return;
    }

    let closestMatch = null;

    let activeRule = null;

    for (const rule of rules) {
      const match = rule.regex.exec(input);

      if (match && (closestMatch === null || match.index < closestMatch.index)) {
        closestMatch = match;
        activeRule = rule;
      }
    }

    if (closestMatch && activeRule) {
      const [fullMatch, group1, group2] = closestMatch;

      const startIndex = closestMatch.index;

      // Текст ДО вхождения
      if (startIndex > 0) {
        runs.push({
          text: input.substring(0, startIndex),
          style: { ...currentStyle }
        });
      }

      // Применяем стили из Markdown поверх текущих
      const nextStyle = { ...currentStyle };

      switch (activeRule.name) {
        case "bold":
          nextStyle.bold = true;

          break;
        case "italic":
          nextStyle.italic = true;

          break;
        case "strikethrough":
          nextStyle.strikethrough = true;

          break;
        case "code":
          nextStyle.fontFamily = theme.codeTheme?.fontFamily || "Courier New";
          nextStyle.foregroundColor = theme.codeTheme?.textColor || "#EB5757";
          nextStyle.backgroundColor = theme.codeTheme?.backgroundColor || "#F3F3F3";

          break;
        case "link":
          nextStyle.link = { url: group2 };
          nextStyle.foregroundColor = theme.linkColor || "#1155CC";

          break;
      }

      const content = group1;

      // Рекурсия для вложенных стилей (кроме кода, где Markdown игнорируется)
      if (activeRule.name === "code") {
        runs.push({ text: content, style: nextStyle });
      } else {
        parse(content, nextStyle);
      }

      // Остаток строки
      parse(input.substring(startIndex + fullMatch.length), currentStyle);
    } else {
      runs.push({ text: input, style: { ...currentStyle } });
    }
  }

  parse(text, baseStyle);

  return optimizeRuns(runs);
}

function optimizeRuns(runs: RichTextRun[]): RichTextRun[] {
  if (runs.length === 0) {
    return [];
  }

  const optimized: RichTextRun[] = [];

  let current = { ...runs[0] };

  for (let i = 1; i < runs.length; i++) {
    const next = runs[i];

    if (JSON.stringify(current.style) === JSON.stringify(next.style)) {
      current.text += next.text;
    } else {
      optimized.push(current);
      current = { ...next };
    }
  }

  optimized.push(current);

  return optimized.filter((r) => r.text.length > 0);
}
