import { useContext, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import QuarteryColumnChart from "../../../../Components/Chart/Column/QuarteryColumnChart";
import { statuses } from "../../../../const";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function QuarteryReport({ req }) {
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
      "quarter",
      req.year
    );
    if (res.success) {
      setData(buildData(res.data));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((status) => {
      return {
        year: "Quý " + status["QUARTER(`createdAt`)"],
        name: statuses[status.status_id].content,
        amount: status.count,
      };
    });
    return builtData;
  };
  return (
    <>
      {data && (
        <QuarteryColumnChart
          data={data}
          title={`Biểu đồ số liệu sản phẩm theo quý năm ${req.year}`}
        />
      )}
    </>
  );
}
