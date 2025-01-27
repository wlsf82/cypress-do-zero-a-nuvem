const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "g3c5t8",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    experimentalStudio: true,
  },
  video: true,
  scripts: {
    "cy:open": "cypress open",
    "cypress:open:mobile":
      "cypress open --config viewportWidth=410,viewportHeight=860",
    test: "cypress run",
    "test:mobile:headless":
      "cypress run --headless --config viewportWidth=410,viewportHeight=860",
  },
});
