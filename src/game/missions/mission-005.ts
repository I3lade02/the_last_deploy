import type { Mission } from "../../types/game";

export const mission005: Mission = {
  id: "html-005",

  act: 1,
  order: 5,

  title: "Terms and Conditions Apply",

  briefing: {
    ticketNumber: "#005",
    client: "ClearWater Insurance",
    priority: "Medium",
    title: "Service lists need structure",

    description:
      "The page contains several groups of related information, but everything is currently written as separate paragraphs. Use meaningful HTML structures.",
  },

  files: [
    {
      path: "index.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ClearWater Insurance</title>
  </head>

  <body>
    <h1>ClearWater Insurance</h1>

    <h2>Our Services</h2>

    <p>Home insurance</p>
    <p>Travel insurance</p>
    <p>Vehicle insurance</p>

    <h2>How to file a claim</h2>

    <p>Contact our support team</p>
    <p>Provide your policy number</p>
    <p>Send the required documents</p>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "services-list",
      label: "Turn the services into an unordered list",
      required: true,

      testIds: [
        "unordered-list",
        "service-items",
      ],
    },

    {
      id: "claim-steps",
      label: "Turn the claim process into an ordered list",
      required: true,

      testIds: [
        "ordered-list",
        "claim-items",
      ],
    },
  ],

  testGroups: [
    {
      id: "lists",
      label: "Lists",

      tests: [
        {
          id: "unordered-list",
          label: "Services use an unordered list",
          visibility: "visible",

          evaluate: {
            type: "elementExists",
            selector: "ul",
          },
        },

        {
          id: "service-items",
          label: "Service list contains three items",
          visibility: "visible",

          evaluate: {
            type: "elementCount",
            selector: "ul > li",
            count: 3,
          },
        },

        {
          id: "ordered-list",
          label: "Claim process uses an ordered list",
          visibility: "visible",

          evaluate: {
            type: "elementExists",
            selector: "ol",
          },
        },

        {
          id: "claim-items",
          label: "Claim process contains three steps",
          visibility: "visible",

          evaluate: {
            type: "elementCount",
            selector: "ol > li",
            count: 3,
          },
        },

        {
          id: "content-preserved",
          label: "Required content is preserved",
          visibility: "hidden",

          evaluate: {
            type: "elementsContainTexts",
            selector: "li",

            values: [
              "Home insurance",
              "Travel insurance",
              "Vehicle insurance",
              "Contact our support team",
              "Provide your policy number",
              "Send the required documents",
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
        "Some lists represent items without a particular order. Others represent steps where order matters.",
    },

    {
      id: "hint-2",
      content:
        "Use <ul> for the services and <ol> for the claim process. Individual items use <li>.",
    },

    {
      id: "hint-3",
      content:
        "Lists contain individual list-item elements.",
      code: `<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`,
    },
  ],

  completionMessages: [
    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content: "Five tickets.",
    },

    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content: "Still alive?",
    },

    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content: "Good. I've got something slightly bigger.",
    },
  ],
};