import ActionsCell from "../../../../Components/ActionsCell";
import CustomTable from "../../../../Components/CustomTable";
import ExecutiveBoardLayout from "../../../../Layouts/ExecutiveBoardLayout";

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    fixed: true,
    width: 64,
  },
  {
    title: "Dòng sản phẩm",
    dataIndex: "productLine",
    key: "productLine",
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    fixed: "center",
    width: 236,
  },
];

const dataSource = [
  {
    key: 1,
    index: 1,
    productLine: "Product Line",
    actions: <ActionsCell hasView={false} />,
  },
];

export default function LineManage() {
  return (
    <ExecutiveBoardLayout pageHeaderProps={{ title: "Quản lý dòng sản phẩm" }}>
      <CustomTable dataSource={dataSource} columns={columns} />
    </ExecutiveBoardLayout>
  );
}
