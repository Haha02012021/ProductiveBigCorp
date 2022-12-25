import React, { useState, useMemo, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { Tabs } from "antd";
import { createDataTable } from "../../../Components/Table/createDataTable";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";

import moment from "moment";
const ProductWarranty = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [selledProducts, setSelledProducts] = useState([]);
  const [warrantyProducts, setWarrantyProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(0);

  const showModal = (data) => {
    if (data.id !== idProduct) {
      setIdProduct(data.id);
    }
    if (isModalOpen === false) {
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productWarrantyColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "model",
      key: "model",
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
      render: (text, record, index) => (
        <ActionsCell
          hasDelete={false}
          hasEdit={false}
          onView={() => showModal(record)}
        />
      ),
    },
  ];

  const productSelledColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "model",
      key: "model",
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
      title: "Màu sản phẩm",
      dataIndex: "color",
      key: "color",
      width: 150,
      height: 56,
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (text, record, index) => (
        <ActionsCell
          hasDelete={false}
          hasEdit={false}
          onView={() => showModal(record)}
        />
      ),
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
    getProductsStore({
      idSold: 1,
    });
    getWarrantyProductsStore({
      idSold: 1,
      status_id: 6,
    });
  }, []);

  const buildData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.key = data[i]?.id;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.sellDate = moment(data[i]?.soldAt).calendar();
        o.factory = data[i]?.managers[0]?.name;
        o.status = data[i]?.status?.context;
        o.statusWarranty = data[i]?.statusWarranty;
        o.model = data[i]?.model?.name;
        o.color = data[i]?.color?.name;
        o.id = data[i]?.id;
      }
      result.push(o);
    }
    return result;
  };

  const getProductsStore = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSelledProducts(buildData(res.data.products));
    }
  };

  const getWarrantyProductsStore = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setWarrantyProducts(buildData(res.data.products));
    }
  };

  const recallDataSource = createDataTable(recallProductColumns, 5);

  const tabItems = [
    {
      label: `Sản phẩm đã bán`,
      key: "1",
      children: (
        <CustomTable
          dataSource={selledProducts}
          columns={productSelledColumns}
        />
      ),
    },
    {
      label: `Sản phẩm bảo hành`,
      key: "2",
      children: (
        <CustomTable
          dataSource={warrantyProducts}
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
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idProduct={idProduct}
        />
      )}
    </PageContent>
  );
};

export default ProductWarranty;
