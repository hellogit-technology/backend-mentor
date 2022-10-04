export const messageVietnamese = {
  // Input Validation
  ER001: (param: string) => `Mục ${param} bắt buộc nhập.`,
  ER002A: (param: string, length: number, current: number) => `Mục ${param} tối đa ${length} ký tự. (hiện tại ${current} ký tự.)`,
  ER002B: (param: string, length: number, current: number) => `Mục ${param} tối thiểu ${length} ký tự. (hiện tại ${current} ký tự.)`,
  ER003: `Email nhập không hợp lệ.`,
  ER004: `Không nhập ký tự icon, ký tự 2 byte.`,
  ER005: `Không được nhập dấu cách.`,
  ER006: `Xác nhận mật khẩu không trùng khớp.`,
  ER007: (param: string) => `${param} đã tồn tại.`,
  ER008: `Không nhập ký tự in hoa.`,

  // Auth
  RES001: `Thông tin đăng nhập không đúng.`,
  RES002A: `Cập nhật thất bại.`,
  RES002B: `Cập nhật thành công.`,
  RES003A: `Xóa thất bại.`,
  RES003B: `Xóa thành công.`,
  RES004A: `Tạo mới thất bại.`,
  RES004B: `Tạo mới thành công.`,
  RES005: `Tài khoản không thể truy cập.`
};
