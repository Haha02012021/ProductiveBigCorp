import { Form, message, Tag } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { addNewProducts, getBatchesByFactoryId } from "../../../apis/factory";
import CustomModal from "../../../Components/CustomModal";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import { AuthContext } from "../../../Provider/AuthProvider";
import ProductLotForm from "./ProductLotForm";
import invertColor from "../../../utils/invertColor";
import { ThemeContext } from "../../../Provider/ThemeProvider";

export default function ProductLot() {
  const { authUser } = useContext(AuthContext);
  const { isMobile } = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
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
      title: "Màu",
      dataIndex: "color",
      key: "color",
      render: (_, record) => {
        return (
          <Tag
            color={record.color.code}
            style={{ color: invertColor(record.color.code, true) }}
          >
            {record.color.name}
          </Tag>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <ActionsCell
          hasView={false}
          hasConfirm={false}
          onEdit={() => handleEdit(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (authUser) {
      getBatches();
    }
  }, [authUser, addModalVisible, editModalVisible]);

  const handleEdit = (data) => {
    console.log(data);
    setSelectedBatch(data);
    setEditModalVisible(true);
  };

  const getBatches = async () => {
    const res = await getBatchesByFactoryId(authUser.id);
    if (res.success) {
      const ds = res.data.map((batch) => {
        const date = new Date(batch.createdAt);
        const time = date.toLocaleString("vi-VN").split(",")[1];
        return {
          key: batch.id,
          factory_id: batch.factory_id,
          time,
          model_id: batch.model_id,
          model: batch.model.name,
          version: batch.version.name,
          version_id: batch.version_id,
          amount: batch.amount,
          color: { ...batch.color, id: batch.color_id },
        };
      });
      setDataSource(ds);
    }
  };

  const handleSave = async () => {
    form.submit();
    const data = {
      ...form.getFieldsValue(),
      factory_id: authUser.id,
      color_id: form
        .getFieldValue("color_id")
        .filter((color) => color !== undefined)[0],
    };

    try {
      const res = await addNewProducts(data);
      if (res.success) {
        message.success("Thêm lô sản phẩm thành công!", 2);
        setAddModalVisible(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Lô sản phẩm",
          onAdd: () => setAddModalVisible(true),
        }}
      >
        <CustomTable dataSource={dataSource} columns={columns} />
      </PageContent>
      {addModalVisible && (
        <CustomModal
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onOk={() => handleSave()}
          title="Thêm lô sản phẩm"
          width={isMobile ? "80%" : "40%"}
        >
          <ProductLotForm form={form} />
        </CustomModal>
      )}
      {editModalVisible && (
        <CustomModal
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={() => handleSave()}
          title="Sửa lô sản phẩm"
          width={isMobile ? "80%" : "40%"}
        >
          <ProductLotForm form={form} batch={selectedBatch} />
        </CustomModal>
      )}
    </>
  );
}
