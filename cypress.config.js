const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'mjxpmu',
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  env: {
    email:"s.camposlacueva@gmail.com",
    name:"Sergio",
    surname:"Campos",
    password:"abc12345!",
  }
  },
});
