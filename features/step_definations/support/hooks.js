const { chromium } = require("playwright");
const { BeforeAll, AfterAll, Before, After } = require("@cucumber/cucumber");

let browser;
let context;

BeforeAll(async () => {
  // This launches the browser before all scenarios
  browser = await chromium.launch();
});

Before(async function () {
  // The hook will be executed before each scenario
  context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  // The hook will be executed after each scenario
  await this.page.close();
  await context.close();
});

AfterAll(async () => {
  // This closes the browser after all scenarios are done
  await browser.close();
});