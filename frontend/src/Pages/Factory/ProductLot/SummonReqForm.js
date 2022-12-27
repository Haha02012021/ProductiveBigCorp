import { Form, Input } from "antd";
import { useEffect } from "react";

export default function SummonReqForm({ form }) {
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);
  return (
    <Form form={form} style={{ paddingTop: 16 }}>
      <Form.Item name="error" label="Lỗi">
        <Input.TextArea placeholder="Nhập lỗi" />
      </Form.Item>
    </Form>
  );
}
