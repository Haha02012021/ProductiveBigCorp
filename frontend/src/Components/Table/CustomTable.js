import { Table } from "antd";

export default function CustomTable({
  dataSource,
  columns,
  paginationProps = {
    total: 50,
    onChangePagination: (page, pageSize) => {},
  },
}) {
  return (
    <Table
      className="custom-table"
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        total: paginationProps.total,
        onChange: paginationProps.onChangePagination,
      }}
    />
  );
}
