import { useMemo } from "react";
import ColumnChart from "./ColumnChart";

export default function YearyChart({
  data,
  title = "Biểu đồ số liệu sản phẩm từ năm 2010 đến năm 2013",
}) {
  const config = useMemo(() => {
    return {
      data: data,
      isGroup: true,
      xField: "year",
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
  return (
    <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <ColumnChart
        titleY="Số lượng sản phẩm"
        titleX="Năm"
        title={title}
        config={config}
      />
    </div>
  );
}
