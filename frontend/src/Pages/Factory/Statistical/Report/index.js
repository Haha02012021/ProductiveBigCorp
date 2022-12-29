import { Tabs } from "antd";
import { useMemo, useState } from "react";
import MonthyReport from "./MonthyReport";
import QuarteryReport from "./QuarteryReport";
import YearyReport from "./YearyReport";
import YearSearch from "../../../../Components/HeaderExtra/YearSearch";
import FromToYearSearch from "../../../../Components/HeaderExtra/FromToYearSearch";
import PageContent from "../../../../Components/PageContent";

export default function Report() {
  const [currentTabKey, setCurrentTabKey] = useState(1);
  const [searchValue, setSearchValue] = useState({
    year: new Date().getFullYear(),
    secondYear: new Date().getFullYear(),
  });
  const handleSearch = (values) => {
    setSearchValue(values);
  };
  const tabItems = useMemo(
    () => [
      {
        label: `Tháng`,
        key: "1",
        children: <MonthyReport req={searchValue} />,
      },
      {
        label: `Quý`,
        key: "2",
        children: <QuarteryReport req={searchValue} />,
      },
      {
        label: `Năm`,
        key: "3",
        children: <YearyReport req={searchValue} />,
      },
    ],
    [searchValue]
  );
  return (
    <PageContent
      pageHeaderProps={{
        title: "Báo cáo số liệu sản xuất",
        customAction:
          currentTabKey === "3" ? (
            <FromToYearSearch onFinish={handleSearch} />
          ) : (
            <YearSearch onFinish={handleSearch} />
          ),
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} onChange={(key) => setCurrentTabKey(key)} />
    </PageContent>
  );
}
