import { Pie } from "@ant-design/plots";
import { Col, Row, Typography } from "antd";

export default function PieChart({ config, title }) {
  return (
    <div>
      <Pie {...config} />
      <Typography.Text
        style={{ display: "flex", justifyContent: "center", fontWeight: 400 }}
      >
        {title}
      </Typography.Text>
    </div>
  );
}
