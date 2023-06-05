const messageVietnamese = {
    // Input Validation
    ER001: (param) => `Mục ${param} bắt buộc nhập.`,
    ER002A: (param, length, current) => `Mục ${param} tối đa ${length} ký tự. (hiện tại ${current} ký tự.)`,
    ER002B: (param, length, current) => `Mục ${param} tối thiểu ${length} ký tự. (hiện tại ${current} ký tự.)`,
    ER003: `Email nhập không hợp lệ.`,
    ER004: `Không nhập ký tự icon, ký tự 2 byte.`,
    ER005: `Không được nhập dấu cách.`,
    ER006: `Xác nhận mật khẩu không trùng khớp.`,
    ER007: (param) => `${param} đã tồn tại.`,
    ER008: `Không nhập ký tự in hoa.`,
    ER009: (param) => `Chỉ cho phép các định dạng file là ${param}`,
    ER0010: (param) => `Dung lượng file tối đa là ${param}`,
    ER0011: `Vui lòng chọn file để tải lên`,
    ER0012: `Không nhập ký tự đặc biệt.`,
    ER0013: (param) => `Vui lòng nhập link ${param}`,
    ER0014: `Vui lòng nhập ngày tháng năm hợp lệ`,
  
    // Auth
    RES001: `Thông tin đăng nhập không đúng.`,
    RES002A: (param) => `Cập nhật ${param} thất bại.`,
    RES002B: (param) => `Cập nhật ${param} thành công.`,
    RES003A: (param) => `Xóa ${param} thất bại.`,
    RES003B: (param) => `Xóa ${param} thành công.`,
    RES004A: (param) => `Tạo mới ${param} thất bại.`,
    RES004B: (param) => `Tạo mới ${param} thành công.`,
    RES005: `Tài khoản không thể truy cập.`,
    RES006: `Đã có sự cố xảy ra.`,
  
};