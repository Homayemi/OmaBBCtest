const { expect, Locator } = require("@playwright/test");
const { readJsonFile, writeJsonFile } = require("../utils/testUtils");

class BbcPage {
  constructor(page) {
    this.page = page;
    this.useremail_text_box = page.locator("input[type='email']");
    this.password_text_box = page.locator("input[id='password-input']");
    this.login_button = page.locator('button[type="submit"]');
    this.today = page.locator("(//div[normalize-space()='Today'])[1]");
    this.teamsPlaying = page.locator('[class*="HeadToHeadWrapper"]');
    this.closeButton = page.getByLabel("close");
    this.searchButton = page.locator('div[aria-label="Search BBC"] svg');
    this.searchInput = page.locator('input[id="searchInput"]');
    this.searchSubmitButton = page.locator('button[id="searchButton"]');
    this.cardHeadline = page.locator('[class*="PromoHeadline"]');
    this.paginationButton = page.locator('[class*="PageButtonListItem"]');
    this.signButton = page.locator('//span[normalize-space()="Sign in"]');
    this.errorMsg = page.locator("[id*='form-message']");
  }

  async enterEmail(name) {
    await this.useremail_text_box.fill(name);
  }

  async enterPassword(pwd) {
    await this.password_text_box.fill(pwd);
  }

  async clickToday() {
    await this.today.click();
  }

  async clickSignin() {
    await this.page.waitForTimeout(1000);
    await this.signButton.click();
  }

  async clickLogin() {
    await this.login_button.click();
  }

  async verifyErrorMessage(message) {
    if ((await this.errorMsg.count()) > 1) {
      const errorMessage = await this.errorMsg.nth(1).textContent();
      expect(errorMessage).toContain(message);
      return errorMessage;
    } else {
      const errorMessage = await this.errorMsg.nth(0).textContent();
      expect(errorMessage).toContain(message);
      return errorMessage;
    }
  }

  async extractMatches(page) {
    await this.clickToday();
    const teams = await this.teamsPlaying.allInnerTexts();
    const jsonObject = await readJsonFile();
    const noMatch = "There are no matches today,";
    jsonObject.date = new Date().toISOString().split("T")[0]; // ISO date format, just the date part
    if (teams.length < 2) {
      jsonObject.matches = noMatch;
    } else {
      teams.map((item) => {
        console.log(item);
      });
      jsonObject.matches = teams;
    }

    await writeJsonFile(jsonObject);
    return jsonObject.matches;
  }

  async navigate(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState("load", { timeout: 60000 });
  }

  async closePopupIfPresent() {
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    }
  }

  async performSearch(searchTerm) {
    await this.page.waitForTimeout(1000);
    await this.searchButton.click();
    await this.searchInput.fill(searchTerm);
    await this.searchSubmitButton.click();
    await this.page.waitForLoadState();
  }

  async getFirstAndLastHeadings() {
    const headings = await this.cardHeadline.allInnerTexts();
    if (headings.length === 0) {
      return { first: "", last: "" };
    }

    let lastHeading = headings[headings.length - 1];
    if ((await this.paginationButton.count()) > 0) {
      const paginationNumber = await this.paginationButton.allInnerTexts();
      await this.paginationButton.nth(paginationNumber.length - 1).click();
      //await this.cardHeadline.waitFor({ timeout: 10000 });
      const updatedHeadings = await this.cardHeadline.allInnerTexts();
      lastHeading = updatedHeadings[updatedHeadings.length - 1];
    }

    return { first: headings[0], last: lastHeading };
  }
}

module.exports = BbcPage;