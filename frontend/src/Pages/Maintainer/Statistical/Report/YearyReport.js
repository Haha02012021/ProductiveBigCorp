import { useContext, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import YearyColumnChart from "../../../../Components/Chart/Column/YearyColumnChart";
import { statuses } from "../../../../const";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function YearyReport({ req }) {
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
      "year",
      req.year,
      req.secondYear
    );
    if (res.success) {
      setData(buildData(res.data));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((status) => {
      return {
        year: "Năm " + status["YEAR(`createdAt`)"],
        name: statuses[status.status_id].content,
        amount: status.count,
      };
    });
    return builtData;
  };
  return (
    <>
      {data && (
        <YearyColumnChart
          data={data}
          title={`Biểu đồ số liệu sản phẩm từ năm ${req.year} đến năm ${req.secondYear}`}
        />
      )}
    </>
  );
}
