import { Form } from "antd";
import { useMemo, useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import ExecutiveBoardLayout from "../../../../Layouts/ExecutiveBoardLayout";
import VersionForm from "./VersionForm";

export default function VersionManage() {
  const [modalVisible, setModalVisible] = useState(false);
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
    ],
    []
  );

  const handleAddVer = () => {
    form.resetFields();
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
