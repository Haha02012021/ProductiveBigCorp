import { Form, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import coporationApi from "../../../../apis/coporation";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import LineForm from "./LineForm";

export default function LineManage() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllModels();
  }, [addModalVisible, editModalVisible]);

  const getAllModels = async () => {
    const res = await indexApi.getAllModels();
    if (res.success) {
      const ds = res.data.map((model, index) => {
        return {
          key: model.id,
          index: index + 1,
          name: model.name,
          actions: model,
        };
      });
      setDataSource(ds);
    }
  };

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
        dataIndex: "name",
        key: "name",
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
    setSelectedLineId(productLineInfo.id);
  };

  const handleSave = async () => {
    form.submit();
    console.log(form.getFieldsValue());
    const res = await coporationApi.addModel(form.getFieldsValue());
    if (res.success) {
      message.success("Thêm dòng sản phẩm thành công!", 2);
      setAddModalVisible(false);
    } else {
      message.error("Dường như có lỗi gì đó!", 2);
    }
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
          onOk={() => handleSave()}
          okText="Lưu"
          cancelText="Bỏ qua"
        >
          <LineForm form={form} />
        </CustomModal>
      )}
      {editModalVisible && (
        <CustomModal
          title="Sửa dòng sản phẩm"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={() => handleSave()}
          okText="Lưu"
          cancelText="Bỏ qua"
        >
          <LineForm form={form} lineId={selectedLineId} />
        </CustomModal>
      )}
    </>
  );
}
