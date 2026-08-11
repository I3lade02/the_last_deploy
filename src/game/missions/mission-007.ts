import type { Mission } from "../../types/game";

export const mission007: Mission = {
  id: "html-007",

  act: 1,
  order: 7,

  title: "Navigation Error",

  inheritWorkspaceFrom:
    "html-006",

  briefing: {
    ticketNumber: "#007",

    client:
      "Northshore Architecture",

    priority: "Medium",

    title:
      "Add page navigation",

    description:
      "The structure is cleaned up. Now visitors need a way to jump between About, Projects and Contact.",
  },

  /**
   * Fallback only.
   *
   * Normally the player enters this mission
   * with their completed Mission #006 workspace.
   */
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
    <header>
      <h1>Northshore Architecture</h1>
      <p>Designing thoughtful spaces for modern life.</p>
    </header>

    <main>
      <section>
        <h2>About Us</h2>
        <p>
          We are an independent architecture studio focused on
          residential and public spaces.
        </p>
      </section>

      <section>
        <h2>Selected Projects</h2>
        <p>
          Harbour House, Northshore Library and the Riverside Pavilion.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>hello@northshore.example</p>
      </section>
    </main>

    <footer>
      <p>© 2026 Northshore Architecture</p>
    </footer>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "nav",

      label:
        "Create a navigation section",

      required: true,

      testIds: [
        "nav-exists",
      ],
    },

    {
      id: "targets",

      label:
        "Create targets for About, Projects and Contact",

      required: true,

      testIds: [
        "about-target",
        "projects-target",
        "contact-target",
      ],
    },

    {
      id: "links",

      label:
        "Link navigation to all three sections",

      required: true,

      testIds: [
        "about-link",
        "projects-link",
        "contact-link",
      ],
    },
  ],

  testGroups: [
    {
      id: "navigation",

      label: "Navigation",

      tests: [
        {
          id: "nav-exists",

          label:
            "Navigation exists",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector: "nav",
          },
        },

        {
          id: "about-target",

          label:
            "About section has a navigation target",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "#about",
          },
        },

        {
          id: "projects-target",

          label:
            "Projects section has a navigation target",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "#projects",
          },
        },

        {
          id: "contact-target",

          label:
            "Contact section has a navigation target",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "#contact",
          },
        },

        {
          id: "about-link",

          label:
            "Navigation links to About",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              'nav a[href="#about"]',
          },
        },

        {
          id: "projects-link",

          label:
            "Navigation links to Projects",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              'nav a[href="#projects"]',
          },
        },

        {
          id: "contact-link",

          label:
            "Navigation links to Contact",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              'nav a[href="#contact"]',
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",

      content:
        "Links can point to specific locations inside the current document.",
    },

    {
      id: "hint-2",

      content:
        "Give each target section an id, then use that id in an anchor href beginning with #.",
    },

    {
      id: "hint-3",

      content:
        "A navigation link can point to an element with a matching id.",

      code: `<nav>
  <a href="#about">About</a>
</nav>

<section id="about">
  ...
</section>`,
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
        "Great. Now users can move through the page without scrolling around like they're searching for buried treasure.",
    },
  ],
};