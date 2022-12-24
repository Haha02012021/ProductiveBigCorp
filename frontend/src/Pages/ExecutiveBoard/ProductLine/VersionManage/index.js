import { Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import ExecutiveBoardLayout from "../../../../Layouts/ExecutiveBoardLayout";
import VersionForm from "./VersionForm";

export default function VersionManage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [errorPanelKey, setErrorPanelKey] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllVersions();
  }, []);

  const getAllVersions = async () => {
    const res = await indexApi.getAllVersions();

    if (res.success) {
      const ds = res.data.map((version, index) => {
        return {
          key: index,
          index: index + 1,
          productLine: version.model_id,
          version: version.name,
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
      render: () => <ActionsCell hasConfirm={false} />,
    },
  ];

  const handleAddVer = () => {
    form.resetFields();
    setModalVisible(true);
  };
  const handleSave = async () => {
    try {
      await form.validateFields();
      console.log(form.getFieldsValue());
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
      <CustomModal
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        title="Thêm phiên bản"
      >
        <VersionForm form={form} errorPanelKey={errorPanelKey} />
      </CustomModal>
    </>
  );
}
