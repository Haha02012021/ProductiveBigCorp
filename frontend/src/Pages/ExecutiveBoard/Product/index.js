import { Badge } from "antd";
import React, { useState } from "react";
import { useMemo } from "react";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import ModalViewProduct from "./modalViewProduct";
import ExecutiveBoardLayout from "../../../Layouts/ExecutiveBoardLayout";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      fixed: true,
      width: 64,
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productLine",
      key: "productLine",
      onFilter: () => {},
      filters: [],
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
      render: () => (
        <ActionsCell hasEdit={false} hasDelete={false} onView={showModal} />
      ),
    },
  ];

  const dataSource = [
    {
      id: 1,
      productLine: "Product Line",
      version: "Version",
      factory: "Factory",
      store: "Store",
      maintainCenter: "Maintain Center",
      state: 0,
    },
  ];

  return (
    <ExecutiveBoardLayout
      pageHeaderProps={{ title: "Sản phẩm", hasAction: false }}
    >
      <CustomTable columns={columns} dataSource={dataSource} />
      <ModalViewProduct
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </ExecutiveBoardLayout>
  );
}
