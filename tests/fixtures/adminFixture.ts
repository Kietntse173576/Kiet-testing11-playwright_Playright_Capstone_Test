// tests/fixtures/adminFixture.ts
import { test as base, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { LoginModal } from '../../pages/loginModal'
import { AdminPage } from '../../pages/AdminPage'
import { adminAccount } from '../../data/account'

type AdminFixtures = {
  adminPage: AdminPage
}

export const test = base.extend<AdminFixtures>({
  adminPage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.open()
    await homePage.openLoginModal()

    const loginModal = new LoginModal(page)
    await loginModal.login(adminAccount.email, adminAccount.password)

    await homePage.avatarBtn.click()

    const adminMenuItem = page.getByRole('link', { name: /To page Admin/i })

    // ✅ Tăng timeout lên 15s — tránh lỗi khi server chậm
    await expect(adminMenuItem).toBeVisible({ timeout: 15000 })
    await adminMenuItem.click()

    // ✅ Chờ trang admin load xong trước khi trả về
    await page.waitForURL(/\/admin/, { timeout: 15000 })

    const adminPage = new AdminPage(page)
    await use(adminPage)
  }
})

export { expect }