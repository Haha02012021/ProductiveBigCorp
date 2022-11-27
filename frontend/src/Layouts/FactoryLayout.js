import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";

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

export default function FactoryLayout({ children, pageHeaderProps }) {
  return (
    <AuthLayout menuItems={menuItems} pageHeaderProps={pageHeaderProps}>
      {children}
    </AuthLayout>
  );
}
