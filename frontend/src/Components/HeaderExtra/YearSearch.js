import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber } from "antd";

export default function YearSearch({ onFinish }) {
  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item name="year" label="Năm" style={{ marginRight: 0 }}>
        <InputNumber />
      </Form.Item>
      <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
    </Form>
  );
}
