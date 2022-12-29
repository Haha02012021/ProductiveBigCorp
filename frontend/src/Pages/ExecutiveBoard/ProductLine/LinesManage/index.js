import { Form } from "antd";
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
import axios from "axios";

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
      const ds = res.data.models.map((model, index) => {
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
        width: 80,
        render: (productLineInfo) => (
          <ActionsCell
            hasView={false}
            hasConfirm={false}
            hasDelete={false}
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

  // const handleDelete = (lineId) => {
  //   Modal.confirm({
  //     content: "Bạn có chắc muốn xóa dòng này không?",
  //     okText: "Có",
  //     cancelText: "Không",
  //     width: isMobile ? "80%" : "40%",
  //     closable: true,
  //     onCancel: () => {},
  //     onOk: async () => {
  //       try {
  //         const res = await coporationApi.deleteModel(lineId);
  //         if (res.success) {
  //           toast.success("Xóa dòng sản phẩm thành công!", 2);
  //           getAllModels();
  //           Modal.destroyAll();
  //         }
  //       } catch (error) {
  //         toast.error(error.message, 2);
  //         Modal.destroyAll();
  //       }
  //     },
  //   });
  // };

  const handleSave = async () => {
    form.submit();
    console.log(form.getFieldsValue());
    const data = form.getFieldsValue();

    let check = true;
    if (
      data.colors === undefined ||
      data.name === undefined ||
      data.files === undefined
    ) {
      toast.error("Chưa chọn ảnh");
      return;
    }
    const fileColors = data.colors.map((color) => {
      if (color.file === undefined) check = false;
      return color.file;
    });

    const fileId = data.colors.map((color) => color.id);
    console.log();
    console.log(fileColors);
    console.log(data.files);
    if (check && data.files.length > 0) {
      let formData = new FormData();
      fileColors.map((id) => {
        formData.append("colors", id);
        return id;
      });
      data.files.map((id) => {
        formData.append("images", id);
        return id;
      });
      formData.append("name", data.name);
      fileId.map((id) => {
        formData.append("color_id", id);
        return id;
      });
      console.log(formData);
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/coporation/newModel",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });
      if (res.data.success) {
        toast.success("Thêm dòng sản phẩm thành công!", 2);
        setAddModalVisible(false);
      } else {
        toast.error("Dường như có lỗi gì đó!", 2);
      }
    } else {
      toast.error("Chưa chọn ảnh");
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
        showSearch={false}
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
