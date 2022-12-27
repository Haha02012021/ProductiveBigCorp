import { Form, Input } from "antd";

export default function DoneMaintainForm({ form }) {
  return (
    <Form form={form} style={{ paddingTop: 16 }}>
      <Form.Item label="Lỗi" name="error">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}
