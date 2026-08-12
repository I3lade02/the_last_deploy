import type { DocumentationEntry } from "../../types/game";

export const cssDocumentation:
  DocumentationEntry[] = [
    {
      id:
        "css-stylesheet",

      title:
        "External Stylesheets",

      category:
        "CSS / Setup",

      summary:
        "An external stylesheet keeps visual rules in a separate CSS file.",

      syntax: `<link
  rel="stylesheet"
  href="styles.css"
>`,

      notes: [
        "The link element belongs inside the document head.",
        "The href attribute points to the CSS file.",
        "Multiple HTML pages can use the same stylesheet.",
      ],

      keywords: [
        "css",
        "stylesheet",
        "link",
        "href",
        "external",
      ],

      unlockAtMissionOrder:
        13,
    },

    {
      id:
        "css-rule",

      title:
        "CSS Rules",

      category:
        "CSS / Fundamentals",

      summary:
        "A CSS rule selects elements and applies visual declarations to them.",

      syntax: `selector {
  property: value;
}`,

      notes: [
        "The selector determines which elements are affected.",
        "Each declaration consists of a property and a value.",
        "Declarations normally end with a semicolon.",
      ],

      keywords: [
        "css",
        "rule",
        "selector",
        "property",
        "value",
        "declaration",
      ],

      unlockAtMissionOrder:
        13,
    },

    {
      id:
        "css-element-selector",

      title:
        "Element Selectors",

      category:
        "CSS / Selectors",

      summary:
        "An element selector applies styles to every matching HTML element.",

      syntax: `body {
  ...
}

h1 {
  ...
}`,

      notes: [
        "body selects the document body.",
        "h1 selects all primary headings.",
      ],

      keywords: [
        "selector",
        "body",
        "h1",
        "element",
        "tag",
      ],

      unlockAtMissionOrder:
        13,
    },

    {
      id:
        "css-colors",

      title:
        "Text and Background Colors",

      category:
        "CSS / Appearance",

      summary:
        "The color property controls text color. background-color controls the background of an element.",

      syntax: `body {
  color: #e5e7eb;
  background-color: #0b1220;
}`,

      notes: [
        "CSS supports several color formats, including hexadecimal values.",
        "Inherited text color can affect many child elements automatically.",
      ],

      keywords: [
        "color",
        "background",
        "background-color",
        "hex",
      ],

      unlockAtMissionOrder:
        13,
    },

    {
      id:
        "css-font-family",

      title:
        "Font Family",

      category:
        "CSS / Typography",

      summary:
        "font-family defines which fonts should be used to render text.",

      syntax: `body {
  font-family: Arial, sans-serif;
}`,

      notes: [
        "A comma-separated font stack provides fallback choices.",
        "Generic families such as sans-serif are useful as the final fallback.",
      ],

      keywords: [
        "font",
        "font-family",
        "arial",
        "sans-serif",
        "typography",
      ],

      unlockAtMissionOrder:
        13,
    },
  ];