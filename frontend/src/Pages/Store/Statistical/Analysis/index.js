import { Tabs } from "antd";
import { useMemo, useState } from "react";
import FromToYearSearch from "../../../../Components/HeaderExtra/FromToYearSearch";
import YearSearch from "../../../../Components/HeaderExtra/YearSearch";
import StoreLayout from "../../../../Layouts/StoreLayout";
import MonthyAnalysis from "./MonthyAnalysis";
import QuarteryAnalysis from "./QuarteryAnalysis";
import YearyAnalysis from "./YearyAnalysis";

export default function Analysis() {
  const [currentTabKey, setCurrentTabKey] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const tabItems = useMemo(
    () => [
      {
        label: `Tháng`,
        key: "1",
        children: <MonthyAnalysis req={searchValue} />,
      },
      {
        label: `Quý`,
        key: "2",
        children: <QuarteryAnalysis req={searchValue} />,
      },
      {
        label: `Năm`,
        key: "3",
        children: <YearyAnalysis req={searchValue} />,
      },
    ],
    []
  );
  const handleSearch = (values) => {};
  return (
    <StoreLayout
      pageHeaderProps={{
        title: "Phân tích số lượng tiêu thụ",
        customAction:
          currentTabKey !== "3" ? (
            <YearSearch onFinish={handleSearch} />
          ) : (
            <FromToYearSearch onFinish={handleSearch} />
          ),
      }}
    >
      <Tabs items={tabItems} onChange={(key) => setCurrentTabKey(key)} />
    </StoreLayout>
  );
}
