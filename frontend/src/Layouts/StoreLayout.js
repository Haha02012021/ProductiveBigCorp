import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Fobbiden from "../Pages/ErrorPage/Fobbidden";

const StoreLayout = () => {
  const { authUser } = useContext(AuthContext);
  const menuItems = [
    {
      key: "store-product",
      icon: <SettingOutlined />,
      label: "Kho sản phẩm",
    },
    {
      key: "product-warranty",
      icon: <SettingOutlined />,
      label: "Sản phẩm bảo hành",
    },
    {
      key: "statistical",
      icon: <SettingOutlined />,
      label: "Thống kê sản phẩm",
      children: [
        {
          key: "report",
          icon: null,
          children: null,
          label: "Báo cáo số liệu",
        },
        {
          key: "analysis",
          icon: null,
          children: null,
          label: "Phân tích số lượng tiêu thụ",
        },
      ],
    },
  ];
  if (authUser && authUser?.role !== "4") {
    return <Fobbiden />;
  }
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
        layout: "store",
      }}
    >
      <Outlet />
    </AuthLayout>
  );
};

export default StoreLayout;
