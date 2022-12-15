import { Column } from "@ant-design/plots";
import { Col, Row, Typography } from "antd";

export default function ColumnChart({
  config,
  titleY = "Tilte Y",
  titleX = "Title X",
  title = "Title",
}) {
  return (
    <Col>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Typography.Text>{title}</Typography.Text>
      </Row>
      <Row gutter={[24]}>
        <Col
          span={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(180deg)",
          }}
        >
          <div
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "12px",
            }}
          >
            {titleY}
          </div>
        </Col>
        <Col span={23}>
          <Column {...config} />
        </Col>
      </Row>
      <Row gutter={[24]}>
        <Col span={1}></Col>
        <Col
          span={23}
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          {titleX}
        </Col>
      </Row>
    </Col>
  );
}
