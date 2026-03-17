import jsdoc from "eslint-plugin-jsdoc";

export default {
  files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  plugins: {
    jsdoc
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    "jsdoc/multiline-blocks": ["warn", { noSingleLineBlocks: true }],
    "jsdoc/require-param-type": "warn",
    "jsdoc/require-returns-type": "warn",
    "jsdoc/valid-types": "error",
    "jsdoc/check-param-names": "warn",
    "curly": ["error", "all"],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "*",
        next: [
          "return",
          "if",
          "for",
          "while",
          "do",
          "switch",
          "try",
          "const",
          "let",
          "var",
          "break",
          "continue",
          "throw",
          "class",
          "function",
          "export"
        ]
      },
      {
        blankLine: "always",
        prev: [
          "if",
          "for",
          "while",
          "do",
          "switch",
          "try",
          "const",
          "let",
          "var",
          "break",
          "continue",
          "throw",
          "class",
          "function",
          "export"
        ],
        next: "*"
      }
    ],
    "lines-around-comment": [
      "warn",
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true
      }
    ],
    "max-depth": ["warn", 4],
    "max-params": ["warn", 4],
    "no-console": "warn",
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    "no-restricted-syntax": [
      "warn",
      {
        selector: "IfStatement > LogicalExpression > LogicalExpression",
        message:
          "The condition in the if statement is too complex. It's recommended to move it to a separate variable or function for better readability."
      },
      {
        selector: "ConditionalExpression > LogicalExpression > LogicalExpression",
        message:
          "The condition in the ternary operator is too complex. It is recommended to move it to a separate variable."
      },
      {
        selector:
          "TemplateLiteral > :not(Identifier, MemberExpression, OptionalMemberExpression, ChainExpression, ThisExpression, TemplateElement)",
        message:
          "All calculations should be moved out of the template string. Only variables and properties should be used inside the template string."
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ]
  }
};
