import { useEffect, useState } from "react";
import indexApi from "../../../apis";
import coporationApi from "../../../apis/coporation";
import LineChart from "../LineChart";

export default function AnalysisLineChart({
  title,
  titleX,
  titleY = "Số lượng sản phẩm",
  params,
  endIndex = 12,
  startIndex = 1,
}) {
  const [data, setData] = useState();
  useEffect(() => {
    if (params) {
      analizeErrorSoldAmount();
    }
  }, [params]);

  const analizeErrorSoldAmount = async () => {
    try {
      if (params.role === "1") {
        const res = await coporationApi.analizeErrorSoldAmount(
          params.type,
          params.option,
          params.year,
          params.secondYear
        );
        if (res.success) {
          setData(buildData(res.data));
        }
      } else {
        const res = await indexApi.analizeSoldErrorAmount(
          params.managerId,
          params.type,
          params.option,
          params.year,
          params.secondYear
        );
        if (res.success) {
          setData(buildData(res.data));
        }
      }
    } catch (error) {
      setData([]);
    }
  };

  const buildData = (data) => {
    const builtData = [];
    let cloneData = [...data];

    let i = startIndex;
    while (i <= endIndex) {
      if (cloneData.length > 0 && cloneData[0].time === i) {
        const item = cloneData.shift();
        builtData.push({
          time: item.time.toString(),
          "Số lượng": item.count,
        });
      } else {
        builtData.push({
          time: i.toString(),
          "Số lượng": 0,
        });
      }
      i++;
    }
    return builtData;
  };
  return (
    <>
      {data ? (
        data.length > 0 ? (
          <LineChart
            data={data}
            title={title}
            titleX={titleX}
            titleY={titleY}
          />
        ) : (
          <div>Chưa có sản phẩm</div>
        )
      ) : null}
    </>
  );
}
