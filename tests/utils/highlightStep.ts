import { Locator, Page } from "@playwright/test";

export const highlightStep = async (page: Page, locator: Locator, delayMs = 500): Promise<void> => {
    const target = locator.first(); // Lấy phần tử đầu tiên nếu có nhiều phần tử khớp

    // Vì target có thể không tìm thấy
    // => return nếu target không tồn tại để tránh lỗi
    try {
        await target.waitFor({ state: "visible", timeout: 5000 }); // Chờ phần tử hiển thị        
    } catch (error) {
        return
    }

    // Lưu lại style gốc của phần tử để có thể khôi phục sau khi highlight
    let originalStyle = ""
    // evaluate là hàm sẽ truy cập trực tiếp vào thẻ đang xét
    originalStyle = await target.evaluate((el) => {
        const element = el as HTMLElement
        // <button>Click</button>
        const previousStyle = element.getAttribute("style") || ""
        // Thêm style highlight vào phần tử
        element.style.outline = "2px solid red" // Viền đỏ xung quanh phần tử
        element.style.backgroundColor = "yellow" // Nền vàng cho phần tử
        return previousStyle
    })

    await page.waitForTimeout(delayMs) // Đợi một khoảng thời gian để người dùng có thể thấy phần tử được highlight

    // khôi phục style gốc của phần tử sau khi highlight
    await target.evaluate((el, previousStyle) => {
        const element = el as HTMLElement
        if(previousStyle) {
            element.setAttribute("style", previousStyle) // Khôi phục style gốc
        } else {
            element.removeAttribute("style") // Nếu không có style gốc, xóa thuộc tính style
        }
    }, originalStyle)
}