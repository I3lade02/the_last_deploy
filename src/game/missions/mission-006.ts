import type { Mission } from "../../types/game";

export const mission006: Mission = {
  id: "html-006",

  act: 1,
  order: 6,

  title: "Divide and Conquer",

  briefing: {
    ticketNumber: "#006",

    client:
      "Northshore Architecture",

    priority: "Medium",

    title:
      "Clean up page structure",

    description:
      "The page works, but the document has almost no meaningful structure. Organize the content before design work begins.",
  },

  files: [
    {
      path: "index.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Northshore Architecture</title>
  </head>

  <body>
    <h1>Northshore Architecture</h1>

    <p>Designing thoughtful spaces for modern life.</p>

    <h2>About Us</h2>

    <p>
      We are an independent architecture studio focused on
      residential and public spaces.
    </p>

    <h2>Selected Projects</h2>

    <p>
      Harbour House, Northshore Library and the Riverside Pavilion.
    </p>

    <h2>Contact</h2>

    <p>
      hello@northshore.example
    </p>

    <p>© 2026 Northshore Architecture</p>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "header",
      label:
        "Create a page header",

      required: true,

      testIds: [
        "header-exists",
      ],
    },

    {
      id: "main",
      label:
        "Place the primary content inside main",

      required: true,

      testIds: [
        "main-exists",
        "sections-inside-main",
      ],
    },

    {
      id: "footer",
      label:
        "Create a page footer",

      required: true,

      testIds: [
        "footer-exists",
      ],
    },
  ],

  testGroups: [
    {
      id: "semantic-structure",

      label:
        "Semantic structure",

      tests: [
        {
          id: "header-exists",

          label:
            "Header exists",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "header",
          },
        },

        {
          id: "main-exists",

          label:
            "Main content exists",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "main",
          },
        },

        {
          id: "sections-inside-main",

          label:
            "Main contains meaningful sections",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementCountAtLeast",

            selector:
              "main section",

            count: 2,
          },
        },

        {
          id: "footer-exists",

          label:
            "Footer exists",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "footer",
          },
        },

        {
          id: "single-main",

          label:
            "Document contains one main element",

          visibility:
            "hidden",

          evaluate: {
            type:
              "elementCount",

            selector:
              "main",

            count: 1,
          },
        },

        {
          id: "copyright-preserved",

          label:
            "Footer content is preserved",

          visibility:
            "hidden",

          evaluate: {
            type:
              "textContains",

            selector:
              "footer",

            value:
              "© 2026 Northshore Architecture",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",

      content:
        "HTML includes semantic elements for introductory content, primary content, thematic sections and footer information.",
    },

    {
      id: "hint-2",

      content:
        "Look at header, main, section and footer in the documentation.",
    },

    {
      id: "hint-3",

      content:
        "A typical semantic page can place sections inside its main element.",

      code: `<header>
  ...
</header>

<main>
  <section>
    ...
  </section>
</main>

<footer>
  ...
</footer>`,
    },
  ],

  completionMessages: [
    {
      sender:
        "Sophie Laurent",

      role:
        "UI/UX Designer",

      initials: "SL",

      content:
        "Much better. Now I can actually tell which parts of the page are supposed to be which.",
    },

    {
      sender:
        "Sophie Laurent",

      role:
        "UI/UX Designer",

      initials: "SL",

      content:
        "And no, wrapping everything in seventeen divs would not have counted.",
    },
  ],
};