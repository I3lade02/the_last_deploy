import type { Mission } from "../../types/game";

export const mission001: Mission = {
  id: "html-001",

  act: 1,
  order: 1,

  title: "Hello, World. Unfortunately.",

  briefing: {
    ticketNumber: "#001",
    client: "GreenBean Café",
    priority: "High",
    title: "Missing company heading",
    description:
      'The company name disappeared after yesterday\'s update. Restore the main heading and make sure it displays "GreenBean Café".',
  },

  files: [
    {
      path: "index.html",
      language: "html",
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GreenBean Café</title>
  </head>

  <body>
    GreenBean Café

    <p>Fresh coffee every morning.</p>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "main-heading",
      label: "Create a main heading",
      required: true,
      testIds: ["main-heading-exists"],
    },
    {
      id: "company-name",
      label: 'The heading contains "GreenBean Café"',
      required: true,
      testIds: ["main-heading-text"],
    },
  ],

  testGroups: [
    {
      id: "requirements",
      label: "Client requirements",

      tests: [
        {
          id: "main-heading-exists",
          label: "Main heading exists",
          visibility: "visible",

          evaluate: {
            type: "elementExists",
            selector: "h1",
          },
        },

        {
          id: "main-heading-text",
          label: "Main heading contains company name",
          visibility: "visible",

          evaluate: {
            type: "textContains",
            selector: "h1",
            value: "GreenBean Café",
          },
        },

        {
          id: "single-main-heading",
          label: "Page contains one main heading",
          visibility: "hidden",

          evaluate: {
            type: "elementCount",
            selector: "h1",
            count: 1,
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",
      content:
        "HTML provides different elements for different kinds of content. The most important heading on a page has its own element.",
    },

    {
      id: "hint-2",
      content: "The main heading element is <h1>.",
    },

    {
      id: "hint-3",
      content:
        "A heading contains its text between an opening and closing tag.",
      code: "<h1>GreenBean Café</h1>",
    },
  ],

  completionMessages: [
    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",
      content:
        "Nice. You have officially modified production code.",
    },
    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",
      content:
        "Try not to think about that too much.",
    },
  ],
};