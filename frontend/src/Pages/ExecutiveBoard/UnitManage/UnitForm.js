import { Form, Input, Select } from "antd";

const UNIT_TYPES = [
  {
    name: "Cơ sở sản xuất",
    role: 1,
  },
  {
    name: "Đại lý phân phối",
    role: 2,
  },
  {
    name: "Trung tâm bảo hành",
    role: 3,
  },
];

export default function UnitForm({ form }) {
  return (
    <Form
      form={form}
      labelCol={{ sm: { span: 8 }, md: { span: 6 } }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      <Form.Item label="Loại đơn vị" required name="unitType">
        <Select
          placeholder="Chọn đơn vị"
          options={UNIT_TYPES.map((type) => {
            return { label: type.name, value: type.role };
          })}
        />
      </Form.Item>
      <Form.Item label="Tên" required name="name">
        <Input placeholder="Nhập tên" />
      </Form.Item>
      <Form.Item label="Tên tài khoản" required name="username">
        <Input placeholder="Nhập tên tài khoản" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Mật khẩu" required name="password">
        <Input.Password placeholder="Nhập mật khẩu" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Nhập lại mật khẩu" required name="repassword">
        <Input.Password placeholder="Nhập lại mật khẩu" autoComplete="off" />
      </Form.Item>
    </Form>
  );
}
