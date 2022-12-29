import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import CustomModal from "../../../Components/CustomModal";
import { Form, message, Tabs } from "antd";
import { useState, useEffect } from "react";
import UnitForm from "./UnitForm";
import PageContent from "../../../Components/PageContent";
import { errorMessages } from "../../../const";
import coporationApi from "../../../apis/coporation";
import indexApi from "../../../apis/index";
import { toast } from "react-toastify";

export default function UnitManage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [factocies, setFactocies] = useState([]);
  const [stores, setStores] = useState([]);
  const [warranties, setWarranties] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getFactories();
    getStore();
    getWarranties();
  }, []);

  const getFactories = async () => {
    const res = await indexApi.getManagerByRole(2);
    if (res.data) {
      setFactocies(buildManageData(res.data.managers));
    }
  };

  const getStore = async () => {
    const res = await indexApi.getManagerByRole(4);
    if (res.data) {
      setStores(buildManageData(res.data.managers));
    }
  };

  const getWarranties = async () => {
    const res = await indexApi.getManagerByRole(3);
    if (res.data) {
      setWarranties(buildManageData(res.data.managers));
    }
  };

  const buildManageData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.id = data[i]?.id;
        o.index = i + 1;
        o.name = data[i]?.name;
        o.account = data[i]?.account;
        o.password = data[i]?.password;
        o.place = data[i]?.place;
        o.key = data[i]?.id;
      }
      result.push(o);
    }
    return result;
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 130,
      render: (text, record, index) => (
        <ActionsCell
          hasConfirm={false}
          hasView={false}
          onEdit={() => handleEdit(record)}
        />
      ),
    },
  ];

  const tabItems = [
    {
      label: `Cơ sở sản xuất`,
      key: "1",
      children: (
        <PageContent>
          <CustomTable dataSource={factocies} columns={columns} />
        </PageContent>
      ),
    },
    {
      label: `Trung tâm bảo hành`,
      key: "2",
      children: (
        <PageContent>
          <CustomTable dataSource={warranties} columns={columns} />
        </PageContent>
      ),
    },
    {
      label: `Đại lý phân phối`,
      key: "3",
      children: (
        <PageContent>
          <CustomTable dataSource={stores} columns={columns} />
        </PageContent>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (unitInfo) => {
    form.resetFields();
    setEditModalVisible(true);
    form.setFieldsValue({
      ...unitInfo,
      role: Number(currentTab) + 1,
      repassword: unitInfo.password,
      unitType: Number(currentTab),
    });
  };

  const handleSave = async () => {
    try {
      await form.validateFields();

      const res = await coporationApi.addManager(form.getFieldsValue());

      if (res.success) {
        toast.success(res.message, 2);
        setAddModalVisible(false);
      }
    } catch (error) {
      toast.error(errorMessages.unitForm.errorSubmit, 2);
    }
  };

  return (
    <PageContent
      pageHeaderProps={{
        title: "Quản lý đơn vị",
        onAdd: () => handleAdd(),
      }}
      showSearch={false}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
      {addModalVisible && (
        <CustomModal
          title={"Thêm đơn vị"}
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onOk={handleSave}
        >
          <UnitForm form={form} />
        </CustomModal>
      )}

      {editModalVisible && (
        <CustomModal
          title={"Sửa đơn vị"}
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={handleSave}
        >
          <UnitForm form={form} isEdit={true} />
        </CustomModal>
      )}
    </PageContent>
  );
}
