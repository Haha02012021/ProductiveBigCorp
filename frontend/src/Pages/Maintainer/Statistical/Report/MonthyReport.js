import { useContext, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import MonthyColumnChart from "../../../../Components/Chart/Column/MonthyColumnChart";
import { statuses } from "../../../../const";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function MonthyReport({ req }) {
  const { authUser } = useContext(AuthContext);
  const [data, setData] = useState();
  useEffect(() => {
    if (authUser && req) {
      analize();
    }
  }, [authUser, req]);
  const analize = async () => {
    const res = await indexApi.analizeAmount(
      authUser.id,
      authUser.role,
      "month",
      req.year
    );
    if (res.success) {
      setData(buildData(res.data));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((status) => {
      return {
        month: "Tháng " + status["MONTH(`createdAt`)"],
        monthNumber: status["MONTH(`createdAt`)"],
        name: statuses[status.status_id].content,
        amount: status.count,
      };
    });
    return builtData;
  };
  return (
    <>
      {data && (
        <MonthyColumnChart
          data={data}
          firstTitle={`Biểu đồ số liệu sản phẩm theo 6 tháng đầu năm ${req.year}`}
          lastTitle={`Biểu đồ số liệu sản phẩm theo 6 tháng cuối năm ${req.year}`}
          title={`Biểu đồ số liệu sản phẩm năm ${req.year}`}
        />
      )}
    </>
  );
}
