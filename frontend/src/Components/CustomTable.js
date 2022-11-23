import { Table } from "antd";

export default function CustomTable({ dataSource, columns }) {
  return (
    <Table
      className="custom-table"
      bordered
      dataSource={dataSource}
      columns={columns}
    />
  );
}
