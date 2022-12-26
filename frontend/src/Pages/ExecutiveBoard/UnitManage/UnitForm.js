import { Form, Input, Select } from "antd";
import { errorMessages } from "../../../const";

const UNIT_TYPES = [
  {
    name: "Cơ sở sản xuất",
    role: 2,
  },
  {
    name: "Đại lý phân phối",
    role: 4,
  },
  {
    name: "Trung tâm bảo hành",
    role: 3,
  },
];

const CITIES = ["Hà Nội", "Thái Bình", "Bắc Ninh"];

export default function UnitForm({ form, isEdit = false }) {
  return (
    <Form
      form={form}
      labelCol={{ sm: { span: 8 }, md: { span: 6 } }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      autoComplete="off"
    >
      <Form.Item
        label="Loại đơn vị"
        required
        name="role"
        rules={[{ required: true, message: errorMessages.unitForm.role }]}
      >
        <Select
          disabled={isEdit}
          placeholder="Chọn đơn vị"
          defaultValue={form.getFieldValue("role")}
          options={UNIT_TYPES.map((type) => {
            return { label: type.name, value: type.role };
          })}
        />
      </Form.Item>
      <Form.Item
        label="Tên"
        required
        name="name"
        rules={[
          { required: true, message: errorMessages.unitForm.name },
          {
            type: "string",
            max: 80,
            message: errorMessages.unitForm.nameLength,
          },
        ]}
      >
        <Input placeholder="Nhập tên" />
      </Form.Item>
      <Form.Item
        label="Chi nhánh"
        required
        name="place"
        rules={[{ required: true, message: errorMessages.unitForm.place }]}
      >
        <Select
          disabled={isEdit}
          placeholder="Chọn thành phố"
          options={CITIES.map((city) => {
            return { label: city, value: city };
          })}
        />
      </Form.Item>
      <Form.Item
        label="Tên tài khoản"
        required
        name="account"
        rules={[
          { required: true, message: errorMessages.unitForm.account },
          {
            type: "string",
            max: 20,
            message: errorMessages.unitForm.accountLength,
          },
        ]}
      >
        <Input
          placeholder="Nhập tên tài khoản"
          disabled={isEdit}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        required
        name="password"
        rules={[
          { required: true, message: errorMessages.unitForm.password },
          {
            type: "string",
            min: 8,
            message: errorMessages.unitForm.passwordLength,
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        required
        name="repassword"
        rules={[
          { required: true, message: errorMessages.unitForm.repassword },
          {
            type: "string",
            min: 8,
            message: errorMessages.unitForm.passwordLength,
          },
          {
            validator: (_, value) => {
              if (value === form.getFieldValue("password")) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(errorMessages.unitForm.wrongRepassword)
              );
            },
          },
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu" autoComplete="off" />
      </Form.Item>
    </Form>
  );
}
