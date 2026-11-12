
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('SauceDemo Login Tests', () => {

  test('Valid user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('Invalid user receives an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(
      page.locator('[data-test="error"]')
    ).toContainText('Username and password do not match');
  });

});
