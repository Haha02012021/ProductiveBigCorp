import { Tabs } from "antd";
import { useMemo } from "react";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";

const waitingProducts = [
  {
    id: 1,
    productLine: "ABC",
    version: "1",
    error: "Error",
  },
];

const errorProducts = [
  {
    id: 1,
    productLine: "ABC MNPQ MNPQMNPQ MNPQMNPQ MNPQ",
    version: "1",
    error:
      "Error Error Error Error Error Error Error ErrorErrorError ErrorErrorErrorErrorError     ErrorErrorErrorErrorErrorErrorErrorErrorErrorError ErrorErrorErrorErrorError ErrorErrorErrorErrorError",
  },
];

export default function ProductImport() {
  const columns = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "version",
      },
      {
        title: "Lỗi",
        dataIndex: "error",
        key: "error",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 130,
        render: (unitInfo) => (
          <ActionsCell hasDelete={false} hasEdit={false} hasView={false} />
        ),
      },
    ],
    []
  );
  const tabItems = useMemo(
    () => [
      {
        label: `Chờ xác nhận`,
        key: "1",
        children: (
          <PageContent>
            <CustomTable dataSource={waitingProducts} columns={columns} />
          </PageContent>
        ),
      },
      {
        label: `Sản phẩm lỗi`,
        key: "2",
        children: (
          <PageContent>
            <CustomTable
              dataSource={errorProducts}
              columns={columns.filter((column) => column.key !== "actions")}
            />
          </PageContent>
        ),
      },
    ],
    []
  );

  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm lỗi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} />
    </PageContent>
  );
}
