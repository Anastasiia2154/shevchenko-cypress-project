import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin.js";
import * as path from "path";
import * as fs from "fs";

const getConfigFile = (env) => {
  const configFilePath = path.join(
    "cypress",
    "fixtures",
    "configFiles",
    `cypress.${env || "dev"}.config.json`
  );
  return fs.readFileSync(configFilePath).toString();
};

export default defineConfig({
  retries: {
    runMode: 0,
    openMode: 0,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "My Cypress Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },

  screenshotOnRunFailure: true,
  pageLoadTimeout: 60000,
  e2e: {
    specPattern: "cypress/**/**/*.{test,spec}.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      mochawesome(on);
      on("before:run", (details) => {
        console.log("Tests are about to start!", details);
      });
      on("after:run", (results) => {
        console.log("Test run completed!", results);
      });

      const configOverrides = getConfigFile(config.env.TEST_ENVIRONMENT);
      config = { ...config, ...JSON.parse(configOverrides) };
      return config;
    },
  },
});
