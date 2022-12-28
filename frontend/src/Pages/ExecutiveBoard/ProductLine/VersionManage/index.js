import { Form, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import coporationApi from "../../../../apis/coporation";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import VersionForm from "./VersionForm";
import ModalViewVersion from "./modalViewVersion";
import { ThemeContext } from "../../../../Provider/ThemeProvider";
import { toast } from "react-toastify";

export default function VersionManage() {
  const { isMobile } = useContext(ThemeContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [errorPanelKey, setErrorPanelKey] = useState([]);
  const [versionId, setVersionId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllVersions();
  }, []);

  const showModal = (data) => {
    if (data.id !== versionId) {
      setVersionId(data.id);
    }
    if (viewModalVisible === false) {
      setViewModalVisible(true);
    }
  };

  const handleEdit = (data) => {
    if (data.id !== versionId) {
      setVersionId(data.id);
    }

    if (!editModalVisible) {
      setEditModalVisible(true);
    }
  };

  const handleOk = () => {
    setViewModalVisible(false);
  };

  const handleCancel = () => {
    setViewModalVisible(false);
  };

  const getAllVersions = async () => {
    const res = await indexApi.getAllVersions();

    if (res.success === true) {
      setCurrentPage(res.data.currentPage);
      const ds = res?.data.versions.map((version, index) => {
        return {
          key: index,
          index: index + 1,
          model: version?.model?.name,
          version: version?.name,
          id: version?.id,
        };
      });

      setDataSource(ds);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 64,
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      fixed: "center",
      width: 236,
      render: (text, record, ) => (
        <ActionsCell
          hasConfirm={false}
          onView={() => showModal(record)}
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record)}
        />
      ),
    },
  ];

  const handleDelete = (data) => {
    Modal.confirm({
      content: `Bạn có chắc muốn xóa phiên bản ${data.version} không?`,
      okText: "Có",
      cancelText: "Không",
      width: isMobile ? "80%" : "40%",
      closable: true,
      onCancel: () => {},
      onOk: async () => {
        try {
          const res = await coporationApi.deleteVersion(data.id);
          if (res.success) {
            toast.success(`Xóa phiên bản ${data.id} thành công!`, 2);
            getAllVersions();
            Modal.destroyAll();
          }
        } catch (error) {
          toast.error(error.message, 2);
          Modal.destroyAll();
        }
      },
    });
  };

  const handleAddVer = () => {
    form.resetFields();
    setAddModalVisible(true);
  };
  const handleSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const kich_thuoc_khoi_luong = values["size"];
      const dong_co_hop_so = values["engine"];
      const khung_gam = values["chassis"];
      const ngoai_that = values["exterior"];
      const noi_that = values["interior"];
      const an_toan = values["safety"];
      const i_activesense = values["i_activesense"];
      const data = {
        ...{
          ...kich_thuoc_khoi_luong,
          kich_thuoc_tong_the:
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.length +
            " x " +
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.width +
            " x " +
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.height,
        },
        ...dong_co_hop_so,
        ...khung_gam,
        ...ngoai_that,
        ...noi_that,
        ...an_toan,
        ...i_activesense,
        model_id: values.model_id,
        name: values.name,
      };
      const res = await coporationApi.addVersion(data);
      if (res.success) {
        setAddModalVisible(false);
        toast.success("Thêm phiên bản thành công!", 2);
      } else {
        toast.error("Dường như có lỗi gì đó!", 2);
      }
    } catch (error) {
      setErrorPanelKey(error.errorFields.map(({ name }) => name[0]));
    }
  };
  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Quản lý phiên bản",
          onAdd: () => handleAddVer(),
        }}
      >
        <CustomTable columns={columns} dataSource={dataSource} />
      </PageContent>
      {viewModalVisible && (
        <ModalViewVersion
          isModalOpen={viewModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idVersion={versionId}
        />
      )}
      {editModalVisible && (
        <CustomModal
          open={editModalVisible}
          onOk={handleSave}
          onCancel={() => setEditModalVisible(false)}
          title="Sửa phiên bản"
          width={isMobile ? "80%" : "52%"}
        >
          <VersionForm
            form={form}
            errorPanelKey={errorPanelKey}
            versionId={versionId}
          />
        </CustomModal>
      )}
      {addModalVisible && (
        <CustomModal
          open={addModalVisible}
          onOk={handleSave}
          onCancel={() => setAddModalVisible(false)}
          title="Thêm phiên bản"
          width={isMobile ? "80%" : "52%"}
        >
          <VersionForm form={form} errorPanelKey={errorPanelKey} />
        </CustomModal>
      )}
    </>
  );
}
