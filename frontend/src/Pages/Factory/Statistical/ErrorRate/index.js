import { useContext, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import PieChart from "../../../../Components/Chart/PieChart";
import PageContent from "../../../../Components/PageContent";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function ErrorRate() {
  const { authUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (authUser) {
      analize();
    }
  }, [authUser]);

  const analize = async () => {
    const res = await indexApi.analizeErrorRateByModel(authUser.id);
    if (res.success) {
      setData(res.data);
    }
  };

  return (
    <PageContent
      pageHeaderProps={{
        title: "Tỉ lệ sản phẩm lỗi",
      }}
      showSearch={false}
    >
      {data.length > 0 ? (
        <PieChart
          title="Biểu đồ biểu diễn tỉ lệ sản phẩm lỗi theo các dòng"
          data={data}
        />
      ) : (
        <div>Chưa có sản phẩm!</div>
      )}
    </PageContent>
  );
}
