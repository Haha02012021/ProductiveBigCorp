import ExecutiveBoardLayout from "../../../Layouts/ExecutiveBoardLayout";
import ActionsCell from "../../../Components/ActionsCell";
import CustomTable from "../../../Components/CustomTable";
import { Tabs } from 'antd';

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
    actions: <ActionsCell />,
  },
];

const tabItems= [
      {
        label: `Cơ sở sản xuất`,
        key: '1',
        children: <CustomTable dataSource={dataSource} columns={columns} />,
      },
      {
        label: `Đại lý phân phối`,
            key: '2',
          children: `Content of Tab Pane 2`,
      },
      {
        label: `Trung tâm bảo hành`,
            key: '3',
          children: `Content of Tab Pane 3`,
      },
]

const onChange = (key) => {
  console.log(key);
}

export default function UnitManage() {
  return <ExecutiveBoardLayout pageHeaderProps={{ title: "Quản lý đơn vị" }}>
    <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={tabItems}
    />
  </ExecutiveBoardLayout>;
}
