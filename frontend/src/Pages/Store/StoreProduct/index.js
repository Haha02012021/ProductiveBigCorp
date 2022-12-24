import React, { useState, useMemo, useEffect, useContext } from "react";
import { Tabs } from "antd";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { createDataTable } from "../../../Components/Table/createDataTable";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import {
  productColumns,
  productWarrantyColumns,
  buildData,
} from "../../../const/tableProduct";
const StoreProduct = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [productStore, setProductStore] = useState([]);

  const newProductColumns = useMemo(
    () => [
      {
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
        width: 150,
        height: 56,
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "version",
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
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    getProductsStore();
  }, []);

  const getProductsStore = async (id) => {
    const condition = {
      idSold: 0,
    };
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setProductStore(buildData(res.data.products));
    }
  };

  const newProductDataSource = createDataTable(newProductColumns, 3);

  const tabItems = [
    {
      label: `Sản phẩm trong kho`,
      key: "1",
      children: (
        <CustomTable dataSource={productStore} columns={productColumns} />
      ),
    },
    {
      label: `Sản phẩm đang yêu cầu`,
      key: "2",
      children: (
        <CustomTable
          dataSource={newProductDataSource}
          columns={newProductColumns}
        />
      ),
    },
  ];

  return (
    <PageContent
      pageHeaderProps={{
        title: "Kho sản phẩm",
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

export default StoreProduct;
