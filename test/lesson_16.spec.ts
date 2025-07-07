import {test, expect, Locator} from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL);
})

test('sign in button is disabled', async ({ page })=> {
    const loginButton: Locator = page.getByRole('button', { name: 'Sign in' })
    const userName: Locator = page.locator('#username');
    const password: Locator = page.locator('#password');
    await userName.fill('test user');
    await password.fill('test');
    await expect(loginButton).toBeDisabled();
});