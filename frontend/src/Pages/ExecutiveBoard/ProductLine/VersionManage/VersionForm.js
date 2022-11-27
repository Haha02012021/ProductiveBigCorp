import {
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
} from "antd";

export default function VersionForm({ form }) {
  const handleChange = () => {};

  return (
    <Form
      labelCol={{ sm: 6, md: 4 }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      form={form}
    >
      <Form.Item label="Dòng sản phẩm" required name="productLine">
        <Select placeholder="Chọn dòng sản phẩm" />
      </Form.Item>
      <Form.Item label="Phiên bản" required name="version">
        <Select placeholder="Chọn phiên bản" />
      </Form.Item>
      <Form.Item label="Thông số" required>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={handleChange}
          bordered
          ghost
        >
          <Collapse.Panel header="Kích thước - Khối lượng" key="1">
            <Form.Item
              labelCol={{ sm: { span: 6 }, md: { span: 8 } }}
              label="Kích thước tổng thể"
              required
              style={{ margin: 0 }}
            >
              <Space size={[20, 0]}>
                <Form.Item
                  name={["specifications", "overallSize", "length"]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều dài"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={["specifications", "overallSize", "width"]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều rộng"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={["specifications", "overallSize", "height"]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều cao"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 6 }, md: { span: 8 } }}
              label="Chiều dài cơ sở"
              required
              name={["specifications", "standardLength"]}
            >
              <InputNumber
                placeholder="Nhập chiều dài cơ sở"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 6 }, md: { span: 8 } }}
              label="Bán kính vòng quay tối thiểu"
              labelWrap
              required
              name={["specifications", "radius"]}
            >
              <InputNumber
                placeholder="Nhập bán kính"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Động cơ hộp số" key="2">
            <Form.Item
              name={["specifications", "sportMode"]}
              label="Chế độ thể thao"
              labelCol={{ sm: { span: 6 }, md: { span: 8 } }}
              required
            >
              <Switch
                checkedChildren="Có"
                unCheckedChildren="Không"
                defaultChecked={false}
              />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Khung gầm" key="4">
            <p>mnp</p>
          </Collapse.Panel>
          <Collapse.Panel header="Ngoại thất" key="5">
            <p>mnp</p>
          </Collapse.Panel>
          <Collapse.Panel header="Nội thất" key="6">
            <p>mnp</p>
          </Collapse.Panel>
          <Collapse.Panel header="An toàn" key="7">
            <p>mnp</p>
          </Collapse.Panel>
          <Collapse.Panel header="I-ACTIVSENSE" key="8">
            <p>mnp</p>
          </Collapse.Panel>
        </Collapse>
      </Form.Item>
    </Form>
  );
}
