import Search from "antd/es/input/Search";

export default function PageContent({
  showSearch = true,
  searchPlaceholder = "Nhập vào đây",
  children,
}) {
  return (
    <>
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
