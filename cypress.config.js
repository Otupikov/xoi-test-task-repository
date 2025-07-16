const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');


module.exports = defineConfig({

  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const file = config.env.configFile || 'integration'
      return getCongiDataFromFile(file);

    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
});

function getCongiDataFromFile(file) {
  const filePath = path.resolve('cypress','config',`${file}.json`);
  return fs.readJson(filePath);
}

