import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Fobbiden from "../Pages/ErrorPage/Fobbidden";

export default function FactoryLayout({ pageHeaderProps }) {
  const { authUser } = useContext(AuthContext);
  const menuItems = [
    {
      key: "product-lot",
      icon: <SettingOutlined />,
      label: "Lô sản phẩm",
    },
    {
      key: "product-in-out",
      icon: <SettingOutlined />,
      label: "Xuất/Nhận sản phẩm",
      children: [
        {
          key: "export-to-store",
          icon: null,
          children: null,
          label: "Xuất cho đại lý",
        },
        {
          key: "receive-from-maitainence",
          icon: null,
          children: null,
          label: "Nhận từ trung tâm bảo hành",
        },
      ],
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
        {
          key: "error-rate",
          icon: null,
          children: null,
          label: "Tỉ lệ sản phẩm lỗi",
        },
      ],
    },
  ];
  if (authUser && authUser.role !== "2") {
    return <Fobbiden />;
  }
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
        layout: "factory",
      }}
      pageHeaderProps={pageHeaderProps}
    >
      <Outlet />
    </AuthLayout>
  );
}
