import { Badge } from "antd";
import React, { useState, useEffect } from "react";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import ModalViewProduct from "./modalViewProduct";
import PageContent from "../../../Components/PageContent";
import coporationApi from "../../../apis/coporation";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await coporationApi.getProducts();
    if (res.data) {
      const data = res.data;
      setProducts(buildData(data));
    }
  };

  const buildData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.id = data[i].id;
        o.key = i;
        o.version = data[i].version.name;
        o.productLine = data[i].model.name;
        o.factory = data[i].managers[0].name;
        o.store = data[i].store;
        o.maintainCenter = data[i].maintainCenter;
        o.state = data[i].status.context;
      }
      result.push(o);
    }
    return result;
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      width: 64,
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productLine",
      key: "productLine",
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Đại lý phân phối",
      dataIndex: "store",
      key: "productLine",
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Trung tâm bảo hành",
      dataIndex: "maintainCenter",
      key: "maintainCenter",
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (state) => <Badge color="blue" text={state} />,
      filters: [
        { text: "Fac 1", value: "Fac 1" },
        { text: "Fac 2", value: "Fac 2" },
        { text: "Factory", value: "Factory" },
      ],
      filterSearch: true,
      onFilter: () => {},
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      fixed: "center",
      width: 60,
      render: (text, record, index) => (
        <ActionsCell
          hasEdit={false}
          hasDelete={false}
          onView={() => showModal(record)}
          hasConfirm={false}
        />
      ),
    },
  ];

  return (
    <>
      <PageContent pageHeaderProps={{ title: "Sản phẩm", hasAction: false }}>
        <CustomTable columns={columns} dataSource={products} />
      </PageContent>
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idProduct={idProduct}
        />
      )}
    </>
  );
}
