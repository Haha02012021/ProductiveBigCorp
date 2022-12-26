import { Table } from "antd";

export default function CustomTable({
  dataSource,
  columns,
  paginationProps = {
    total: 5,
    onChangePagination: (page, pageSize) => {},
  },
  showPagination = true,
}) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table
        className="custom-table"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={
          showPagination === true
            ? {
                showQuickJumper: true,
                showSizeChanger: true,
                defaultCurrent: 1,
                total: paginationProps.total,
                onChange: paginationProps.onChangePagination,
              }
            : false
        }
      />
    </div>
  );
}
