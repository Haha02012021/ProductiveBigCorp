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
    context: "Chuẩn bị hàng",
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
