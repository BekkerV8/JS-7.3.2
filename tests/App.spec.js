// const { test, expect } = require("@playwright/test");

// test("test", async ({ page }) => {
//   // Go to https://netology.ru/free/management#/
//   await page.goto("https://netology.ru/free/management#/");

//   // Click a
//   await page.click("a");
//   await expect(page).toHaveURL("https://netology.ru/");

//   // Click text=Учиться бесплатно
//   await page.click("text=Учиться бесплатно");
//   await expect(page).toHaveURL("https://netology.ru/free");

//   page.click("text=Бизнес и управление");

//   // Click text=Как перенести своё дело в онлайн
//   await page.click("text=Как перенести своё дело в онлайн");
//   await expect(page).toHaveURL(
//     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
//   );
// });
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { email, password } from "../user.js";

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.getByRole("heading", { name: "Мои курсы и профессии" }).click();
  const header = page.locator("h2").first();
  await expect(header).toHaveText("Мои курсы и профессии");
  await page.screenshot({ path: "Screenshots/Authorization.png" });
});

test("Authorisation Error", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("ktoto@gmail.com");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("neznau");
  await page.getByTestId("login-submit-btn").click();
  await page.getByTestId("login-error-hint").click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});
