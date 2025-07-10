import {test, expect, Locator} from "@playwright/test";
import {faker} from "@faker-js/faker/locale/ar";

const randomUsername = faker.internet.username();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.APP_URL!);
});

test('sign in button is disabled', async ({ page })=> {
    const loginButton: Locator = page.getByRole('button', { name: 'Sign in' })
    const userName: Locator = page.locator('#username');
    const password: Locator = page.locator('#password');
    await userName.fill('test user');
    await password.fill('test');
    await expect(loginButton).toBeDisabled();
});

test('sign in button is enabled after filling correct data', async ({ page }) => {
    const loginButton: Locator = page.getByRole('button', { name: 'Sign in' })
    const userName: Locator = page.locator('#username');
    const password: Locator = page.locator('#password');
    await userName.fill(randomUsername);
    await password.fill(randomPassword);
    await expect(loginButton).toBeEnabled();
});