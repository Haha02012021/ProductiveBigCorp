import { Space } from "antd";
import { useMemo } from "react";
import ColumnChart from "../ColumnChart";

export default function MonthyColumnChart({
  data,
  firstTitle = "Biểu đồ số liệu sản phẩm theo 6 tháng đầu năm 2010",
  lastTitle = "Biểu đồ số liệu sản phẩm theo 6 tháng cuối năm 2010",
  isGroup = true,
  isStack = false,
}) {
  const first6MonthsConfig = useMemo(() => {
    return {
      data: data.slice(0, data.length / 2),
      isGroup,
      isStack,
      xField: "month",
      yField: "amount",
      seriesField: "name",

      /** 设置颜色 */
      //   color: ["#1ca9e6", "#f88c24"],

      /** 设置间距 */
      marginRatio: 0,
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    };
  }, []);

  const last6MonthsConfig = useMemo(() => {
    return {
      data: data.slice(data.length / 2, data.length),
      isGroup,
      isStack,
      xField: "MONTH(`createdAt`)",
      yField: "count",
      seriesField: "name",

      /** 设置颜色 */
      //   color: ["#1ca9e6", "#f88c24"],

      /** 设置间距 */
      marginRatio: 0,
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    };
  }, []);
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", paddingTop: "40px", paddingBottom: "40px" }}
      size={[0, 40]}
    >
      <ColumnChart
        titleY="Số lượng sản phẩm"
        titleX="Tháng"
        title={firstTitle}
        config={first6MonthsConfig}
      />
      <ColumnChart
        titleY="Số lượng sản phẩm"
        titleX="Tháng"
        title={lastTitle}
        config={last6MonthsConfig}
      />
    </Space>
  );
}
