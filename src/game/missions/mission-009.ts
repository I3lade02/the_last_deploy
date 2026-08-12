import type { Mission } from "../../types/game";

export const mission009: Mission = {
  id: "html-009",

  act: 1,
  order: 9,

  title: "Required Fields",

  inheritWorkspaceFrom:
    "html-008",

  briefing: {
    ticketNumber: "#009",

    client:
      "Silverline Dental",

    priority: "High",

    title:
      "Blank contact requests",

    description:
      "The contact form is live, but users can submit it without providing any useful information. Add the missing field metadata and basic browser validation.",
  },

  /**
   * Used only when Mission #009 is launched
   * directly during development.
   *
   * Normally we inherit the player's own
   * Mission #008 solution.
   */
  files: [
    {
      path: "index.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Silverline Dental</title>
  </head>

  <body>
    <header>
      <h1>Silverline Dental</h1>
      <p>Modern dental care for the whole family.</p>
    </header>

    <main>
      <section>
        <h2>Contact Us</h2>

        <form>
          <label for="name">Name</label>
          <input id="name">

          <label for="email">Email</label>
          <input id="email">

          <label for="message">Message</label>
          <textarea id="message"></textarea>

          <button>Send Message</button>
        </form>
      </section>
    </main>

    <footer>
      <p>© 2026 Silverline Dental</p>
    </footer>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id:
        "field-names",

      label:
        "Give all contact fields a name",

      required: true,

      testIds: [
        "name-field-name",
        "email-field-name",
        "message-field-name",
      ],
    },

    {
      id:
        "email-type",

      label:
        "Use the correct input type for email",

      required: true,

      testIds: [
        "email-type",
      ],
    },

    {
      id:
        "required-fields",

      label:
        "Prevent empty contact requests",

      required: true,

      testIds: [
        "name-required",
        "email-required",
        "message-required",
      ],
    },
  ],

  testGroups: [
    {
      id:
        "field-metadata",

      label:
        "Field metadata",

      tests: [
        {
          id:
            "name-field-name",

          label:
            "Name field has a name attribute",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "name",
            ],

            attribute:
              "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "email-field-name",

          label:
            "Email field has a name attribute",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "email",
              "e-mail",
            ],

            attribute:
              "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "message-field-name",

          label:
            "Message field has a name attribute",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "message",
            ],

            attribute:
              "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "email-type",

          label:
            'Email field uses type="email"',

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "email",
              "e-mail",
            ],

            attribute:
              "type",

            mode:
              "equals",

            value:
              "email",
          },
        },
      ],
    },

    {
      id:
        "validation",

      label:
        "Validation",

      tests: [
        {
          id:
            "name-required",

          label:
            "Name is required",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "name",
            ],

            attribute:
              "required",

            mode:
              "exists",
          },
        },

        {
          id:
            "email-required",

          label:
            "Email is required",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "email",
              "e-mail",
            ],

            attribute:
              "required",

            mode:
              "exists",
          },
        },

        {
          id:
            "message-required",

          label:
            "Message is required",

          visibility:
            "visible",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "message",
            ],

            attribute:
              "required",

            mode:
              "exists",
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
        "Form controls often need metadata that tells the browser what information they contain and whether it must be provided.",
    },

    {
      id:
        "hint-2",

      content:
        "Look at the name, type and required attributes. Email inputs also have a dedicated input type.",
    },

    {
      id:
        "hint-3",

      content:
        "A required email field could look like this:",

      code: `<input
  id="email"
  name="email"
  type="email"
  required
>`,
    },
  ],

  completionMessages: [
    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "Perfect. Users can no longer submit a completely empty form.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials:
        "MC",

      content:
        "I'm sure they'll discover a more creative way to break it eventually.",
    },
  ],
};