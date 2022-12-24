import React, { useState, useMemo, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { Tabs } from "antd";
import { createDataTable } from "../../../Components/Table/createDataTable";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";

const ProductWarranty = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { authUser } = useContext(AuthContext);
  const [selledProducts, setSelledProducts] = useState([]);

  const productWarrantyColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Ngày bán",
      dataIndex: "sellDate",
      key: "sellDate",
      width: 150,
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 150,
    },
    {
      title: "Trạng thái bảo hành",
      dataIndex: "statusWarranty",
      key: "statusWarranty",
      width: 170,
    },

    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: () => <ActionsCell hasDelete={false} hasEdit={false} />,
    },
  ];

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

  useEffect(() => {
    getProductsStore();
  }, []);

  const buildData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.key = i;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.sellDate = data[i]?.sellDate;
        o.factory = data[i]?.managers[0]?.name;
        o.status = data[i]?.status?.context;
        o.statusWarranty = data[i]?.statusWarranty;
      }
      result.push(o);
    }
    return result;
  };

  const getProductsStore = async (id) => {
    const condition = {
      idSold: 1,
    };
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSelledProducts(buildData(res.data.products));
    }
  };

  console.log(selledProducts);

  const warrantyDataSource = createDataTable(productWarrantyColumns, 5);
  const recallDataSource = createDataTable(recallProductColumns, 5);

  const tabItems = [
    {
      label: `Sản phẩm đã bán`,
      key: "1",
      children: (
        <CustomTable
          dataSource={selledProducts}
          columns={productWarrantyColumns}
        />
      ),
    },
    {
      label: `Sản phẩm bảo hành`,
      key: "2",
      children: (
        <CustomTable
          dataSource={warrantyDataSource}
          columns={productWarrantyColumns}
        />
      ),
    },
    {
      label: `Sản phẩm triệu hồi`,
      key: "3",
      children: (
        <CustomTable
          dataSource={recallDataSource}
          columns={recallProductColumns}
        />
      ),
    },
  ];
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
