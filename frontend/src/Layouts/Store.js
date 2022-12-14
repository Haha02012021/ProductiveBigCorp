import AuthLayout from "./AuthLayout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";

const Store = ({ children, pageHeaderProps }) => {
  const menuItems = useMemo(
    () => [
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
        key: "statistic",
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
    ],
    []
  );
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
      }}
      pageHeaderProps={pageHeaderProps}
    >
      {children}
    </AuthLayout>
  );
};

export default Store;
