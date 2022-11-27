import ExecutiveBoardLayout from "../../../Layouts/ExecutiveBoardLayout";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import CustomModal from "../../../Components/CustomModal";
import { Form, Tabs } from "antd";
import { useMemo, useState } from "react";
import UnitForm from "./UnitForm";

const factoryDataSource = [
  {
    key: 1,
    index: 1,
    name: "Factory 1",
    username: "factory1",
    password: "factory1",
    actions: {
      name: "Factory 1",
      username: "factory1",
      password: "factory1",
    },
  },
];

const storeDataSource = [
  {
    key: 1,
    index: 1,
    name: "Store 1",
    username: "store1",
    password: "store1",
    actions: {
      name: "Store 1",
      username: "store1",
      password: "store1",
    },
  },
];

const maintainCenterDataSource = [
  {
    key: 1,
    index: 1,
    name: "Center 1",
    username: "center1",
    password: "center1",
    actions: {
      name: "Center 1",
      username: "center1",
      password: "center1",
    },
  },
];

export default function UnitManage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = useMemo(
    () => [
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
        width: 130,
        render: (unitInfo) => (
          <ActionsCell hasView={false} onEdit={() => handleEdit(unitInfo)} />
        ),
      },
    ],
    []
  );

  const tabItems = useMemo(
    () => [
      {
        label: `Cơ sở sản xuất`,
        key: "1",
        children: (
          <CustomTable dataSource={factoryDataSource} columns={columns} />
        ),
      },
      {
        label: `Đại lý phân phối`,
        key: "2",
        children: (
          <CustomTable dataSource={storeDataSource} columns={columns} />
        ),
      },
      {
        label: `Trung tâm bảo hành`,
        key: "3",
        children: (
          <CustomTable
            dataSource={maintainCenterDataSource}
            columns={columns}
          />
        ),
      },
    ],
    []
  );

  const handleAdd = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (unitInfo) => {
    form.resetFields();
    setEditModalVisible(true);
    form.setFieldsValue({
      ...unitInfo,
      repassword: unitInfo.password,
      unitType: Number(currentTab),
    });
    console.log(form.getFieldsValue());
  };

  const handleSave = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <ExecutiveBoardLayout
      pageHeaderProps={{
        title: "Quản lý đơn vị",
        onAdd: () => handleAdd(),
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
      {addModalVisible && (
        <CustomModal
          title={"Thêm đơn vị"}
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onOk={handleSave}
        >
          <UnitForm form={form} />
        </CustomModal>
      )}

      {editModalVisible && (
        <CustomModal
          title={"Sửa đơn vị"}
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={handleSave}
        >
          <UnitForm form={form} />
        </CustomModal>
      )}
    </ExecutiveBoardLayout>
  );
}
