import { Form } from "antd";
import { useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import ExecutiveBoardLayout from "../../../../Layouts/ExecutiveBoardLayout";
import VersionForm from "./VersionForm";

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
    title: "Phiên bản",
    dataIndex: "productLine",
    key: "productLine",
  },
  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    fixed: "center",
    width: 236,
    render: () => <ActionsCell />,
  },
];

export default function VersionManage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddVer = () => {
    setModalVisible(true);
  };
  const handleSave = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <ExecutiveBoardLayout
      pageHeaderProps={{
        title: "Quản lý phiên bản",
        onAdd: () => handleAddVer(),
      }}
    >
      <CustomTable columns={columns} />
      <CustomModal
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        title="Thêm phiên bản"
      >
        <VersionForm form={form} />
      </CustomModal>
    </ExecutiveBoardLayout>
  );
}
