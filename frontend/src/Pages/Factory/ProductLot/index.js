import { Form, message, Tabs, Tag } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  addNewProducts,
  getBatchesByFactoryId,
  requestSummon,
} from "../../../apis/factory";
import CustomModal from "../../../Components/CustomModal";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import { AuthContext } from "../../../Provider/AuthProvider";
import ProductLotForm from "./ProductLotForm";
import invertColor from "../../../utils/invertColor";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import SummonReqForm from "./SummonReqForm";

export default function ProductLot() {
  const { authUser } = useContext(AuthContext);
  const { isMobile } = useContext(ThemeContext);
  const [createdLotsSource, setCreatedLotsSource] = useState([]);
  const [summoningLotsSource, setSummoningLotsSource] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [summonReqModalVisible, setSummonReqModalVisible] = useState(false);
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
          hasConfirm={false}
          hasView={false}
          deleteText="Triệu hồi"
          onEdit={() => handleEdit(record)}
          onDelete={() => {
            setSelectedBatch(record);
            setSummonReqModalVisible(true);
          }}
        />
      ),
    },
  ];

  const tabItems = [
    {
      label: `Đã sản xuất`,
      key: "1",
      children: (
        <PageContent>
          <CustomTable dataSource={createdLotsSource} columns={columns} />
        </PageContent>
      ),
    },
    {
      label: "Yêu cầu triệu hồi",
      key: "2",
      children: (
        <PageContent>
          <CustomTable
            dataSource={summoningLotsSource}
            columns={columns.filter((column) => column.key !== "actions")}
          />
        </PageContent>
      ),
    },
  ];

  useEffect(() => {
    if (authUser) {
      getBatches();
      getSummoningBatches();
    }
  }, [authUser, addModalVisible, editModalVisible]);

  const handleEdit = (data) => {
    setSelectedBatch(data);
    setEditModalVisible(true);
  };

  const getBatches = async () => {
    const condition = {
      condition: {
        isSummoned: 0,
      },
    };
    const res = await getBatchesByFactoryId(authUser.id, condition);
    if (res.success) {
      setCreatedLotsSource(buildData(res.data));
    }
  };

  const getSummoningBatches = async () => {
    const condition = {
      condition: {
        isSummoned: 1,
      },
    };
    const res = await getBatchesByFactoryId(authUser.id, condition);
    if (res.success) {
      setSummoningLotsSource(buildData(res.data));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((batch) => {
      const date = new Date(batch.createdAt);
      const time = date.toLocaleString("vi-VN").split(",")[1];
      return {
        key: batch?.id,
        factory_id: batch?.factory_id,
        time,
        model_id: batch?.model_id,
        model: batch?.model.name,
        version: batch?.version.name,
        version_id: batch?.version_id,
        amount: batch?.amount,
        color: batch?.color,
      };
    });

    return builtData;
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

  const handleSummon = async () => {
    try {
      const res = await requestSummon(
        selectedBatch.key,
        authUser.id,
        form.getFieldsValue()
      );
      if (res.success) {
        message.success(
          `Bạn đã yêu cầu triệu hồi cho lô sản phẩm mã ${selectedBatch.key}`,
          2
        );
        getBatches();
        getSummoningBatches();
        setSummonReqModalVisible(false);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };

  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Lô sản phẩm",
          onAdd: () => setAddModalVisible(true),
        }}
        showSearch={false}
      >
        <Tabs items={tabItems} />
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
      {summonReqModalVisible && (
        <CustomModal
          open={summonReqModalVisible}
          onCancel={() => setSummonReqModalVisible(false)}
          onOk={() => handleSummon()}
          title="Yêu cầu triệu hồi"
          width={isMobile ? "80%" : "40%"}
        >
          <SummonReqForm form={form} />
        </CustomModal>
      )}
    </>
  );
}
