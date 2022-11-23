import { Button, Divider, Space } from "antd";

export default function ActionsCell() {
  return (
    <Space split={<Divider type="vertical" />} size>
      <Button type="primary">Xem</Button>
      <Button type="primary" style={{ background: "#256D85" }}>
        Sửa
      </Button>
      <Button type="primary" danger>
        Xóa
      </Button>
    </Space>
  );
}
