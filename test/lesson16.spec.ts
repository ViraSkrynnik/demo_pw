import {test, expect, Locator} from "@playwright/test";

test.beforeEach(async ({ page }) => {
    const path = require('path');
    const filePath = `file://${path.resolve('src/order-flow.html')}`;
    await page.goto(filePath);
})

test('button disabled initially', async ({ page }) => {
    const orderButton: Locator = page.getByTestId('submit-order');
    await expect(orderButton).toBeDisabled();
});

test('button enabled after filling correct data', async ({ page }) => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const userName: Locator = page.getByTestId('username');
    const eMail: Locator = page.getByTestId('email');
    await userName.fill('John Doe');
    await eMail.fill('test@test.com');
    await expect(orderButton).toBeEnabled();
});

test('popup is visible', async ({ page }) => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const userName: Locator = page.getByTestId('username');
    const eMail: Locator = page.getByTestId('email');
    const popupMessage: Locator = page.locator('#popup-message')
    await userName.fill('John Doe');
    await eMail.fill('test@test.com');
    await orderButton.click();
    await expect(popupMessage).toBeVisible();
    await expect(popupMessage).toHaveText('OK');
});

test('Button disabled if email is incorrect', async ({ page }) => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const userName: Locator = page.getByTestId('username');
    const eMail: Locator = page.getByTestId('email');
    await userName.fill('John Doe');
    await eMail.fill('test@com');
    await expect(orderButton).toBeDisabled();
});