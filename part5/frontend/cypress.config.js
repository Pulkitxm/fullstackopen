import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"http://localhost:5173/"
  },
  env:{
    backendUrl:"http://localhost:3003",
  }
});
