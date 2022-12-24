import { Badge } from "antd";
import React, { useState, useContext, useEffect } from "react";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import ModalViewProduct from "./modalViewProduct";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis/coporation";
import { AuthContext } from "../../../Provider/AuthProvider";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [idProduct, setIdProduct] = useState(0);
  const [products, setProducts] = useState([]);
  const showModal = (data) => {
    console.log(data);
    setIdProduct(1);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await indexApi.getProducts(authUser.id);
    if (res.data) {
      const data = res.data;
      setProducts([]);
    }
  };

  const dataSource = [
    {
      id: 1,
      version: "Version",
      factory: "Factory",
      store: "Store",
      maintainCenter: "Maintain Center",
      state: 0,
      key: 1,
    },
  ];

  const buildData = (data) => {};

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      fixed: true,
      width: 64,
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
      render: (state) => <Badge color="blue" text={"status"} />,
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
      render: (data) => (
        <ActionsCell
          hasEdit={false}
          hasDelete={false}
          onView={showModal}
          hasConfirm={false}
        />
      ),
    },
  ];

  return (
    <>
      <PageContent pageHeaderProps={{ title: "Sản phẩm", hasAction: false }}>
        <CustomTable columns={columns} dataSource={dataSource} />
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
