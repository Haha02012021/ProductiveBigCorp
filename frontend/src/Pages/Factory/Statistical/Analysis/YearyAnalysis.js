import { useContext, useEffect, useState } from "react";
import AnalysisLineChart from "../../../../Components/Chart/Line/AnalysisLineChart";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function MonthyAnalysis({ req }) {
  const { authUser } = useContext(AuthContext);
  const [params, setParams] = useState();

  useEffect(() => {
    if (authUser && req) {
      setParams({
        managerId: authUser.id,
        type: "sold",
        option: "year",
        year: req.year,
        secondYear: req.secondYear,
      });
    }
  }, [authUser, req]);

  return (
    <>
      {req && (
        <AnalysisLineChart
          params={params}
          title={`Biểu đồ phân tích lượng sản phẩm tiêu thụ theo các năm từ năm ${req.year} đến năm ${req.secondYear}`}
          endIndex={req.secondYear}
          titleX="Năm"
          startIndex={req.year}
        />
      )}
    </>
  );
}
