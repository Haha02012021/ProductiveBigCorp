import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber } from "antd";

export default function YearSearch({ onFinish }) {
  return (
    <Form
      layout="inline"
      onFinish={onFinish}
      initialValues={{ year: new Date().getFullYear() }}
    >
      <Form.Item name="year" label="Năm" style={{ marginRight: 0 }}>
        <InputNumber placeholder="Nhập năm" />
      </Form.Item>
      <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
    </Form>
  );
}
