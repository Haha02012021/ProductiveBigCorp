import { Table } from "antd";

export default function CustomTable({
  dataSource,
  columns,
  paginationProps = {},
}) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table
        className="custom-table"
        bordered
        dataSource={[...dataSource]}
        style={{ width: "100%", overflowX: "auto" }}
        columns={columns}
      />
    </div>
  );
}
