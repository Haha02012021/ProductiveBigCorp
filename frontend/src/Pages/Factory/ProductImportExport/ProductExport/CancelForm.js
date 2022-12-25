import { Form, Input } from "antd";

export default function CancelForm({ form, reqId }) {
  return (
    <Form form={form} style={{ paddingTop: 16 }}>
      <Form.Item label="Lý do hủy" name="cancelReason">
        <Input.TextArea placeholder="Nhập lý do" />
      </Form.Item>
    </Form>
  );
}
