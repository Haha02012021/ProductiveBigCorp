import { Input, message, Row, Col } from "antd";
import PageHeader from "./PageHeader";
import indexApi from "../apis/index";

export default function PageContent({
  showSearch = true,
  searchPlaceholder = "Nhập mã sản phẩm để tìm kiếm",
  children,
  pageHeaderProps,
  onSearch,
  getSearchResults = () => {},
  searchBarExtraAction,
}) {
  const handleSearch = async (value) => {
    if (value) {
      try {
        const res = await indexApi.getProductByUuid(value);

        if (res.success) {
          getSearchResults(res.data);
        }
      } catch (error) {
        message.error(error.message, 2);
      }
    } else {
      getSearchResults(null);
    }
  };
  return (
    <>
      {pageHeaderProps && (
        <Row direction="vertical" style={{ width: "100%" }}>
          <PageHeader
            title={pageHeaderProps?.title}
            hasAction={pageHeaderProps?.hasAction}
            onAdd={pageHeaderProps?.onAdd}
            customAction={pageHeaderProps?.customAction}
          />
        </Row>
      )}
      {showSearch && (
        <Row
          style={{
            display: "flex",
            justifyContent: searchBarExtraAction ? "space-between" : "right",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          {searchBarExtraAction}
          <Col sx={24} md={8}>
            <Input.Search
              onSearch={onSearch || handleSearch}
              placeholder={searchPlaceholder}
              style={{ width: "100%" }}
              allowClear
            />
          </Col>
        </Row>
      )}
      {children}
    </>
  );
}
