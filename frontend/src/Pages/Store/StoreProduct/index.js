import React, { useState, useMemo, useEffect, useContext } from "react";
import { Tabs } from "antd";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { createDataTable } from "../../../Components/Table/createDataTable";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import { buildData } from "../../../const/tableProduct";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";
import ModalRequest from "./modalRequest";

const StoreProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [productStore, setProductStore] = useState([]);
  const [isModalRequest, setIsModalRequest] = useState(false);

  const requestProductColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 64,
      height: 56,
    },
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 182,
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
      width: 80,
      render: () => (
        <ActionsCell hasDelete={false} hasView={false} hasConfirm={false} />
      ),
    },
  ];

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

  const handleRequestOk = () => {
    setIsModalRequest(false);
  };
  const handleRequestCancel = () => {
    setIsModalRequest(false);
  };

  const productColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 64,
      height: 56,
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Màu sản phẩm",
      dataIndex: "color",
      key: "color",
      width: 150,
      height: 56,
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 150,
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
      width: 80,
      render: (text, record, index) => (
        <ActionsCell
          hasConfirm={false}
          hasDelete={false}
          hasEdit={false}
          onView={() => showModal(record)}
        />
      ),
    },
  ];
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

  const newProductDataSource = createDataTable(requestProductColumns, 3);

  const tabItems = [
    {
      label: `Sản phẩm trong kho`,
      key: "1",
      children: (
        <CustomTable dataSource={productStore} columns={productColumns} />
      ),
    },
    {
      label: `Yêu cầu tới nhà máy`,
      key: "2",
      children: (
        <CustomTable
          dataSource={newProductDataSource}
          columns={requestProductColumns}
        />
      ),
    },
  ];

  return (
    <PageContent
      pageHeaderProps={{
        title: "Kho sản phẩm",
        hasAction: true,
        onAdd: () => setIsModalRequest(true),
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
      {isModalRequest && (
        <ModalRequest
          isModalOpen={isModalRequest}
          handleOk={handleRequestOk}
          handleCancel={handleRequestCancel}
        />
      )}
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

export default StoreProduct;
