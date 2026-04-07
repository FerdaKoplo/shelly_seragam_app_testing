const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');

const LoginPage = require('../pageobjects/login.page');

Given('admin berada di halaman login', async () => {
  await LoginPage.open();
});

When(
  'admin mengisi username {string} dan password {string}',
  async (username, password) => {
    await LoginPage.login(username, password);
  }
);

When('admin klik tombol login', async () => {
  await LoginPage.submit();
});

Then('admin diarahkan ke halaman statistik transaksi', async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/admin/statistik-transaksi'),
    { timeout: 10000, timeoutMsg: 'URL tidak menuju /admin/statistik-transaksi' }
  );
});

Then('admin tetap di halaman login dan melihat pesan error', async () => {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/login'),
    { timeout: 10000, timeoutMsg: 'URL tidak tetap di /login' }
  );
  await expect(LoginPage.errorMessage).toBeDisplayed();
});