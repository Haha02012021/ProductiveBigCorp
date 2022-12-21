import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";

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
];
export default function ExecutiveBoardLayout({ pageHeaderProps }) {
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
