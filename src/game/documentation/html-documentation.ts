import type { DocumentationEntry } from "../../types/game";

export const htmlDocumentation: DocumentationEntry[] = [
  {
    id: "html-headings",

    title: "Headings",
    category: "HTML / Content",

    summary:
      "Heading elements define the hierarchy of titles and sections on a page.",

    syntax: `<h1>Main heading</h1>
<h2>Section heading</h2>`,

    notes: [
      "h1 usually represents the primary heading of a page.",
      "h2 represents a subsection beneath the primary heading.",
      "Heading levels should describe structure, not visual size.",
    ],

    keywords: ["heading", "h1", "h2", "title"],

    unlockAtMissionOrder: 1,
  },

  {
    id: "html-paragraph",

    title: "Paragraph",
    category: "HTML / Content",

    summary:
      "The p element represents a paragraph of text.",

    syntax: `<p>This is a paragraph.</p>`,

    keywords: ["paragraph", "text", "p"],

    unlockAtMissionOrder: 2,
  },

  {
    id: "html-anchor",

    title: "Links",
    category: "HTML / Navigation",

    summary:
      "The anchor element creates hyperlinks between documents or locations.",

    syntax: `<a href="about.html">About</a>`,

    notes: [
      "The href attribute defines the destination.",
      "A destination beginning with # points to an element on the current page.",
    ],

    keywords: ["anchor", "link", "href", "navigation"],

    unlockAtMissionOrder: 3,
  },

  {
    id: "html-image",

    title: "Images",
    category: "HTML / Media",

    summary:
      "The img element embeds an image into a document.",

    syntax: `<img src="assets/logo.svg" alt="Company logo">`,

    notes: [
      "src contains the image location.",
      "alt provides a textual alternative when the image cannot be seen.",
    ],

    keywords: ["img", "image", "src", "alt"],

    unlockAtMissionOrder: 4,
  },

  {
    id: "html-lists",

    title: "Lists",
    category: "HTML / Content",

    summary:
      "HTML supports unordered lists and ordered lists.",

    syntax: `<ul>
  <li>Item</li>
</ul>

<ol>
  <li>First step</li>
</ol>`,

    notes: [
      "Use ul when item order is not significant.",
      "Use ol when order or sequence matters.",
      "List entries are represented by li.",
    ],

    keywords: ["ul", "ol", "li", "list"],

    unlockAtMissionOrder: 5,
  },

  {
    id: "html-header",

    title: "Header",
    category: "HTML / Semantic Structure",

    summary:
      "The header element represents introductory content for a page or section.",

    syntax: `<header>
  <h1>Company</h1>
</header>`,

    keywords: ["header", "semantic", "structure"],

    unlockAtMissionOrder: 6,
  },

  {
    id: "html-main",

    title: "Main",
    category: "HTML / Semantic Structure",

    summary:
      "The main element represents the primary content of the document.",

    syntax: `<main>
  ...
</main>`,

    notes: [
      "A document should normally contain only one main element.",
    ],

    keywords: ["main", "semantic", "content"],

    unlockAtMissionOrder: 6,
  },

  {
    id: "html-section",

    title: "Section",
    category: "HTML / Semantic Structure",

    summary:
      "The section element represents a meaningful thematic section of content.",

    syntax: `<section>
  <h2>About Us</h2>
  <p>...</p>
</section>`,

    keywords: ["section", "semantic", "structure"],

    unlockAtMissionOrder: 6,
  },

  {
    id: "html-footer",

    title: "Footer",
    category: "HTML / Semantic Structure",

    summary:
      "The footer element represents footer information for a document or section.",

    syntax: `<footer>
  <p>© 2026 Company</p>
</footer>`,

    keywords: ["footer", "semantic"],

    unlockAtMissionOrder: 6,
  },

  {
    id: "html-nav",

    title: "Navigation",
    category: "HTML / Navigation",

    summary:
      "The nav element identifies a major navigation section.",

    syntax: `<nav>
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
</nav>`,

    notes: [
      'href="#about" navigates to an element with id="about".',
    ],

    keywords: ["nav", "navigation", "anchor", "id", "href"],

    unlockAtMissionOrder: 7,
  },

  {
    id: "html-id",

    title: "ID Attribute",
    category: "HTML / Attributes",

    summary:
      "The id attribute provides a unique identifier for an element.",

    syntax: `<section id="about">
  ...
</section>`,

    notes: [
      "An id should be unique within the document.",
      "IDs can be used as navigation targets.",
    ],

    keywords: ["id", "attribute", "fragment"],

    unlockAtMissionOrder: 7,
  },

  {
    id: "html-form",

    title: "Forms",
    category: "HTML / Forms",

    summary:
      "The form element groups controls used to collect information from a user.",

    syntax: `<form>
  ...
</form>`,

    keywords: ["form", "input", "submit"],

    unlockAtMissionOrder: 8,
  },

  {
    id: "html-input",

    title: "Input",
    category: "HTML / Forms",

    summary:
      "The input element provides a field where the user can enter information.",

    syntax: `<input id="name">`,

    keywords: ["input", "field", "form"],

    unlockAtMissionOrder: 8,
  },

  {
    id: "html-label",

    title: "Label",
    category: "HTML / Forms",

    summary:
      "A label describes the purpose of a form control.",

    syntax: `<label for="name">Name</label>
<input id="name">`,

    notes: [
      "The for attribute should match the id of its form control.",
      "A form control may also be placed directly inside its label.",
    ],

    keywords: ["label", "for", "accessibility", "form"],

    unlockAtMissionOrder: 8,
  },

  {
    id: "html-textarea",

    title: "Textarea",
    category: "HTML / Forms",

    summary:
      "The textarea element provides a multi-line text input.",

    syntax: `<textarea id="message"></textarea>`,

    keywords: ["textarea", "message", "form"],

    unlockAtMissionOrder: 8,
  },

  {
    id: "html-button",

    title: "Button",
    category: "HTML / Forms",

    summary:
      "The button element represents an interactive button.",

    syntax: `<button>Send message</button>`,

    keywords: ["button", "submit", "form"],

    unlockAtMissionOrder: 8,
  },
  {
  id:
    "html-form-attributes",

  title:
    "Form Field Attributes",

  category:
    "HTML / Forms",

  summary:
    "Form controls use attributes to describe the data they contain and how the browser should validate it.",

  syntax: `<input
  name="email"
  type="email"
  required
>`,

  notes: [
    "name identifies a field when form data is submitted.",
    'type="email" enables browser validation appropriate for email addresses.',
    "required prevents form submission when a field is empty.",
  ],

  keywords: [
    "name",
    "required",
    "type",
    "email",
    "validation",
    "form",
  ],

  unlockAtMissionOrder:
    9,
  },
];