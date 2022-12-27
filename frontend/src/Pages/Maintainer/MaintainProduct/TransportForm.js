import { Form, Select } from "antd";

const options = [
  {
    label: "Nhà máy",
    value: 2,
  },
  {
    label: "Đại lý phân phối",
    value: 4,
  },
];
export default function TransportForm({ form }) {
  return (
    <Form form={form} style={{ paddingTop: 16 }} layout="vertical">
      <Form.Item label="Vận chuyển đến">
        <Select placeholder="Chọn loại đơn vị" options={options} />
      </Form.Item>
      <Form.Item label="Vận chuyển sản phẩm">
        <Select placeholder="Chọn sản phẩm" />
      </Form.Item>
    </Form>
  );
}
