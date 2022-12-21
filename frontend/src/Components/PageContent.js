import { Space } from "antd";
import Search from "antd/es/input/Search";
import PageHeader from "./PageHeader";

export default function PageContent({
  showSearch = true,
  searchPlaceholder = "Nhập vào đây",
  children,
  pageHeaderProps,
}) {
  return (
    <>
      {pageHeaderProps && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <PageHeader
            title={pageHeaderProps?.title}
            hasAction={pageHeaderProps?.hasAction}
            onAdd={pageHeaderProps?.onAdd}
            customAction={pageHeaderProps?.customAction}
          />
        </Space>
      )}
      {showSearch && (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "16px",
          }}
        >
          <Search placeholder={searchPlaceholder} style={{ width: "36%" }} />
        </div>
      )}
      {children}
    </>
  );
}
