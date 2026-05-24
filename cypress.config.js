const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  projectId: 'ytshye',
  e2e: {
    numTestsKeptInMemory: 5,
    experimentalMemoryManagement: true,
    baseUrl: "http://127.0.0.1:8000/",
    redirectionLimit: 50,
    setupNodeEvents: async (on, config) => {

      // Force Chrome to ignore certain iframe security restrictions during the test session
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure');
        }
        return launchOptions;
      });
      
      const fs = require("fs");
      const path = require("path");

      on("task", {
        findDownloadedFile(extension) {
          const downloadsFolder = "cypress/downloads";

          const files = fs.readdirSync(downloadsFolder);

          const target = files.find(file => file.endsWith(extension));

          return target || null;
        },
      });

      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
  },
});

