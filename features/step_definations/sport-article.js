
const { Given, When, Then } = require("@cucumber/cucumber");
const BbcPage = require("../../pages/BbcPage");

Given("I am on the BBC homepage", { timeout: 60000 }, async function () {
  this.bbcPage = new BbcPage(this.page);
  await this.bbcPage.navigate("https://www.bbc.com/sport/football/scores-fixtures");
});

When("I close any popup if present", async function () {
  await this.bbcPage.closePopupIfPresent();
});

When(
  "I search for the title {string}",
  { timeout: 70000 },
  async function (searchTerm) {
    await this.bbcPage.performSearch(searchTerm);
  },
);

Then(
  "I should get the first and the last headings of the search results",
  { timeout: 10000 },
  async function () {
    const { first, last } = await this.bbcPage.getFirstAndLastHeadings();
    console.log("First Heading:", first);
    console.log("Last Heading:", last);
  },
);