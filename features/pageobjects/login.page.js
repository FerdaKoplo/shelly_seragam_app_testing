const { $ } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
  get usernameInput() { return $('#usernameInput').isExisting().then(exists => exists ? $('#usernameInput') : $('[name="username"]')); }
  get passwordInput() { return $('#passwordInput').isExisting().then(exists => exists ? $('#passwordInput') : $('[name="password"]')); }

  get loginButton() { return $('#btnLogin'); }
  get loginButtonFallback() { return $('button[type="submit"]'); }

  get errorMessage() { return $('.absolute > .font-inter'); }

  async open() {
    return super.open('login');
  }

  async login(username, password) {
    const userEl = await (await $('#usernameInput').isExisting() ? $('#usernameInput') : $('[name="username"]'));
    const passEl = await (await $('#passwordInput').isExisting() ? $('#passwordInput') : $('[name="password"]'));

    await userEl.waitForExist({ timeout: 10000 });
    await userEl.setValue(username);

    await passEl.waitForExist({ timeout: 10000 });
    await passEl.setValue(password);
  }

  async submit() {
    if (await this.loginButton.isExisting()) {
      await this.loginButton.click();
    } else if (await $('.bg-neutral').isExisting()) {
      await $('.bg-neutral').click();
    } else {
      await this.loginButtonFallback.click();
    }
  }
}

module.exports = new LoginPage();