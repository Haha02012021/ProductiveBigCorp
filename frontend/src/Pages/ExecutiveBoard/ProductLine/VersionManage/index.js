import { Form } from "antd";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import coporationApi from "../../../../apis/coporation";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import VersionForm from "./VersionForm";
import ModalViewVersion from "./modalViewVersion";

export default function VersionManage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [errorPanelKey, setErrorPanelKey] = useState([]);
  const [idVersion, setIdVersion] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllVersions();
  }, []);

  const showModal = (data) => {
    console.log(data.id);
    if (data.id !== idVersion) {
      setIdVersion(data.id);
    }
    if (isModalOpen === false) {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllVersions = async () => {
    const res = await indexApi.getAllVersions();

    if (res.success) {
      const ds = res.data.map((version, index) => {
        return {
          key: index,
          index: index + 1,
          productLine: version.model_id,
          version: version.name,
          id: version.id,
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
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      fixed: "center",
      width: 236,
      render: (text, record, index) => (
        <ActionsCell hasConfirm={false} onView={() => showModal(record)} />
      ),
    },
  ];

  const handleAddVer = () => {
    form.resetFields();
    setModalVisible(true);
  };
  const handleSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const kich_thuoc_khoi_luong = values["kich_thuoc_khoi_luong"];
      const dong_co_hop_so = values["dong_co_hop_so"];
      const khung_gam = values["khung_gam"];
      const ngoai_that = values["ngoai_that"];
      const noi_that = values["noi_that"];
      const an_toan = values["an_toan"];
      const i_activesense = values["i_activesense"];
      const data = {
        ...{
          kich_thuoc_tong_the:
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.length +
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.width +
            kich_thuoc_khoi_luong.kich_thuoc_tong_the.height,
          ...kich_thuoc_khoi_luong,
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
        setModalVisible(false);
        message.success("Thêm phiên bản thành công!", 2);
      } else {
        message.error("Dường như có lỗi gì đó!", 2);
      }
    } catch (error) {
      console.log(error);
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
      {isModalOpen && (
        <ModalViewVersion
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idVersion={idVersion}
        />
      )}
      <CustomModal
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        title="Thêm phiên bản"
      >
        <VersionForm form={form} errorPanelKey={errorPanelKey} />
      </CustomModal>
      {modalVisible && (
        <CustomModal
          open={modalVisible}
          onOk={handleSave}
          onCancel={() => setModalVisible(false)}
          title="Thêm phiên bản"
        >
          <VersionForm form={form} errorPanelKey={errorPanelKey} />
        </CustomModal>
      )}
    </>
  );
}
