import { Tabs } from "antd";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";

export default function MaintainProduct() {
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "model",
      key: "model",
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
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Đại lý",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Ngày gửi",
      dataIndex: "giveDate",
      key: "giveDate",
    },
    {
      title: "Ngày xử lý xong",
      dataIndex: "finishedDate",
      key: "finishedDate",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render: () => <ActionsCell hasView={false} hasConfirm={false} />,
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Sản phẩm bảo hành",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter((column) => column.key !== "amount")}
          />
        </PageContent>
      ),
    },
    {
      key: "2",
      label: "Sản phẩm triệu hồi",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter(
              (column) => column.key !== "id" && column.key !== "store"
            )}
          />
        </PageContent>
      ),
    },
  ];
  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm bảo hành/triệu hồi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} />
    </PageContent>
  );
}
