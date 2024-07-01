
const { Given, When, Then } = require("@cucumber/cucumber");
const BbcPage = require("../../pages/BbcPage.js");

Given("there are matches today", async function () {
  this.bbcPage = new BbcPage(this.page);
});

When(
  "I want the names of the teams playing today",
  { timeout: 70000 },
  async function () {
    await this.bbcPage.navigate(
      "https://www.bbc.com/sport/football/scores-fixtures",
    );
  },
);

Then(
  "I should get the list of the teams playing today",
  async function () {
    await this.bbcPage.extractMatches();
  },
);