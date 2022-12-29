import { useEffect, useState } from "react";
import indexApi from "../../../apis";
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
    const res = await indexApi.analizeSoldErrorAmount(
      params.managerId,
      params.type,
      params.option,
      params.year,
      params.secondYear
    );

    console.log(res);

    if (res.success) {
      setData(buildData(res.data));
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

    console.log(builtData);
    return builtData;
  };
  return (
    <>
      {data && (
        <LineChart data={data} title={title} titleX={titleX} titleY={titleY} />
      )}
    </>
  );
}
