import { message, Space } from "antd";
import Search from "antd/es/input/Search";
import PageHeader from "./PageHeader";
import indexApi from "../apis/index";

export default function PageContent({
  showSearch = true,
  searchPlaceholder = "Nhập mã sản phẩm để tìm kiếm",
  children,
  pageHeaderProps,
  onSearch,
  getSearchResults = () => {},
}) {
  const handleSearch = async (value) => {
    try {
      const res = await indexApi.getProductByUuid(value);

      if (res.success) {
        getSearchResults(res.data);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };
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
          <Search
            onSearch={onSearch || handleSearch}
            placeholder={searchPlaceholder}
            style={{ width: "36%" }}
          />
        </div>
      )}
      {children}
    </>
  );
}
