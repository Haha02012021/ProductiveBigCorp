import { SettingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Fobbiden from "../Pages/ErrorPage/Fobbidden";
import { AuthContext } from "../Provider/AuthProvider";
import AuthLayout from "./AuthLayout";

export default function MaintainerLayout() {
  const { authUser } = useContext(AuthContext);
  const menuItems = [
    {
      key: "maintain-products",
      icon: <SettingOutlined />,
      label: "Sản phẩm bảo hành/triệu hồi",
    },
    {
      key: "transport-products",
      icon: <SettingOutlined />,
      label: "Vận chuyển sản phẩm",
    },
    {
      key: "statistical",
      icon: <SettingOutlined />,
      label: "Thống kê số liệu sản phẩm",
    },
  ];
  if (authUser && authUser.role !== "3") {
    return <Fobbiden />;
  }
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
        layout: "maintainer",
      }}
    >
      <Outlet />
    </AuthLayout>
  );
}
