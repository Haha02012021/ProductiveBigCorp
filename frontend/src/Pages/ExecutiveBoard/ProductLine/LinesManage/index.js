import { Form, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import coporationApi from "../../../../apis/coporation";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import LineForm from "./LineForm";
import ModalConfirmDelete from "./modalConfirmDelete";
import { toast } from "react-toastify";

export default function LineManage() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [model, setModel] = useState({});
  const [form] = Form.useForm();
  const [change, setChange] = useState(false);

  useEffect(() => {
    getAllModels();
  }, [addModalVisible, editModalVisible]);

  useEffect(() => {
    getAllModels();
  }, [change]);

  const getAllModels = async () => {
    const res = await indexApi.getAllModels();
    if (res.success) {
      const ds = res.data.map((model, index) => {
        return {
          key: model.id,
          index: index + 1,
          model: model.name,
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
        dataIndex: "model",
        key: "model",
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
            hasConfirm={false}
            onEdit={() => handleEditLine(productLineInfo)}
            onDelete={() => {
              setModel(productLineInfo);
              setConfirmDeleteModal(true);
            }}
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
    const res = await coporationApi.addModel(form.getFieldsValue());
    if (res.success) {
      toast.success("Thêm dòng sản phẩm thành công!", 2);
      setAddModalVisible(false);
    } else {
      toast.error("Dường như có lỗi gì đó!", 2);
    }
  };

  const deleteModelF = async () => {
    const res = await coporationApi.deleteModel(model.id);
    if (res.success === true) {
      setChange(!change);
      setConfirmDeleteModal(false);
      toast.success("Xóa model thành công");
    } else {
      toast.error("Xóa model thất bại");
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
      {confirmDeleteModal && (
        <ModalConfirmDelete
          title="Xóa dòng sản phẩm"
          open={confirmDeleteModal}
          onCancel={() => setConfirmDeleteModal(false)}
          onOk={() => deleteModelF()}
          type={"Model"}
          name={model?.name}
          okText="Đồng ý"
          cancelText="Bỏ qua"
        />
      )}
    </>
  );
}
