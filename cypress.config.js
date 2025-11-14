const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Inicializa o Allure
      allureWriter(on, config);

      // Garante que os testes gerem resultados
      on('after:screenshot', (details) => {
        return details; // necessário para que o plugin registre screenshots
      });

      return config;
    }
  }
});

