import { Form, Input } from "antd";
import { useMemo, useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import ExecutiveBoardLayout from "../../../../Layouts/ExecutiveBoardLayout";

const dataSource = [
  {
    key: 1,
    index: 1,
    productLine: "Product Line",
    actions: {
      productLine: "Product Line",
    },
  },
];

export default function LineManage() {
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
        title: "Dòng sản phẩm",
        dataIndex: "productLine",
        key: "productLine",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        fixed: "center",
        width: 130,
        render: (productLineInfo) => (
          <ActionsCell
            hasView={false}
            onEdit={() => handleEditLine(productLineInfo)}
            hasConfirm={false}
          />
        ),
      },
    ],
    []
  );
  const handleAddLine = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEditLine = (productLineInfo) => {
    form.resetFields();
    setEditModalVisible(true);
    form.setFieldsValue(productLineInfo);
  };

  const handleSave = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Quản lý dòng sản phẩm",
          onAdd: () => handleAddLine(),
        }}
      >
        <CustomTable dataSource={dataSource} columns={columns} />
      </PageContent>
      {addModalVisible && (
        <CustomModal
          title="Thêm dòng sản phẩm"
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          okText="Lưu"
          cancelText="Bỏ qua"
        >
          <Form form={form} style={{ paddingTop: 24, paddingBottom: 24 }}>
            <Form.Item label="Dòng sản phẩm" required name="productLine">
              <Input placeholder="Nhập dòng sản phẩm mới" />
            </Form.Item>
          </Form>
        </CustomModal>
      )}
      {editModalVisible && (
        <CustomModal
          title="Sửa dòng sản phẩm"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          okText="Lưu"
          cancelText="Bỏ qua"
        >
          <Form form={form} style={{ paddingTop: 24, paddingBottom: 24 }}>
            <Form.Item label="Dòng sản phẩm" required name="productLine">
              <Input placeholder="Nhập dòng sản phẩm mới" />
            </Form.Item>
          </Form>
        </CustomModal>
      )}
    </>
  );
}
