const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 1,
  },
  screenshotOnRunFailure: true,
  pageLoadTimeout: 60000,
  e2e: {
    specPattern: "cypress/e2e/**/*.{test,spec}.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      on("before:run", (details) => {
        console.log("Tests are about to start!", details);
      });
      on("after:run", (results) => {
        console.log("Test run completed!", results);
      });
    },
  },
});
