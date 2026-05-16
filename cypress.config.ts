import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter"
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor"
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild"
import createBundler from "@bahmutov/cypress-esbuild-preprocessor"
import * as dotenv from "dotenv"
import config from './config/config.json';
dotenv.config();
type EnvironmentName = keyof typeof config.environments
const envName = (process.env.TEST_ENV || 'QA') as EnvironmentName
const envConfig = config.environments[envName];
const items: Record<string, unknown> = {}
export default defineConfig({
  allowCypressEnv: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultBrowser: envConfig.browser,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  retries: {
    runMode: envConfig.MAX_NUMBER_OF_ATTEMPTS || 1,
    openMode: 0,
  },
  includeShadowDom: true,
  numTestsKeptInMemory: 100,
  video: true,

  e2e: {
    baseUrl: envConfig.url,
    specPattern: "cypress/e2e/**/*.feature",
    env: {
      apiUrl: envConfig.apiUrl,
      snapshotOnly: true
    },
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: "./allure-results"
      });

      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }))

      on('task', {
        setItem({ name, value }) {
          console.log("setting %s", name);
          if (typeof value === undefined) {
            throw new Error(`cannot store undefined value for item ${name}`)
          }
          items[name] = value;
          return null;
        },
        getItem(name) {
          if (name in items) {
            console.log("returning item %s", name);
            return items[name]
          }
          const message = `Missinng Item ${name}`
          console.error(message);
          throw new Error(message);
        }
      })
      return config;
    },

  },
});
