import React, { useState, useMemo } from "react";
import Store from "../../../Layouts/Store";
import { Tabs } from "antd";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { createDataTable } from "../../../Components/Table/createDataTable";

const StoreProduct = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const productColumns = useMemo(
    () => [
      {
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
        fixed: true,
        width: 150,
        height: 56,
      },
      {
        title: "Sản phẩm",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Số",
        dataIndex: "number",
        key: "number",
        width: 100,
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Trạng thấi",
        dataIndex: "status",
        key: "status",
        width: 104,
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 150,
        render: () => <ActionsCell hasConfirm={false} hasDelete={false} />,
      },
    ],
    []
  );
  const newProductColumns = useMemo(
    () => [
      {
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
        fixed: true,
        width: 150,
        height: 56,
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "version",
        fixed: true,
        width: 182,
        height: 56,
      },
      {
        title: "Số lượng",
        dataIndex: "amount",
        key: "amount",
        width: 182,
      },

      {
        title: "Trạng thấi",
        dataIndex: "status",
        key: "status",
        width: 104,
      },
      {
        title: "Ngày xuất",
        dataIndex: "dateOut",
        key: "dateOut",
        width: 182,
      },
      {
        title: "Ngày nhận",
        dataIndex: "dateIn",
        key: "dateIn",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 158,
        render: () => <ActionsCell hasDelete={false} hasConfirm={false} />,
      },
    ],
    []
  );
  const productDataSource = createDataTable(productColumns, 3);
  const newProductDataSource = createDataTable(newProductColumns, 3);
  const tabItems = useMemo(
    () => [
      {
        label: `Sản phẩm`,
        key: "1",
        children: (
          <CustomTable
            dataSource={productDataSource}
            columns={productColumns}
          />
        ),
      },
      {
        label: `Sản phẩm mới`,
        key: "2",
        children: (
          <CustomTable
            dataSource={newProductDataSource}
            columns={newProductColumns}
          />
        ),
      },
    ],
    []
  );

  return (
    <Store
      pageHeaderProps={{
        title: "Kho sản phẩm",
        hasAction: false,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </Store>
  );
};

export default StoreProduct;
