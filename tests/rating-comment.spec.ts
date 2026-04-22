
import { RoomDetailPage } from '../pages/RoomDetailPage'
import { test, expect } from './fixtures/userFixture'

test.describe('User - Đánh giá phòng', () => {
  test.describe.configure({ mode: 'serial' })

  test('TC1: Đánh giá 5 sao và bình luận thành công', { tag: '@local' }, async ({ userPage }) => {
    const roomDetailPage = new RoomDetailPage(userPage)

    await roomDetailPage.goToRoomDetail()
    await roomDetailPage.ratingStars.first().scrollIntoViewIfNeeded()
    await roomDetailPage.danhGia(5, 'Phòng rất tuyệt vời, view đẹp, sạch sẽ, dịch vụ tốt!')

    const successToast = userPage.locator('.ant-message-success, .ant-notification-notice-success')
    const newComment = userPage.locator('text=Phòng rất tuyệt vời, view đẹp, sạch sẽ, dịch vụ tốt!')
    await expect(successToast.or(newComment).first()).toBeVisible({ timeout: 10000 })
  })

  test('TC2: Đánh giá 3 sao và bình luận', { tag: '@local' }, async ({ userPage }) => {
    const roomDetailPage = new RoomDetailPage(userPage)

    await roomDetailPage.goToRoomDetail()
    await roomDetailPage.ratingStars.first().scrollIntoViewIfNeeded()
    await roomDetailPage.danhGia(3, 'Phòng ổn, vị trí thuận tiện nhưng tiếng ồn hơi nhiều.')

    const successToast = userPage.locator('.ant-message-success, .ant-notification-notice-success')
    const newComment = userPage.locator('text=Phòng ổn, vị trí thuận tiện nhưng tiếng ồn hơi nhiều.')
    await expect(successToast.or(newComment).first()).toBeVisible({ timeout: 10000 })
  })

  test('TC3: Submit bình luận không cần chọn sao', { tag: '@local' }, async ({ userPage }) => {
    const roomDetailPage = new RoomDetailPage(userPage)

    await roomDetailPage.goToRoomDetail()
    await roomDetailPage.ratingStars.first().scrollIntoViewIfNeeded()

    await roomDetailPage.commentInput.fill('Bình luận không kèm đánh giá sao.')
    await roomDetailPage.submitBtn.click()

    const successToast = userPage.locator('.ant-message-success, .ant-notification-notice-success')
    const newComment = userPage.locator('text=Bình luận không kèm đánh giá sao.')
    await expect(successToast.or(newComment).first()).toBeVisible({ timeout: 10000 })
  })

  test('TC4: Submit không nhập bình luận - hiển thị thông báo lỗi', { tag: '@local' }, async ({ userPage }) => {
    const roomDetailPage = new RoomDetailPage(userPage)

    await roomDetailPage.goToRoomDetail()
    await roomDetailPage.ratingStars.first().scrollIntoViewIfNeeded()

    await roomDetailPage.chonSoSao(4)
    await roomDetailPage.submitBtn.click()

    const errorMsg = userPage.locator('text=Bạn chưa có nội dung đánh giá')
    await expect(errorMsg).toBeVisible({ timeout: 5000 })
  })
})