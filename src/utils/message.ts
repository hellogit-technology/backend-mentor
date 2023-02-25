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
  ER009: (param: string) => `Chỉ cho phép các định dạng file là: ${param}`,
  ER0010: (param: string) => `Dung lượng tối đa của file tải lên là ${param}`,
  ER0011: `Vui lòng chọn file để tải lên`,
  ER0012: `Không nhập ký tự đặc biệt.`,
  ER0013: (param: string) => `Vui lòng nhập link ${param}`,

  // Auth
  RES001: `Thông tin đăng nhập không đúng.`,
  RES002A: (param: string) => `Cập nhật ${param} thất bại.`,
  RES002B: (param: string) => `Cập nhật ${param} thành công.`,
  RES003A: (param: string) => `Xóa ${param} thất bại.`,
  RES003B: (param: string) => `Xóa ${param} thành công.`,
  RES004A: (param: string) => `Tạo mới ${param} thất bại.`,
  RES004B: (param: string) => `Tạo mới ${param} thành công.`,
  RES005: `Tài khoản không thể truy cập.`,
  RES006: `Đã có sự cố xảy ra.`,

  // Excel File
  XLS001: (param: string) => `Định dạng tiêu đề không đúng (tiêu đề đúng: ${param})`,
  XLS002: (param: number) => `Không đủ số lượng data (yêu cầu ${param})`,
  XLS003: (param: string, length: number, current: number) => `${param} tối đa ${length} ký tự. (hiện tại ${current} ký tự.)`,
  XLS004: (param: string) => `${param} không nhập ký tự icon, ký tự 2 byte.`,
  XLS005: (param: string) => `${param} đã tồn tại.`,
  XLS006: (param: string) => `${param} bị trùng lặp.`,
  XLS007: (param: string) => `Format ${param} bị sai. `
};
