import { test, expect } from "@playwright/test";
import BbcPage from "../pages/BbcPage";
import fs from "fs";

let testData;

test.beforeEach(async ({ page }) => {
  const jsonData = fs.readFileSync("utils/testData.json", "utf8");
  testData = JSON.parse(jsonData);
  const bbcPage = new BbcPage(page);
  await bbcPage.navigate("/sport/football/scores-fixtures");
  await bbcPage.closePopupIfPresent();
});

test("As a business user, I would like to make a record of all teams which are playing today", async ({ page }) => {
  //await page.pause();
  const landingPage = new BbcPage(page);
  await landingPage.navigate("/sport/football/scores-fixtures");
  await landingPage.extractMatches(page);
});

test("As a sports user, I would like to read about all articles related to sports", async ({ page }) => {
  const sportsPage = new BbcPage(page);
  await sportsPage.performSearch("sport");
  const { first, last } = await sportsPage.getFirstAndLastHeadings();
  console.log(`First heading: ${first}`);
  console.log(`Last heading: ${last}`);
});

test("Verify error when user tries to login with empty email/username", async ({
    page,
  }) => {
    
    const signinPage = new BbcPage(page);
    await signinPage.clickSignin();
    await signinPage.enterEmail(testData.emptyEmail);
    await signinPage.clickLogin();
    await signinPage.verifyErrorMessage(testData.emptyEmailError);
  });

  test("Verify error when a user tries to login with an unregistered email", async ({
    page,
  }) => {
    
    const signinPage = new BbcPage(page);
    await signinPage.clickSignin();
    await signinPage.enterEmail(testData.unRegisteredEmail);
    await signinPage.clickLogin();
    await signinPage.verifyErrorMessage(testData.unRegisteredEmailError);
  });

  test("Verify error when a user tries to login with special characters in the email", async ({
    page,
  }) => {
    const signinPage = new BbcPage(page);
    await signinPage.clickSignin();
    await signinPage.enterEmail(testData.specialCharsEmail);
    await signinPage.clickLogin();
    await signinPage.verifyErrorMessage(testData.specialCharsEmailError);
  });
  test("Verify error when a user tries to login with a wrong username", async ({
    page,
  }) => {
    const signinPage = new BbcPage(page);
    await signinPage.clickSignin();
    await signinPage.enterEmail(testData.invalidUsername);
    await signinPage.clickLogin();
    await signinPage.verifyErrorMessage(testData.unRegisteredEmailError);
  });

  test("Verify error when user tries to login with invalid password", async ({
    page,
  }) => {
   
    const signinPage = new BbcPage(page);
    await signinPage.clickSignin();
    await signinPage.enterEmail(testData.registeredEmail);
    await signinPage.clickLogin();
    await signinPage.enterPassword(testData.inValidPassword);
    await signinPage.clickLogin();
    await signinPage.verifyErrorMessage(testData.invalidPasswordError);
  });

test("Verify error when a user tries to login with no/empty password", async ({
  page,
}) => {

  const signinPage = new BbcPage(page);
  await signinPage.clickSignin();
  await signinPage.enterEmail(testData.registeredEmail);
  await signinPage.clickLogin();
  await signinPage.enterPassword(testData.emptyPassword);
  await signinPage.clickLogin();
  await signinPage.verifyErrorMessage(testData.emptyEmailError);
});

test("Verify error when a user tries to login with a short password", async ({
  page,
}) => {
   
  const signinPage = new BbcPage(page);
  await signinPage.clickSignin();
  await signinPage.enterEmail(testData.registeredEmail);
  await signinPage.clickLogin();
  await signinPage.enterPassword(testData.shortPassword);
  await signinPage.clickLogin();
  await signinPage.verifyErrorMessage(testData.shortPasswordError);
});

