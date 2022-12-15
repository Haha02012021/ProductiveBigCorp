import { Button, Form, InputNumber, Tabs, Typography } from "antd";
import { useMemo, useState } from "react";
import FactoryLayout from "../../../../Layouts/FactoryLayout";
import { SearchOutlined } from "@ant-design/icons";
import MonthyReport from "./MonthyReport";
import QuarteryReport from "./QuarteryReport";
import YearyReport from "./YearyReport";

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
            <Form layout="inline" onFinish={handleSearch}>
              <Form.Item name="from" label="Năm">
                <InputNumber />
              </Form.Item>
              <Typography.Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  marginRight: 16,
                }}
              >
                đến
              </Typography.Text>
              <Form.Item name="to" label="Năm" style={{ marginRight: 0 }}>
                <InputNumber />
              </Form.Item>
              <Button
                htmlType="submit"
                icon={<SearchOutlined />}
                type="primary"
              />
            </Form>
          ) : (
            <Form layout="inline" onFinish={handleSearch}>
              <Form.Item name="year" label="Năm" style={{ marginRight: 0 }}>
                <InputNumber />
              </Form.Item>
              <Button
                htmlType="submit"
                icon={<SearchOutlined />}
                type="primary"
              />
            </Form>
          ),
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} onChange={(key) => setCurrentTabKey(key)} />
    </FactoryLayout>
  );
}
