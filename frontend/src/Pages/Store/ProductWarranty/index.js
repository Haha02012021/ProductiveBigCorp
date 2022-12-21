import React, { useState, useMemo } from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { Tabs } from "antd";
import { createDataTable } from "../../../Components/Table/createDataTable";
import PageContent from "../../../Components/PageContent";

const ProductWarranty = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const warrantyColumns = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: "productCode",
        key: "productCode",
        width: 140,
        height: 56,
      },
      {
        title: "Sản phẩm",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Lỗi",
        dataIndex: "error",
        key: "error",
        width: 100,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 100,
      },
      {
        title: "Ngày gửi",
        dataIndex: "sentDate",
        key: "sentDate",
        width: 140,
      },
      {
        title: "Ngày xử lý xong",
        dataIndex: "finishedDate",
        key: "finishedDate",
        width: 140,
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 150,
        render: () => <ActionsCell hasConfirm={false} hasView={false} />,
      },
    ],
    []
  );

  const recallProductColumns = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: "productCode",
        key: "productCode",
        fixed: true,
        width: 140,
        height: 56,
      },
      {
        title: "Sản phẩm",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Lỗi",
        dataIndex: "error",
        key: "error",
        width: 100,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 100,
      },
      {
        title: "Ngày gửi",
        dataIndex: "sentDate",
        key: "sentDate",
        width: 140,
      },
      {
        title: "Ngày xử lý xong",
        dataIndex: "finishedDate",
        key: "finishedDate",
        width: 140,
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 150,
        render: () => <ActionsCell hasConfirm={false} hasView={false} />,
      },
    ],
    []
  );

  const warrantyDataSource = createDataTable(warrantyColumns, 5);
  const recallDataSource = createDataTable(recallProductColumns, 5);

  const tabItems = useMemo(
    () => [
      {
        label: `Sản phẩm bảo hành`,
        key: "1",
        children: (
          <CustomTable
            dataSource={warrantyDataSource}
            columns={warrantyColumns}
          />
        ),
      },
      {
        label: `Sản phẩm triệu hồi`,
        key: "2",
        children: (
          <CustomTable
            dataSource={recallDataSource}
            columns={recallProductColumns}
          />
        ),
      },
    ],
    []
  );
  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm bảo hành/triệu hồi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </PageContent>
  );
};

export default ProductWarranty;
