import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Typography } from "antd";

export default function FromToYearSearch({ onFinish }) {
  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item name="year" label="Năm">
        <InputNumber />
      </Form.Item>
      <Typography.Text
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          marginRight: 16,
        }}
      >
        đến
      </Typography.Text>
      <Form.Item name="secondYear" label="Năm" style={{ marginRight: 0 }}>
        <InputNumber />
      </Form.Item>
      <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
    </Form>
  );
}
