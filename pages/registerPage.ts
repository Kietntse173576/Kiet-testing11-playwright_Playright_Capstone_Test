import { Locator, Page, expect } from '@playwright/test';
import { highlightStep } from '../tests/utils/highlightStep';

export class RegisterPage {
  readonly page: Page;

  readonly userIcon: Locator;
  readonly registerButtonInPopup: Locator;
  readonly registerForm: Locator;
  readonly modalTitle: Locator;
  readonly loginModalTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneInput: Locator;
  readonly birthdayInput: Locator;
  readonly genderSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userIcon = page.locator('nav button').filter({
      has: page.locator('img')
    }).first();

    this.registerButtonInPopup = page.locator('button')
      .filter({ hasText: 'Đăng ký' })
      .first();

    this.registerForm = page.locator('.ant-form.ant-form-vertical');

    this.modalTitle = page.getByRole('heading', {
      name: 'Đăng ký tài khoản'
    });

    this.loginModalTitle = page.getByRole('heading', {
      name: 'Đăng nhập'
    });

    this.nameInput = this.registerForm.getByRole('textbox', { name: 'Name' });
    this.emailInput = this.registerForm.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.registerForm.getByRole('textbox', { name: 'Password' });
    this.phoneInput = this.registerForm.getByRole('textbox', { name: 'Phone number' });
    this.birthdayInput = this.registerForm.locator('#birthday');
    this.genderSelect = this.registerForm.locator('.ant-select[name="gender"]');
    this.submitButton = this.registerForm.locator('button[type="submit"]');
  }

  async openRegisterForm() {
    await this.page.goto('https://demo5.cybersoft.edu.vn/');

    await expect(this.userIcon).toBeVisible();
    await highlightStep(this.page, this.userIcon, 200)
    await this.userIcon.click();

    await expect(this.registerButtonInPopup).toBeVisible();
    await highlightStep(this.page, this.registerButtonInPopup, 200)
    await this.registerButtonInPopup.click();

    await expect(this.registerForm).toBeVisible();
  }

  async fillForm(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender?: 'male' | 'female';
  }) {
    await highlightStep(this.page, this.nameInput, 200)
    await this.nameInput.fill(data.name);

    await highlightStep(this.page, this.emailInput, 200)
    await this.emailInput.fill(data.email);

    await highlightStep(this.page, this.passwordInput, 200)
    await this.passwordInput.fill(data.password);

    await highlightStep(this.page, this.phoneInput, 200)
    await this.phoneInput.fill(data.phone);

    await highlightStep(this.page, this.birthdayInput, 200)
    await this.birthdayInput.click();

    const day = data.birthday.split('-')[2];
    const dayCell = this.page.locator('.ant-picker-cell')
      .filter({ hasText: new RegExp(`^${day}$`) })
      .first();
    await expect(dayCell).toBeVisible();
    await highlightStep(this.page, dayCell, 200)
    await dayCell.click();

    if (data.gender) {
      await highlightStep(this.page, this.genderSelect, 200)
      await this.genderSelect.click();

      const genderText = data.gender === 'male' ? 'Nam' : 'Nữ';
      const dropdown = this.page.locator('.ant-select-dropdown:visible');
      await expect(dropdown).toBeVisible();

      const genderOption = dropdown.getByText(genderText, { exact: true })
      await highlightStep(this.page, genderOption, 200)
      await genderOption.click();
    }
  }

  async submit() {
    await highlightStep(this.page, this.submitButton, 200)
    await this.submitButton.click();
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender?: 'male' | 'female';
  }) {
    await this.openRegisterForm();
    await this.fillForm(data);
    await this.submit();
  }

  async isRegisterSuccess(): Promise<boolean> {
    try {
      await this.page.waitForURL(/login/i, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}