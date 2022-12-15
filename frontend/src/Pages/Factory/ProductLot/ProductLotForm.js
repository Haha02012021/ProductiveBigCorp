import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";

export default function ProductLotForm() {
  return (
    <Form
      labelCol={{ md: { span: 6 } }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      <Form.Item label="Thời gian" required name="time">
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Nhập ngày sản xuất"
        />
      </Form.Item>
      <Form.Item label="Số lô" required name="batchNumber">
        <Input placeholder="Nhập số lô" />
      </Form.Item>
      <Form.Item label="Dòng sản phẩm" required name="productLine">
        <Input placeholder="Nhập dòng sản phẩm" />
      </Form.Item>
      <Row gutter={[24]}>
        <Col span={13}>
          <Form.Item
            labelCol={{ span: 11 }}
            label="Phiên bản"
            required
            name="version"
          >
            <Select
              placeholder="Chọn phiên bản"
              style={{ width: "100%" }}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            labelCol={{ span: 8 }}
            label="Số lượng"
            required
            name="amount"
          >
            <InputNumber
              placeholder="Nhập số lượng"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
