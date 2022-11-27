import { Form, Input } from "antd";
import { useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
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
    render: () => <ActionsCell />,
  },
];

const dataSource = [
  {
    key: 1,
    index: 1,
    productLine: "Product Line",
  },
];

export default function LineManage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handleAddLine = () => {
    setModalVisible(true);
  };
  const handleSave = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <ExecutiveBoardLayout
      pageHeaderProps={{
        title: "Quản lý dòng sản phẩm",
        onAdd: () => handleAddLine(),
      }}
    >
      <CustomTable dataSource={dataSource} columns={columns} />
      <CustomModal
        title="Thêm dòng sản phẩm"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        okText="Lưu"
        cancelText="Bỏ qua"
      >
        <Form form={form} style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Form.Item label="Dòng sản phẩm" required name="productLine">
            <Input placeholder="Nhập dòng sản phẩm mới" />
          </Form.Item>
        </Form>
      </CustomModal>
    </ExecutiveBoardLayout>
  );
}
