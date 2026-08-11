import type { Mission } from "../../types/game";

export const mission003: Mission = {
  id: "html-003",

  act: 1,
  order: 3,

  title: "The Missing Link",

  briefing: {
    ticketNumber: "#003",
    client: "Bella Napoli",
    priority: "Medium",
    title: "Menu link does nothing",

    description:
      'The restaurant added a "View our menu" message, but visitors cannot actually open the menu page.',
  },

  files: [
    {
      path: "index.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bella Napoli</title>
  </head>

  <body>
    <h1>Bella Napoli</h1>

    <p>Traditional Italian food since 1987.</p>

    <p>View our menu</p>
  </body>
</html>
`,
    },

    {
      path: "menu.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bella Napoli - Menu</title>
  </head>

  <body>
    <h1>Our Menu</h1>

    <h2>Pizza Margherita</h2>
    <p>Tomato, mozzarella and fresh basil.</p>

    <h2>Spaghetti Carbonara</h2>
    <p>Pasta, egg, pecorino and black pepper.</p>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "menu-link",
      label: "Turn the menu text into a working link",
      required: true,

      testIds: [
        "link-exists",
        "link-text",
        "link-destination",
      ],
    },
  ],

  testGroups: [
    {
      id: "navigation",
      label: "Navigation",

      tests: [
        {
          id: "link-exists",
          label: "Page contains a link",
          visibility: "visible",

          evaluate: {
            type: "elementExists",
            selector: "a",
          },
        },

        {
          id: "link-text",
          label: 'Link contains "View our menu"',
          visibility: "visible",

          evaluate: {
            type: "textContains",
            selector: "a",
            value: "View our menu",
          },
        },

        {
          id: "link-destination",
          label: "Link points to menu.html",
          visibility: "visible",

          evaluate: {
            type: "attributeEquals",
            selector: "a",
            attribute: "href",
            value: "menu.html",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",
      content:
        "HTML uses an anchor element when the user should be able to navigate somewhere.",
    },

    {
      id: "hint-2",
      content:
        "Anchor elements use the href attribute to define their destination.",
    },

    {
      id: "hint-3",
      content:
        "The destination in this project is the existing menu.html file.",
      code: `<a href="menu.html">View our menu</a>`,
    },
  ],

  completionMessages: [
    {
      sender: "Maya Chen",
      role: "Project Manager",
      initials: "MC",

      content:
        "The client can now reach the menu. Excellent breakthrough in restaurant technology.",
    },
  ],
};