import { Tabs } from "antd";
import { useMemo, useState } from "react";
import FromToYearSearch from "../../../../Components/HeaderExtra/FromToYearSearch";
import YearSearch from "../../../../Components/HeaderExtra/YearSearch";
import PageContent from "../../../../Components/PageContent";
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
    [searchValue]
  );
  const handleSearch = (values) => {
    setSearchValue(values);
  };
  return (
    <PageContent
      pageHeaderProps={{
        title: "Phân tích số lượng tiêu thụ",
        customAction:
          currentTabKey !== "3" ? (
            <YearSearch onFinish={handleSearch} />
          ) : (
            <FromToYearSearch onFinish={handleSearch} />
          ),
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} onChange={(key) => setCurrentTabKey(key)} />
    </PageContent>
  );
}
