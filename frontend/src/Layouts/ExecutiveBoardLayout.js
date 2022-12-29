import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Fobbiden from "../Pages/ErrorPage/Fobbidden";

const menuItems = [
  {
    key: "product-line",
    icon: <SettingOutlined />,
    children: [
      {
        key: "lines-manage",
        icon: null,
        children: null,
        label: "Quản lý dòng sản phẩm",
      },
      {
        key: "version-manage",
        icon: null,
        children: null,
        label: "Quản lý phiên bản",
      },
    ],
    label: "Dòng sản phẩm",
  },
  {
    key: "product",
    icon: <SettingOutlined />,
    children: null,
    label: "Sản phẩm",
  },
  {
    key: "units-manage",
    icon: <SettingOutlined />,
    children: null,
    label: "Quản lý đơn vị",
  },
  {
    key: "statistical",
    icon: <SettingOutlined />,
    label: "Thống kê sản phẩm toàn quốc",
    children: [
      {
        key: "analysis",
        icon: null,
        children: null,
        label: "Phân tích số lượng tiêu thụ",
      },
      {
        key: "error",
        icon: null,
        children: null,
        label: "Phân tích số lượng lỗi",
      },
    ],
  },
];
export default function ExecutiveBoardLayout({ pageHeaderProps }) {
  const { authUser } = useContext(AuthContext);
  if (authUser && authUser.role !== "1") {
    return <Fobbiden />;
  }
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
        layout: "executive-board",
      }}
      pageHeaderProps={pageHeaderProps}
    >
      <Outlet />
    </AuthLayout>
  );
}
