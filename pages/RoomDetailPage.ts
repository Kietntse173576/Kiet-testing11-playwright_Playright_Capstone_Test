import { expect, Locator, Page } from '@playwright/test'
import { highlightStep } from '../tests/utils/highlightStep'

export class RoomDetailPage {
  readonly page: Page

  readonly ratingStars: Locator
  readonly commentInput: Locator
  readonly submitBtn: Locator

  constructor(page: Page) {
    this.page = page

    this.ratingStars = page.locator('ul.ant-rate li.ant-rate-star')
    this.commentInput = page.locator('textarea#noiDung')
    this.submitBtn = page.locator('button:has-text("Đánh giá")')
  }



  async goToRoomDetail(): Promise<void> {
    // Dùng đúng domain mà fixture đã login
    await this.page.goto('https://demo5.cybersoft.edu.vn/room-detail/3', {
        waitUntil: 'networkidle'
    })

    // Verify đã login - nếu bị redirect về login thì fail luôn
    await expect(this.page.locator('alert:has-text("Cần đăng nhập")')).toHaveCount(0, { timeout: 5000 })

    // Chờ rating stars load
    await this.page.locator('ul.ant-rate').waitFor({ state: 'visible', timeout: 15000 })
}
  async chonSoSao(soSao: 1 | 2 | 3 | 4 | 5): Promise<void> {
    const starItem = this.ratingStars.nth(soSao - 1)
    const starSecond = starItem.locator('.ant-rate-star-second')
    await highlightStep(this.page, starSecond, 200)
    await starSecond.click()


    const selectedStars = this.page.locator('li.ant-rate-star-full')
    await selectedStars.nth(soSao - 1).waitFor({ state: 'visible', timeout: 5000 })
  }

  async danhGia(soSao: 1 | 2 | 3 | 4 | 5, noiDung: string): Promise<void> {
    await this.chonSoSao(soSao)

    await highlightStep(this.page, this.commentInput, 200)
    await this.commentInput.fill(noiDung)

    await highlightStep(this.page, this.submitBtn, 200)
    await this.submitBtn.click()
  }
}