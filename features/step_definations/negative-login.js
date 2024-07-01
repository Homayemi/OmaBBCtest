
const { Given, When, Then } = require("@cucumber/cucumber");
const BbcPage = require("../../pages/BbcPage.js");

Given("I am on the signin page", { timeout: 70000 }, async function () {
  this.bbcPage = new BbcPage(this.page);
  await this.bbcPage.navigate("https://www.bbc.com/sport/football/scores-fixtures");
  await this.bbcPage.closePopupIfPresent();
});

When("I click on the signin button", { timeout: 50000 }, async function () {
  await this.bbcPage.clickSignin();
});

When("I enter {string} as the email", async function (email) {
  await this.bbcPage.enterEmail(email);
});

When("I enter {string} as the password", async function (password) {
  await this.bbcPage.enterPassword(password);
});

When("I attempt to login", async function () {
  await this.bbcPage.clickLogin();
});

Then("I should get an error message {string}", async function (expectedError) {
  await this.bbcPage.verifyErrorMessage(expectedError);
});