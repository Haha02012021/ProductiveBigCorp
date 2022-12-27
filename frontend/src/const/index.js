export const ttl = 1000 * 60 * 60 * 2; //2h

export const errorMessages = {
  unitForm: {
    role: "Bạn phải chọn loại đơn vị!",
    name: "Bạn phải nhập tên!",
    place: "Bạn phải chọn chi nhánh!",
    account: "Bạn phải nhập tên tài khoản!",
    password: "Bạn phải nhập mật khẩu!",
    repassword: "Bạn phải nhập lại mật khẩu!",
    wrongRepassword: "Nhập lại mật khẩu không đúng!",
    nameLength: "Chỉ được nhập dưới 80 kí tự!",
    passwordLength: "Mật khẩu phải có ít nhất 8 ký tự!",
    accountLength: "Chỉ được nhập dưới 20 ký tự!",
    errorSubmit: "Tạo đơn vị không thành công!",
  },
  lineForm: {
    name: "Bạn phải nhập dòng sản phẩm!",
    colors: "Hãy chọn ít nhất 1 màu!",
    nameLength: "Chỉ được nhập dưới 40 kí tự!",
  },
  versionForm: {},
};

export const progress = {
  "-1": {
    context: "Đã hủy",
    color: "red",
  },
  0: {
    context: "Chờ xác nhận",
    color: "grey",
  },
  1: {
    context: "Đang giao hàng",
    color: "lightblue",
  },
  2: {
    context: "Đã nhận hàng",
    color: "blue",
  },
};

export const dateFormat = "YYYY-MM-DD";

export const statuses = {
  1: {
    content: "Đã sản xuất",
    color: "",
  },
  2: {
    content: "Yêu cầu từ nhà máy",
    color: "",
  },
  3: {
    content: "Vận chuyển để bán",
    color: "",
  },
  4: {
    content: "Tồn kho đại lý",
    color: "",
  },
  5: {
    content: "Đã bán",
    color: "",
  },
  6: {
    content: "Yêu cầu bảo hành",
    color: "",
  },
  7: {
    content: "Chờ xác nhận bảo hành",
    color: "",
  },
  8: {
    content: "Đang bảo hành",
    color: "",
  },
  9: {
    content: "Đã sửa",
    color: "",
  },
  10: {
    content: "Đã bảo hành và gửi lại đại lý",
    color: "",
  },
  11: {
    content: "Đã bảo hành và đến đại lý",
    color: "",
  },
  12: {
    content: "Hỏng",
    color: "",
  },
  13: {
    content: "Trả về nhà máy",
    color: "",
  },
  14: {
    content: "Đã đến nhà máy",
    color: "",
  },
  15: {
    content: "Đã hủy",
    color: "",
  },
  16: {
    content: "Đã triệu hồi",
    color: "",
  },
};
