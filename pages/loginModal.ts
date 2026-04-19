import { Locator, Page } from '@playwright/test'
import { highlightStep } from '../tests/utils/highlightStep'

export class LoginModal {
    readonly page: Page

    readonly modal: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.modal = this.page.locator('.ant-modal-content')
        this.emailInput = this.modal.locator('#email')
        this.passwordInput = this.modal.locator('#password')
        this.loginBtn = this.modal.getByRole('button', { name: 'Đăng nhập' })
    }

    async login(email: string, password: string) {
        await highlightStep(this.page, this.emailInput, 200)
        await this.emailInput.fill(email)

        await highlightStep(this.page, this.passwordInput, 200)
        await this.passwordInput.fill(password)

        await highlightStep(this.page, this.loginBtn, 200)
        await this.loginBtn.click()
    }
}