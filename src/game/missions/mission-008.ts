import type { Mission } from "../../types/game";

export const mission008: Mission = {
  id: "html-008",

  act: 1,
  order: 8,

  title: "The Form",

  briefing: {
    ticketNumber: "#008",

    client:
      "Silverline Dental",

    priority: "High",

    title:
      "Restore contact form",

    description:
      "The clinic lost its contact form during a redesign. Rebuild it using the old specification: Name, Email, Message and a Send Message button.",
  },

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

        <!-- Restore the contact form here -->
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
      id: "form",

      label:
        "Create a contact form",

      required: true,

      testIds: [
        "form-exists",
      ],
    },

    {
      id: "fields",

      label:
        "Add Name, Email and Message fields",

      required: true,

      testIds: [
        "input-count",
        "textarea-exists",
      ],
    },

    {
      id: "labels",

      label:
        "Give every field a label",

      required: true,

      testIds: [
        "fields-have-labels",
      ],
    },

    {
      id: "button",

      label:
        "Add a Send Message button",

      required: true,

      testIds: [
        "button-exists",
        "button-text",
      ],
    },
  ],

  testGroups: [
    {
      id: "form",

      label:
        "Contact form",

      tests: [
        {
          id: "form-exists",

          label:
            "Form exists",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "form",
          },
        },

        {
          id: "input-count",

          label:
            "Form contains two input fields",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementCount",

            selector:
              "form input",

            count: 2,
          },
        },

        {
          id: "textarea-exists",

          label:
            "Form contains a message textarea",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "form textarea",
          },
        },

        {
          id: "button-exists",

          label:
            "Form contains a button",

          visibility:
            "visible",

          evaluate: {
            type:
              "elementExists",

            selector:
              "form button",
          },
        },

        {
          id: "button-text",

          label:
            'Button contains "Send Message"',

          visibility:
            "visible",

          evaluate: {
            type:
              "textContains",

            selector:
              "form button",

            value:
              "Send Message",
          },
        },

        {
          id: "fields-have-labels",

          label:
            "All form fields have associated labels",

          visibility:
            "visible",

          evaluate: {
            type:
              "allFieldsHaveLabels",

            selector:
              "form input, form textarea",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",

      content:
        "Forms group controls that collect information from a user. Each control should have a description.",
    },

    {
      id: "hint-2",

      content:
        "Look at form, input, textarea, label and button in the documentation.",
    },

    {
      id: "hint-3",

      content:
        "Labels can be explicitly connected to controls using matching for and id values.",

      code: `<label for="name">Name</label>
<input id="name">`,
    },
  ],

  completionMessages: [
    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials: "MC",

      content:
        "Nice. The clinic can receive messages again.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials: "MC",

      content:
        "I'm sure users will use this responsibly.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials: "MC",

      content:
        "Actually, I've worked with users before. Ignore that.",
    },
  ],
};