import type { Mission } from "../../types/game";

export const mission013: Mission = {
  id: "css-013",

  act: 2,
  order: 13,

  title:
    "It Works. Technically.",

  /**
   * Continue directly from the website
   * the player created in Mission #012.
   */
  inheritWorkspaceFrom:
    "html-012",

  briefing: {
    ticketNumber:
      "#013",

    client:
      "Westerly Bike Workshop",

    priority:
      "Medium",

    title:
      "Apply first design pass",

    description:
      "The HTML review passed. Sophie has supplied the first design handoff. Connect the new stylesheet to the site and apply the requested base appearance.",
  },

  files: [
    /**
     * ------------------------------------------------
     * HTML FALLBACKS
     *
     * Normally replaced by the player's own
     * workspace inherited from Mission #012.
     * ------------------------------------------------
     */

    {
      path:
        "index.html",

      language:
        "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Westerly Bike Workshop</title>
  </head>

  <body>
    <header>
      <h1>Westerly Bike Workshop</h1>

      <nav>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <main>
      <p>
        Independent bicycle repairs and servicing in Bristol.
      </p>

      <img
        src="assets/workshop.svg"
        alt="Westerly Bike Workshop"
      >
    </main>

    <footer>
      <p>Westerly Bike Workshop</p>
    </footer>
  </body>
</html>
`,
    },

    {
      path:
        "services.html",

      language:
        "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Services | Westerly Bike Workshop</title>
  </head>

  <body>
    <header>
      <h1>Services</h1>

      <nav>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <main>
      <ul>
        <li>Repairs</li>
        <li>Safety checks</li>
        <li>Full servicing</li>
      </ul>
    </main>

    <footer>
      <p>Westerly Bike Workshop</p>
    </footer>
  </body>
</html>
`,
    },

    {
      path:
        "contact.html",

      language:
        "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Contact | Westerly Bike Workshop</title>
  </head>

  <body>
    <header>
      <h1>Contact</h1>

      <nav>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <main>
      <a href="mailto:hello@westerly.example">
        hello@westerly.example
      </a>

      <form>
        <label for="name">
          Name
        </label>

        <input
          id="name"
          name="name"
          required
        >

        <label for="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
        >

        <label for="message">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          required
        ></textarea>

        <button>
          Send Message
        </button>
      </form>
    </main>

    <footer>
      <p>Westerly Bike Workshop</p>
    </footer>
  </body>
</html>
`,
    },

    /**
     * ------------------------------------------------
     * NEW CSS FILE
     * ------------------------------------------------
     */

    {
      path:
        "styles.css",

      language:
        "css",

      content: `/*
 * Westerly Bike Workshop
 * First design pass
 */

`,
    },

    /**
     * ------------------------------------------------
     * DESIGN HANDOFF
     * ------------------------------------------------
     */

    {
      path:
        "design/base-style.txt",

      language:
        "plaintext",

      readOnly: true,

      content: `WESTERLY BIKE WORKSHOP
BASE STYLE HANDOFF

Sophie Laurent
UI/UX

Apply the following base styles across the site.


PAGE

Background:
#0b1220

Default text:
#e5e7eb

Typography:
Arial with a sans-serif fallback


PRIMARY HEADINGS

Color:
#f59e0b


NOTES

This is only the base styling pass.

Spacing and layout will be handled separately.

-- Sophie
`,
    },
  ],

  assets: [
    {
      path:
        "assets/workshop.svg",

      runtimePath:
        "/mission-assets/westerly/assets/workshop.svg",

      type:
        "image",
    },
  ],

  objectives: [
    {
      id:
        "stylesheet",

      label:
        "Connect styles.css to every page",

      required: true,

      testIds: [
        "home-stylesheet",
        "services-stylesheet",
        "contact-stylesheet",
      ],
    },

    {
      id:
        "base-colors",

      label:
        "Apply the requested page colors",

      required: true,

      testIds: [
        "body-background",
        "body-color",
      ],
    },

    {
      id:
        "typography",

      label:
        "Apply the requested typography",

      required: true,

      testIds: [
        "body-font-arial",
        "body-font-fallback",
      ],
    },

    {
      id:
        "headings",

      label:
        "Apply the heading accent color",

      required: true,

      testIds: [
        "heading-color",
      ],
    },
  ],

  testGroups: [
    /**
     * ------------------------------------------------
     * STYLESHEET CONNECTION
     * ------------------------------------------------
     */

    {
      id:
        "stylesheet-connection",

      label:
        "Stylesheet",

      tests: [
        {
          id:
            "home-stylesheet",

          label:
            "Home loads styles.css",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'link[rel~="stylesheet"][href="styles.css"], link[rel~="stylesheet"][href="./styles.css"]',
          },
        },

        {
          id:
            "services-stylesheet",

          label:
            "Services loads styles.css",

          visibility:
            "visible",

          filePath:
            "services.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'link[rel~="stylesheet"][href="styles.css"], link[rel~="stylesheet"][href="./styles.css"]',
          },
        },

        {
          id:
            "contact-stylesheet",

          label:
            "Contact loads styles.css",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'link[rel~="stylesheet"][href="styles.css"], link[rel~="stylesheet"][href="./styles.css"]',
          },
        },
      ],
    },

    /**
     * ------------------------------------------------
     * BASE CSS
     * ------------------------------------------------
     */

    {
      id:
        "base-style",

      label:
        "Base styling",

      tests: [
        {
          id:
            "body-background",

          label:
            "Page background matches the handoff",

          visibility:
            "visible",

          filePath:
            "styles.css",

          evaluate: {
            type:
              "cssProperty",

            selector:
              "body",

            property:
              "background-color",

            mode:
              "equals",

            value:
              "#0b1220",
          },
        },

        {
          id:
            "body-color",

          label:
            "Default text color matches the handoff",

          visibility:
            "visible",

          filePath:
            "styles.css",

          evaluate: {
            type:
              "cssProperty",

            selector:
              "body",

            property:
              "color",

            mode:
              "equals",

            value:
              "#e5e7eb",
          },
        },

        {
          id:
            "body-font-arial",

          label:
            "Typography includes Arial",

          visibility:
            "visible",

          filePath:
            "styles.css",

          evaluate: {
            type:
              "cssProperty",

            selector:
              "body",

            property:
              "font-family",

            mode:
              "contains",

            value:
              "arial",
          },
        },

        {
          id:
            "body-font-fallback",

          label:
            "Typography includes a sans-serif fallback",

          visibility:
            "hidden",

          filePath:
            "styles.css",

          evaluate: {
            type:
              "cssProperty",

            selector:
              "body",

            property:
              "font-family",

            mode:
              "contains",

            value:
              "sans-serif",
          },
        },

        {
          id:
            "heading-color",

          label:
            "Primary heading color matches the handoff",

          visibility:
            "visible",

          filePath:
            "styles.css",

          evaluate: {
            type:
              "cssProperty",

            selector:
              "h1",

            property:
              "color",

            mode:
              "equals",

            value:
              "#f59e0b",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id:
        "hint-1",

      content:
        "HTML describes the page structure. CSS describes how that structure should look. Start by connecting the stylesheet to the HTML documents.",
    },

    {
      id:
        "hint-2",

      content:
        "Use an external stylesheet link inside each document head, then create CSS rules for body and h1.",
    },

    {
      id:
        "hint-3",

      content:
        "A CSS rule consists of a selector followed by declarations.",

      code: `body {
  property: value;
}`,
    },
  ],

  preview: {
    entryFile:
      "index.html",
  },

  completionMessages: [
    {
      sender:
        "Sophie Laurent",

      role:
        "UI/UX Designer",

      initials:
        "SL",

      content:
        "There we go.",
    },

    {
      sender:
        "Sophie Laurent",

      role:
        "UI/UX Designer",

      initials:
        "SL",

      content:
        "It worked before.",
    },

    {
      sender:
        "Sophie Laurent",

      role:
        "UI/UX Designer",

      initials:
        "SL",

      content:
        "Now it doesn't look like a document somebody forgot to finish in 1997.",
    },
  ],
};