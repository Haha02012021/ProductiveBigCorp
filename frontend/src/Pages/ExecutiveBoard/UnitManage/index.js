import ExecutiveBoardLayout from "../../../Layouts/ExecutiveBoardLayout";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import { Tabs } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    fixed: true,
    width: 64,
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tài khoản",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Mật khẩu",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    fixed: "center",
    width: 236,
  },
];

const factoryDataSource = [
  {
    key: 1,
    index: 1,
    name: "Factory 1",
    username: "factory1",
    password: "factory1",
    actions: <ActionsCell />,
  },
];

const storeDataSource = [
  {
    key: 1,
    index: 1,
    name: "Store 1",
    username: "store1",
    password: "store1",
    actions: <ActionsCell />,
  },
];

const maintainCenterDataSource = [
  {
    key: 1,
    index: 1,
    name: "Center 1",
    username: "center1",
    password: "center1",
  },
];
const tabItems = [
  {
    label: `Cơ sở sản xuất`,
    key: "1",
    children: <CustomTable dataSource={factoryDataSource} columns={columns} />,
  },
  {
    label: `Đại lý phân phối`,
    key: "2",
    children: <CustomTable dataSource={storeDataSource} columns={columns} />,
  },
  {
    label: `Trung tâm bảo hành`,
    key: "3",
    children: (
      <CustomTable dataSource={maintainCenterDataSource} columns={columns} />
    ),
  },
];

const onChange = (key) => {
  console.log(key);
};

export default function UnitManage() {
  return (
    <ExecutiveBoardLayout pageHeaderProps={{ title: "Quản lý đơn vị" }}>
      <Tabs defaultActiveKey="1" onChange={onChange} items={tabItems} />
    </ExecutiveBoardLayout>
  );
}
