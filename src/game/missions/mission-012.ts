import type { Mission } from "../../types/game";

export const mission012: Mission = {
  id: "html-012",

  act: 1,
  order: 12,

  title: "First Week",

  briefing: {
    ticketNumber: "#012",

    client:
      "Westerly Bike Workshop",

    priority: "High",

    title:
      "Build new client website",

    description:
      "Westerly needs a small website ready for review. The client brief and supplied artwork are included in the project. Build the requested pages and make sure the site is usable before submitting it.",
  },

  files: [
    {
      path:
        "brief/client-brief.txt",

      language:
        "plaintext",

      readOnly: true,

      content: `WESTERLY BIKE WORKSHOP
CLIENT WEBSITE BRIEF

PROJECT

Create a small three-page website for Westerly Bike Workshop.

Required pages:

- Home
- Services
- Contact


SITE-WIDE REQUIREMENTS

Every page should:

- use meaningful HTML page structure
- contain one primary heading
- provide navigation between Home, Services and Contact


HOME

Introduce the business using:

Westerly Bike Workshop

Independent bicycle repairs and servicing in Bristol.

Use the supplied workshop image.
The image must provide a useful text alternative.


SERVICES

Present the following services as a list:

- Repairs
- Safety checks
- Full servicing


CONTACT

Show the contact email:

hello@westerly.example

Provide a contact form containing:

- Name
- Email
- Message

Every field must:

- have a label
- have a name
- be required

The email field should use browser email validation.

Include a button for submitting the form.


DESIGN

No visual styling is required at this stage.

The design team will begin once the HTML structure is approved.


-- Client Brief
`,
    },

    {
      path: "index.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Westerly Bike Workshop</title>
  </head>

  <body>
    <!-- Build the homepage from the client brief. -->
  </body>
</html>
`,
    },

    {
      path: "services.html",

      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Services | Westerly Bike Workshop</title>
  </head>

  <body>
    <!-- Build the services page from the client brief. -->
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
    <title>Contact | Westerly Bike Workshop</title>
  </head>

  <body>
    <!-- Build the contact page from the client brief. -->
  </body>
</html>
`,
    },
  ],

  assets: [
    {
      path:
        "assets/workshop.svg",

      runtimePath:
        "/mission-assets/westerly/assets/workshop.svg",

      type: "image",
    },
  ],

  objectives: [
    {
      id:
        "site-structure",

      label:
        "Build all three pages with meaningful structure",

      required: true,

      testIds: [
        "home-structure",
        "services-structure",
        "contact-structure",

        "home-heading",
        "services-heading",
        "contact-heading",
      ],
    },

    {
      id:
        "navigation",

      label:
        "Connect all pages with navigation",

      required: true,

      testIds: [
        "home-navigation",
        "services-navigation",
        "contact-navigation",
      ],
    },

    {
      id:
        "home-content",

      label:
        "Complete the homepage from the client brief",

      required: true,

      testIds: [
        "home-name",
        "home-introduction",
        "home-image",
        "home-image-alt",
      ],
    },

    {
      id:
        "services-content",

      label:
        "Present the requested services",

      required: true,

      testIds: [
        "services-list",
      ],
    },

    {
      id:
        "contact",

      label:
        "Build the requested contact page and form",

      required: true,

      testIds: [
        "contact-email",
        "contact-form",
        "contact-labels",

        "name-field-name",
        "email-field-name",
        "message-field-name",

        "name-required",
        "email-required",
        "message-required",

        "email-type",
        "submit-button",
      ],
    },
  ],

  testGroups: [
    /**
     * ------------------------------------------------
     * HOME
     * ------------------------------------------------
     */
    {
      id: "home",

      label:
        "Home page",

      tests: [
        {
          id:
            "home-structure",

          label:
            "Home page has semantic structure",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              "header",
              "main",
              "footer",
            ],
          },
        },

        {
          id:
            "home-heading",

          label:
            "Home page has one primary heading",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "elementCount",

            selector: "h1",

            count: 1,
          },
        },

        {
          id:
            "home-name",

          label:
            "Business name is present",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "textContains",

            selector: "body",

            value:
              "Westerly Bike Workshop",
          },
        },

        {
          id:
            "home-introduction",

          label:
            "Client introduction is present",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "textContains",

            selector: "body",

            value:
              "Independent bicycle repairs and servicing in Bristol.",
          },
        },

        {
          id:
            "home-image",

          label:
            "Supplied workshop image is used",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'img[src="assets/workshop.svg"]',
          },
        },

        {
          id:
            "home-image-alt",

          label:
            "Workshop image has alternative text",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "attributeNotBlank",

            selector:
              'img[src="assets/workshop.svg"]',

            attribute: "alt",
          },
        },
      ],
    },

    /**
     * ------------------------------------------------
     * SERVICES
     * ------------------------------------------------
     */
    {
      id:
        "services",

      label:
        "Services page",

      tests: [
        {
          id:
            "services-structure",

          label:
            "Services page has semantic structure",

          visibility:
            "visible",

          filePath:
            "services.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              "header",
              "main",
              "footer",
            ],
          },
        },

        {
          id:
            "services-heading",

          label:
            "Services page has one primary heading",

          visibility:
            "visible",

          filePath:
            "services.html",

          evaluate: {
            type:
              "elementCount",

            selector: "h1",

            count: 1,
          },
        },

        {
          id:
            "services-list",

          label:
            "Requested services are presented as a list",

          visibility:
            "visible",

          filePath:
            "services.html",

          evaluate: {
            type:
              "elementsContainTexts",

            selector:
              "main li",

            values: [
              "Repairs",
              "Safety checks",
              "Full servicing",
            ],
          },
        },
      ],
    },

    /**
     * ------------------------------------------------
     * CONTACT
     * ------------------------------------------------
     */
    {
      id: "contact",

      label:
        "Contact page",

      tests: [
        {
          id:
            "contact-structure",

          label:
            "Contact page has semantic structure",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              "header",
              "main",
              "footer",
            ],
          },
        },

        {
          id:
            "contact-heading",

          label:
            "Contact page has one primary heading",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementCount",

            selector: "h1",

            count: 1,
          },
        },

        {
          id:
            "contact-email",

          label:
            "Contact email is available",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'a[href="mailto:hello@westerly.example"]',
          },
        },

        {
          id:
            "contact-form",

          label:
            "Contact form exists",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector: "form",
          },
        },

        {
          id:
            "contact-labels",

          label:
            "Every contact field has a label",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "allFieldsHaveLabels",

            selector:
              "form input, form textarea, form select",
          },
        },

        {
          id:
            "name-field-name",

          label:
            "Name field can be submitted",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "name",
            ],

            attribute: "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "email-field-name",

          label:
            "Email field can be submitted",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "email",
              "e-mail",
            ],

            attribute: "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "message-field-name",

          label:
            "Message field can be submitted",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "message",
            ],

            attribute: "name",

            mode:
              "notBlank",
          },
        },

        {
          id:
            "name-required",

          label:
            "Name is required",

          visibility:
            "visible",

          filePath:
            "contact.html",

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

          filePath:
            "contact.html",

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

          filePath:
            "contact.html",

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

        {
          id:
            "email-type",

          label:
            "Email field uses browser email validation",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "formFieldAttribute",

            labelIncludes: [
              "email",
              "e-mail",
            ],

            attribute: "type",

            mode:
              "equals",

            value: "email",
          },
        },

        {
          id:
            "submit-button",

          label:
            "Form contains a submit button",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "elementExists",

            selector:
              'form button, form input[type="submit"]',
          },
        },
      ],
    },

    /**
     * ------------------------------------------------
     * NAVIGATION
     * ------------------------------------------------
     */
    {
      id:
        "navigation",

      label:
        "Site navigation",

      tests: [
        {
          id:
            "home-navigation",

          label:
            "Home links to all site pages",

          visibility:
            "visible",

          filePath:
            "index.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              'nav a[href="index.html"], nav a[href="./index.html"]',

              'nav a[href="services.html"], nav a[href="./services.html"]',

              'nav a[href="contact.html"], nav a[href="./contact.html"]',
            ],
          },
        },

        {
          id:
            "services-navigation",

          label:
            "Services links to all site pages",

          visibility:
            "visible",

          filePath:
            "services.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              'nav a[href="index.html"], nav a[href="./index.html"]',

              'nav a[href="services.html"], nav a[href="./services.html"]',

              'nav a[href="contact.html"], nav a[href="./contact.html"]',
            ],
          },
        },

        {
          id:
            "contact-navigation",

          label:
            "Contact links to all site pages",

          visibility:
            "visible",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "selectorsExist",

            selectors: [
              'nav a[href="index.html"], nav a[href="./index.html"]',

              'nav a[href="services.html"], nav a[href="./services.html"]',

              'nav a[href="contact.html"], nav a[href="./contact.html"]',
            ],
          },
        },

        /**
         * Hidden structural checks.
         */
        {
          id:
            "home-heading-order",

          label:
            "Home heading hierarchy",

          visibility:
            "hidden",

          filePath:
            "index.html",

          evaluate: {
            type:
              "headingOrderValid",
          },
        },

        {
          id:
            "services-heading-order",

          label:
            "Services heading hierarchy",

          visibility:
            "hidden",

          filePath:
            "services.html",

          evaluate: {
            type:
              "headingOrderValid",
          },
        },

        {
          id:
            "contact-heading-order",

          label:
            "Contact heading hierarchy",

          visibility:
            "hidden",

          filePath:
            "contact.html",

          evaluate: {
            type:
              "headingOrderValid",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",

      content:
        "Treat the client brief as your specification. Break the work into pages, then verify each page against the site-wide and page-specific requirements.",
    },

    {
      id: "hint-2",

      content:
        "You already know every HTML concept required here: semantic structure, headings, navigation, images, lists, forms, labels and field attributes.",
    },

    {
      id: "hint-3",

      content:
        "Start each page with a simple semantic skeleton, then add only the content required by the brief.",

      code: `<header>
  ...
</header>

<main>
  ...
</main>

<footer>
  ...
</footer>`,
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

      initials: "MC",

      content:
        "Client review passed.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials: "MC",

      content:
        "That's it. Your first week.",
    },

    {
      sender:
        "Maya Chen",

      role:
        "Project Manager",

      initials: "MC",

      content:
        "Twelve tickets. No production outages. I'll take it.",
    },

    {
      sender:
        "Elliot Reed",

      role:
        "Backend Developer",

      initials: "ER",

      content:
        "Hey. Maya said you've been working on some of Daniel's old projects.",
    },

    {
      sender:
        "Elliot Reed",

      role:
        "Backend Developer",

      initials: "ER",

      content:
        "If you find anything unusual in them...",
    },

    {
      sender:
        "Elliot Reed",

      role:
        "Backend Developer",

      initials: "ER",

      content:
        "don't delete it.",
    },
  ],
};