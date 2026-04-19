import { Locator, Page, expect } from '@playwright/test'
import { highlightStep } from '../tests/utils/highlightStep'

export class AddUserModal {
    readonly page: Page

    readonly addModal: Locator
    readonly updateModal: Locator

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly phoneInput: Locator
    readonly passwordInput: Locator
    readonly genderSelect: Locator
    readonly birthdayInput: Locator
    readonly adminRole: Locator
    readonly userRole: Locator
    readonly submitBtn: Locator

    readonly updateNameInput: Locator
    readonly updatePhoneInput: Locator
    readonly updateBtn: Locator

    constructor(page: Page) {
        this.page = page

        this.addModal = page.locator('.ant-modal-wrap').filter({ hasText: 'Thêm người dùng' })
        this.updateModal = page.locator('.ant-modal-wrap').filter({ hasText: 'Cập nhật người dùng' })

        this.nameInput = this.addModal.locator('#name')
        this.emailInput = this.addModal.locator('#email')
        this.phoneInput = this.addModal.locator('#phone')
        this.passwordInput = this.addModal.locator('#password')
        this.genderSelect = this.addModal.locator('#gender')
        this.birthdayInput = this.addModal.locator('#birthday')
        this.adminRole = this.addModal.getByText('Admin', { exact: true })
        this.userRole = this.addModal.getByText('User', { exact: true })
        this.submitBtn = this.addModal.getByRole('button', { name: 'Thêm người dùng' })

        this.updateNameInput = this.updateModal.locator('#name')
        this.updatePhoneInput = this.updateModal.locator('#phone')
        this.updateBtn = this.updateModal.getByRole('button', { name: 'Cập nhật' })
    }

    async waitForAddModal() {
        await expect(this.addModal).toBeVisible({ timeout: 10000 })
    }

    async waitForUpdateModal() {
        await expect(this.updateModal).toBeVisible({ timeout: 10000 })
    }

    async fillForm(data: {
        name: string
        email: string
        phone: string
        password: string
        gender: 'Nam' | 'Nữ'
        birthday: string
        role: 'Admin' | 'User'
    }) {
        await this.waitForAddModal()

        // ✅ highlight từng field khi fill
        await highlightStep(this.page, this.nameInput, 200)
        await this.nameInput.fill('')
        await this.nameInput.fill(data.name)

        await highlightStep(this.page, this.emailInput, 200)
        await this.emailInput.fill(data.email)

        await highlightStep(this.page, this.phoneInput, 200)
        await this.phoneInput.fill(data.phone)

        await highlightStep(this.page, this.passwordInput, 200)
        await this.passwordInput.fill(data.password)

        // Gender
        await highlightStep(this.page, this.genderSelect, 200)
        await this.genderSelect.click()
        const dropdown = this.page.locator('.ant-select-dropdown:visible')
        await expect(dropdown).toBeVisible()
        const genderOption = dropdown.getByText(data.gender, { exact: true })
        await highlightStep(this.page, genderOption, 200)
        await genderOption.click()

        // Birthday
        await highlightStep(this.page, this.birthdayInput, 200)
        await this.birthdayInput.click()
        const day = data.birthday.split('-')[2]
        const dayCell = this.page.locator('.ant-picker-cell')
            .filter({ hasText: new RegExp(`^${day}$`) })
            .first()
        await expect(dayCell).toBeVisible()
        await highlightStep(this.page, dayCell, 200)
        await dayCell.click()

        // Role
        if (data.role === 'Admin') {
            await highlightStep(this.page, this.adminRole, 200)
            await this.adminRole.click()
        } else {
            await highlightStep(this.page, this.userRole, 200)
            await this.userRole.click()
        }
    }

    async submit() {
        await highlightStep(this.page, this.submitBtn, 200)
        await this.submitBtn.click()
    }

    async updateUser(data: {
        name?: string
        phone?: string
    }) {
        await this.waitForUpdateModal()

        if (data.name) {
            await this.updateNameInput.fill('')
            await this.updateNameInput.fill(data.name)
        }

        if (data.phone) {
            await this.updatePhoneInput.fill('')
            await this.updatePhoneInput.fill(data.phone)
        }
    }

    async submitUpdate() {
        await this.updateBtn.click()
    }
}