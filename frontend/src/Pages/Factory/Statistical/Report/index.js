import { Button, Form, InputNumber, Tabs, Typography } from "antd";
import { useMemo, useState } from "react";
import FactoryLayout from "../../../../Layouts/FactoryLayout";
import { SearchOutlined } from "@ant-design/icons";
import MonthyReport from "./MonthyReport";
import QuarteryReport from "./QuarteryReport";
import YearyReport from "./YearyReport";
import YearSearch from "../../../../Components/HeaderExtra/YearSearch";
import FromToYearSearch from "../../../../Components/HeaderExtra/FromToYearSearch";

export default function Report() {
  const [currentTabKey, setCurrentTabKey] = useState(1);
  const [searchValue, setSearchValue] = useState();
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
    []
  );

  const handleSearch = (values) => {
    setSearchValue(values);
  };
  return (
    <FactoryLayout
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
    </FactoryLayout>
  );
}
