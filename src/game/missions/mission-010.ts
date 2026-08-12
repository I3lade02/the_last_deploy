import type { Mission } from "../../types/game";

export const mission010: Mission = {
  id: "html-010",

  act: 1,
  order: 10,

  title: "Accessibility Complaint",

  briefing: {
    ticketNumber: "#010",

    client:
      "Horizon Community Center",

    priority: "High",

    title:
      "Accessibility audit failed",

    description:
      "The client's homepage failed an accessibility review. The audit report is included in the project files. Review the report, inspect the existing markup and correct the reported issues without removing content.",
  },

  files: [
    {
      path: "index.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Horizon Community Center</title>
  </head>

  <body>
    <header>
      <h1>Horizon Community Center</h1>

      <nav>
        <a href="#about">About</a>
        <a href="#programs">Programs</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <section id="about">
        <h3>About Us</h3>

        <img
          src="assets/community-center.svg"
        >

        <p>
          Horizon Community Center provides activities,
          workshops and support for people of all ages.
        </p>
      </section>

      <section id="programs">
        <h2>Programs</h2>

        <ul>
          <li>After-school activities</li>
          <li>Community workshops</li>
          <li>Senior programs</li>
        </ul>
      </section>

      <section id="contacts">
        <h2>Contact</h2>

        <form>
          <label>Email address</label>
          <input id="email">

          <button>Send</button>
        </form>
      </section>
    </main>

    <footer>
      <p>© 2026 Horizon Community Center</p>
    </footer>
  </body>
</html>
`,
    },

    {
      path:
        "reports/accessibility-audit.txt",

      language:
        "plaintext",

      readOnly: true,

      content: `HORIZON COMMUNITY CENTER
ACCESSIBILITY REVIEW

Automated review completed.

4 issues require attention:

[HC-101]
Heading hierarchy contains a skipped level.

[HC-204]
An informative image does not provide alternative text.

[HC-310]
A form control does not have an associated label.

[HC-404]
One internal navigation link does not resolve to a page section.

Please correct the reported issues without removing page content.

-- Nullbyte Accessibility Audit
`,
    },
  ],

  assets: [
    {
      path:
        "assets/community-center.svg",

      runtimePath:
        "/mission-assets/horizon/assets/community-center.svg",

      type: "image",
    },
  ],

  objectives: [
    {
      id: "audit",

      label:
        "Resolve all accessibility audit issues",

      required: true,

      testIds: [
        "heading-hierarchy",
        "image-alt",
        "field-label",
        "navigation-targets",
      ],
    },
  ],

  testGroups: [
    {
      id:
        "accessibility-audit",

      label:
        "Accessibility audit",

      tests: [
        {
          id:
            "heading-hierarchy",

          label:
            "Heading hierarchy is valid",

          visibility:
            "visible",

          evaluate: {
            type:
              "headingOrderValid",
          },
        },

        {
          id:
            "image-alt",

          label:
            "Informative image has alternative text",

          visibility:
            "visible",

          evaluate: {
            type:
              "attributeNotBlank",

            selector:
              'img[src="assets/community-center.svg"]',

            attribute:
              "alt",
          },
        },

        {
          id:
            "field-label",

          label:
            "Form fields have associated labels",

          visibility:
            "visible",

          evaluate: {
            type:
              "allFieldsHaveLabels",

            selector:
              "form input, form textarea, form select",
          },
        },

        {
          id:
            "navigation-targets",

          label:
            "Internal navigation links resolve",

          visibility:
            "visible",

          evaluate: {
            type:
              "internalLinksResolve",

            selector:
              'nav a[href^="#"]',
          },
        },

        /**
         * Hidden tests make sure the player
         * fixes the page rather than deleting
         * problematic content.
         */

        {
          id:
            "navigation-preserved",

          label:
            "Navigation content preserved",

          visibility:
            "hidden",

          evaluate: {
            type:
              "elementCount",

            selector:
              "nav a",

            count: 3,
          },
        },

        {
          id:
            "image-preserved",

          label:
            "Community image preserved",

          visibility:
            "hidden",

          evaluate: {
            type:
              "elementExists",

            selector:
              'img[src="assets/community-center.svg"]',
          },
        },

        {
          id:
            "form-preserved",

          label:
            "Contact form preserved",

          visibility:
            "hidden",

          evaluate: {
            type:
              "elementExists",

            selector:
              "form input",
          },
        },

        {
          id:
            "sections-preserved",

          label:
            "Page sections preserved",

          visibility:
            "hidden",

          evaluate: {
            type:
              "elementCountAtLeast",

            selector:
              "main section",

            count: 3,
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
        "The audit report identifies four separate problems. Inspect each affected part of the document and compare it with patterns you have already used in previous tickets.",
    },

    {
      id:
        "hint-2",

      content:
        "Check heading levels, image accessibility, label association and whether each navigation href points to an existing id.",
    },

    {
      id:
        "hint-3",

      content:
        "You do not need any new HTML elements for this ticket. Every issue can be corrected using concepts from earlier tickets.",
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
        "Audit is green. Nice work.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "You fixed that faster than the person who originally built it.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "Please don't ask who originally built it.",
    },
  ],
};