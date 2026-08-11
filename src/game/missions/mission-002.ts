import type { Mission } from "../../types/game";

export const mission002: Mission = {
  id: "html-002",

  act: 1,
  order: 2,

  title: "Paragraph Pending",

  briefing: {
    ticketNumber: "#002",
    client: "Northwind Hiking Club",
    priority: "Medium",
    title: "Content structure",
    description:
      "The client added new content, but everything is currently rendered as one unstructured block. Give the page a clear structure.",
  },

  files: [
    {
      path: "index.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Northwind Hiking Club</title>
  </head>

  <body>
    <h1>Northwind Hiking Club</h1>

    About Us
    We organize weekend hiking trips for beginners and experienced hikers.

    Upcoming Trips
    Our next trip takes place on Saturday.
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "secondary-headings",
      label: "Create headings for both sections",
      required: true,
      testIds: [
        "secondary-heading-count",
        "secondary-heading-text",
      ],
    },

    {
      id: "paragraphs",
      label: "Place both descriptions inside paragraphs",
      required: true,
      testIds: [
        "paragraph-count",
        "paragraph-text",
      ],
    },
  ],

  testGroups: [
    {
      id: "structure",
      label: "Page structure",

      tests: [
        {
          id: "secondary-heading-count",
          label: "Page contains two secondary headings",
          visibility: "visible",

          evaluate: {
            type: "elementCount",
            selector: "h2",
            count: 2,
          },
        },

        {
          id: "secondary-heading-text",
          label:
            'Secondary headings contain "About Us" and "Upcoming Trips"',
          visibility: "visible",

          evaluate: {
            type: "elementsContainTexts",
            selector: "h2",
            values: [
              "About Us",
              "Upcoming Trips",
            ],
          },
        },

        {
          id: "paragraph-count",
          label: "Both descriptions use paragraph elements",
          visibility: "visible",

          evaluate: {
            type: "elementCount",
            selector: "p",
            count: 2,
          },
        },

        {
          id: "paragraph-text",
          label: "Description content is preserved",
          visibility: "hidden",

          evaluate: {
            type: "elementsContainTexts",
            selector: "p",

            values: [
              "We organize weekend hiking trips for beginners and experienced hikers.",
              "Our next trip takes place on Saturday.",
            ],
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",
      content:
        "A page can have one primary heading and several secondary headings for individual sections.",
    },

    {
      id: "hint-2",
      content:
        "Use <h2> for the two section titles and <p> for normal text.",
    },

    {
      id: "hint-3",
      content:
        "A basic section could contain a heading followed by a paragraph.",
      code: `<h2>Section title</h2>
<p>Section content</p>`,
    },
  ],

  completionMessages: [
    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content:
        'Client says it looks "more professional." Nobody knows exactly what that means.',
    },

    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content: "Ticket closed.",
    },
  ],
};