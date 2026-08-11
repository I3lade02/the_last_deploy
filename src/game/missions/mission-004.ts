import type { Mission } from "../../types/game";

export const mission004: Mission = {
  id: "html-004",

  act: 1,
  order: 4,

  title: "Image Not Found",

  briefing: {
    ticketNumber: "#004",
    client: "Orbit Creative Studio",
    priority: "High",
    title: "Missing company logo",

    description:
      "The company logo disappeared after the project files were reorganized. Restore it and make sure the image has useful alternative text.",
  },

  preview: {
    entryFile: "index.html",
    baseHref: "/mission-assets/orbit/",
  },

  files: [
    {
      path: "index.html",
      language: "html",

      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Orbit Creative Studio</title>
  </head>

  <body>
    <header>
      <img src="logo">

      <h1>Orbit Creative Studio</h1>
    </header>

    <p>Ideas with gravity.</p>
  </body>
</html>
`,
    },
  ],

  objectives: [
    {
      id: "restore-image",
      label: "Restore the company logo",
      required: true,

      testIds: ["correct-image-source"],
    },

    {
      id: "alt-text",
      label: "Add useful alternative text",
      required: true,

      testIds: [
        "alt-exists",
        "alt-not-empty",
      ],
    },
  ],

  testGroups: [
    {
      id: "image",
      label: "Image",

      tests: [
        {
          id: "correct-image-source",
          label: "Logo uses the correct file path",
          visibility: "visible",

          evaluate: {
            type: "attributeEquals",
            selector: "img",
            attribute: "src",
            value: "assets/logo.svg",
          },
        },

        {
          id: "alt-exists",
          label: "Image has alternative text",
          visibility: "visible",

          evaluate: {
            type: "attributeExists",
            selector: "img",
            attribute: "alt",
          },
        },

        {
          id: "alt-not-empty",
          label: "Alternative text is not empty",
          visibility: "hidden",

          evaluate: {
            type: "attributeNotBlank",
            selector: "img",
            attribute: "alt",
          },
        },
      ],
    },
  ],

  hints: [
    {
      id: "hint-1",
      content:
        "Image paths are relative to the current project location. The logo is stored inside the assets directory.",
    },

    {
      id: "hint-2",
      content:
        "The correct image file is assets/logo.svg. Images can also provide alternative text using an attribute.",
    },

    {
      id: "hint-3",
      content:
        "The img element can specify both its source and a textual alternative.",
      code: `<img src="assets/logo.svg" alt="Orbit Creative Studio logo">`,
    },
  ],

  completionMessages: [
    {
      sender: "Sophie Laurent",
      role: "UI/UX Designer",
      initials: "SL",

      content: "Thanks for fixing the logo.",
    },

    {
      sender: "Sophie Laurent",
      role: "UI/UX Designer",
      initials: "SL",

      content: "And for adding alt text.",
    },

    {
      sender: "Sophie Laurent",
      role: "UI/UX Designer",
      initials: "SL",

      content: "Daniel usually remembered that.",
    },

    {
      sender: "Sophie Laurent",
      role: "UI/UX Designer",
      initials: "SL",

      content: "Usually.",
    },
  ],
};