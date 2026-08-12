import type { Mission } from "../../types/game";

export const mission011: Mission = {
  id: "html-011",

  act: 1,
  order: 11,

  title: "Legacy",

  briefing: {
    ticketNumber: "#011",

    client:
      "Arcadia Living",

    priority: "Low",

    title:
      "Update old contact details",

    description:
      "Arcadia still has an older site in maintenance. Their support address has changed. Update the contact email everywhere it appears in the editable project files. Do not remove existing page content.",
  },

  files: [
    {
      path: "index.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Arcadia Living</title>
  </head>

  <body>
    <header>
      <img
        src="assets/arcadia-logo.svg"
        alt="Arcadia Living"
      >

      <h1>Arcadia Living</h1>

      <nav>
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <main>
      <section>
        <h2>Homes designed around people.</h2>

        <p>
          Arcadia Living develops residential spaces
          across the United Kingdom.
        </p>
      </section>

      <section>
        <h2>Need help?</h2>

        <p>
          Our support team is available at
          <a href="mailto:support@arcadia-old.example">
            support@arcadia-old.example
          </a>.
        </p>
      </section>
    </main>

    <!-- DN: why is Project 41 loading this? -->

    <script src="scripts/analytics-legacy.js"></script>

    <footer>
      <p>© 2026 Arcadia Living</p>
    </footer>
  </body>
</html>
`,
    },

    {
      path: "contact.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact | Arcadia Living</title>
  </head>

  <body>
    <header>
      <h1>Contact Arcadia Living</h1>

      <nav>
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <main>
      <section>
        <h2>Customer Support</h2>

        <p>
          Email:
          <a href="mailto:support@arcadia-old.example">
            support@arcadia-old.example
          </a>
        </p>

        <p>
          Monday to Friday, 09:00–17:00
        </p>
      </section>

      <section>
        <h2>Office</h2>

        <p>
          17 Northbank Road<br>
          London
        </p>
      </section>
    </main>

    <script src="scripts/analytics-legacy.js"></script>

    <footer>
      <p>© 2026 Arcadia Living</p>
    </footer>
  </body>
</html>
`,
    },

    {
      path:
        "scripts/analytics-legacy.js",

      language:
        "javascript",

      readOnly: true,

      content: `/**
 * Nullbyte Analytics
 * Legacy compatibility loader
 *
 * Project: arcadia-17
 *
 * Maintainer: D. Novak
 */

(function () {
  const projectId = "arcadia-17";

  const options = {
    telemetry: true,
    sessionTracking: true,
    p41: true,
  };

  window.__nullbyteAnalytics = {
    projectId,
    options,
  };

  const script =
    document.createElement("script");

  script.src =
    "/internal/telemetry/client.js";

  script.dataset.project =
    projectId;

  document.head.appendChild(
    script,
  );
})();
`,
    },
  ],

  assets: [
    {
      path:
        "assets/arcadia-logo.svg",

      runtimePath:
        "/mission-assets/arcadia/assets/arcadia-logo.svg",

      type: "image",
    },
  ],

  objectives: [
    {
      id:
        "homepage-contact",

      label:
        "Update the support email on the homepage",

      required: true,

      testIds: [
        "homepage-email-text",
        "homepage-email-link",
      ],
    },

    {
      id:
        "contact-page",

      label:
        "Update the support email on the contact page",

      required: true,

      testIds: [
        "contact-email-text",
        "contact-email-link",
      ],
    },
  ],

  testGroups: [
    {
      id:
        "contact-update",

      label:
        "Contact update",

      tests: [
        {
          id:
            "homepage-email-text",

          label:
            "Homepage shows the new support email",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "textContains",

            selector:
              "body",

            value:
              "help@arcadialiving.example",
          },
        },

        {
          id:
            "homepage-email-link",

          label:
            "Homepage email link is updated",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'a[href="mailto:help@arcadialiving.example"]',
          },
        },

        {
          id:
            "contact-email-text",

          label:
            "Contact page shows the new support email",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "textContains",

            selector:
              "body",

            value:
              "help@arcadialiving.example",
          },
        },

        {
          id:
            "contact-email-link",

          label:
            "Contact page email link is updated",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'a[href="mailto:help@arcadialiving.example"]',
          },
        },

        {
          id:
            "old-homepage-email-removed",

          label:
            "Old homepage contact removed",

          visibility:
            "hidden",

          filePath:
            "index.html",

          evaluate: {
            type:
              "textNotContains",

            selector:
              "body",

            value:
              "support@arcadia-old.example",
          },
        },

        {
          id:
            "old-contact-email-removed",

          label:
            "Old contact page contact removed",

          visibility:
            "hidden",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "textNotContains",

            selector:
              "body",

            value:
              "support@arcadia-old.example",
          },
        },

        {
          id:
            "homepage-script-preserved",

          label:
            "Legacy integration preserved",

          visibility:
            "hidden",

          filePath:
            "index.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'script[src="scripts/analytics-legacy.js"]',
          },
        },

        {
          id:
            "contact-script-preserved",

          label:
            "Legacy integration preserved",

          visibility:
            "hidden",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'script[src="scripts/analytics-legacy.js"]',
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
        "The project contains more than one editable HTML document. Search both pages for the old support address.",
    },

    {
      id:
        "hint-2",

      content:
        "Remember that the visible text and the destination of an email link are separate parts of the HTML.",
    },

    {
      id:
        "hint-3",

      content:
        "For an email link, both the text and mailto destination should use the new address.",

      code: `<a href="mailto:help@arcadialiving.example">
  help@arcadialiving.example
</a>`,
    },
  ],

  preview: {
    entryFile:
      "index.html",
  },

  completionMessages: [
    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "Arcadia is updated. Thanks.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "That one was sitting in the backlog for a while.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "Daniel used to handle most of their maintenance work.",
    },
  ],
};