import { Locator, Page } from "@playwright/test";
import { join } from "node:path";
import { highlightStep } from "../tests/utils/highlightStep";

export class AddRoomModal {
  readonly page: Page

  readonly uploadImageInput: Locator
  readonly tenPhongInput: Locator
  readonly moTaInput: Locator
  readonly soKhachInput: Locator
  readonly soPhongNguInput: Locator
  readonly soGiuongNguInput: Locator
  readonly soPhongTamInput: Locator
  readonly giaPhongInput: Locator
  readonly submitBtn: Locator

  readonly mayGiatToggle: Locator
  readonly banLaToggle: Locator
  readonly tiviToggle: Locator
  readonly dieuHoaToggle: Locator
  readonly wifiToggle: Locator
  readonly bepToggle: Locator
  readonly doXeToggle: Locator
  readonly hoBoisToggle: Locator

  readonly updateBtn: Locator

  constructor(page: Page) {
    this.page = page

    this.uploadImageInput = page.locator('input#hinhAnh[type="file"]')
    this.tenPhongInput = page.locator('#tenPhong')
    this.moTaInput = page.locator('#moTa')
    this.soKhachInput = page.locator('#khach')
    this.soPhongNguInput = page.locator('#phongNgu')
    this.soGiuongNguInput = page.locator('#giuong')
    this.soPhongTamInput = page.locator('#phongTam')
    this.giaPhongInput = page.locator('#giaTien')
    this.submitBtn = page.locator('button:has-text("Thêm mới")')
    this.mayGiatToggle = page.locator('#mayGiat')
    this.banLaToggle = page.locator('#banLa')
    this.tiviToggle = page.locator('#tivi')
    this.dieuHoaToggle = page.locator('#dieuHoa')
    this.wifiToggle = page.locator('#wifi')
    this.bepToggle = page.locator('#bep')
    this.doXeToggle = page.locator('#doXe')
    this.hoBoisToggle = page.locator('#hoBoi')
    this.updateBtn = page.locator('button:has-text("Cập nhật")')
  }

  async chonViTri(tenViTri: string): Promise<void> {
    const dropdown = this.page.locator('#maViTri')
    await highlightStep(this.page, dropdown, 200)
    await dropdown.click()
    await this.page.waitForSelector('.ant-select-dropdown', { state: 'visible', timeout: 10000 })

    const option = this.page.locator('.ant-select-item-option-content')
      .filter({ hasText: tenViTri })
      .first()
    await highlightStep(this.page, option, 200)
    await option.click()
  }

  async uploadHinhAnh(fileName: string): Promise<void> {
    const filePath = join(__dirname, "..", "tests", "data", fileName)
    const uploadLabel = this.page.locator('label[for="hinhAnh"]')
    await highlightStep(this.page, uploadLabel, 200)
    await this.uploadImageInput.setInputFiles(filePath)
    await this.page.waitForTimeout(2000)
  }

  async fillForm(data: {
    tenPhong: string
    moTa: string
    tenViTri: string
    soKhach: string
    soPhongNgu: string
    soGiuongNgu: string
    soPhongTam: string
    giaPhong: string
    fileName: string
  }): Promise<void> {
    await this.uploadHinhAnh(data.fileName)

    await highlightStep(this.page, this.tenPhongInput, 200)
    await this.tenPhongInput.fill(data.tenPhong)

    await highlightStep(this.page, this.moTaInput, 200)
    await this.moTaInput.fill(data.moTa)

    await this.chonViTri(data.tenViTri)

    await highlightStep(this.page, this.soKhachInput, 200)
    await this.soKhachInput.fill(data.soKhach)

    await highlightStep(this.page, this.soPhongNguInput, 200)
    await this.soPhongNguInput.fill(data.soPhongNgu)

    await highlightStep(this.page, this.soGiuongNguInput, 200)
    await this.soGiuongNguInput.fill(data.soGiuongNgu)

    await highlightStep(this.page, this.soPhongTamInput, 200)
    await this.soPhongTamInput.fill(data.soPhongTam)

    await highlightStep(this.page, this.giaPhongInput, 200)
    await this.giaPhongInput.fill(data.giaPhong)
  }

  async submit(): Promise<void> {
    await this.submitBtn.waitFor({ state: 'visible', timeout: 10000 })
    await highlightStep(this.page, this.submitBtn, 200)
    await this.submitBtn.click()
  }

  async clickEditBtn(index: number = 0): Promise<void> {
    const editBtns = this.page.locator('button[aria-label="Actions"]')
    await editBtns.nth(index).waitFor({ state: 'visible', timeout: 10000 })
    await editBtns.nth(index).click()
    await this.page.waitForSelector('.ant-modal-content', { timeout: 10000 })
  }

  async fillUpdateAndSubmit(data: {
    tenPhong?: string
    moTa?: string
    soKhach?: string
    soPhongNgu?: string
    soGiuongNgu?: string
    soPhongTam?: string
    giaPhong?: string
  }): Promise<void> {
    if (data.tenPhong) {
      await this.tenPhongInput.clear()
      await this.tenPhongInput.fill(data.tenPhong)
    }
    if (data.moTa) {
      await this.moTaInput.clear()
      await this.moTaInput.fill(data.moTa)
    }
    if (data.soKhach) {
      await this.soKhachInput.clear()
      await this.soKhachInput.fill(data.soKhach)
    }
    if (data.soPhongNgu) {
      await this.soPhongNguInput.clear()
      await this.soPhongNguInput.fill(data.soPhongNgu)
    }
    if (data.soGiuongNgu) {
      await this.soGiuongNguInput.clear()
      await this.soGiuongNguInput.fill(data.soGiuongNgu)
    }
    if (data.soPhongTam) {
      await this.soPhongTamInput.clear()
      await this.soPhongTamInput.fill(data.soPhongTam)
    }
    if (data.giaPhong) {
      await this.giaPhongInput.clear()
      await this.giaPhongInput.fill(data.giaPhong)
    }

    await this.updateBtn.waitFor({ state: 'visible', timeout: 10000 })
    await this.updateBtn.click()
  }
}