import { Pie } from "@ant-design/plots";
import { Typography } from "antd";
import { G2 } from "@ant-design/plots";

export default function PieChart({ title, data }) {
  const G = G2.getEngine("canvas");
  const config = {
    appendPadding: 48,
    data,
    angleField: "count",
    colorField: "name",
    radius: 0.75,
    legend: false,
    label: {
      type: "spider",
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 8,
            text: `${data.name}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 0,
            y: 25,
            text: ` ${Math.round(data.percent * 100)}%`,
            fill: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
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
