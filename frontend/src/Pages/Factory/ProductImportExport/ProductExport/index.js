import { Badge, Form, message, Modal, Select, Tabs } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import { acceptRequest, refuseRequestById } from "../../../../apis/factory";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import { progress } from "../../../../const";
import { AuthContext } from "../../../../Provider/AuthProvider";
import CancelForm from "./CancelForm";

export default function ProductExport() {
  const { authUser } = useContext(AuthContext);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [reqDataSource, setReqDataSource] = useState([]);
  const [canceledReqDataSource, setCanceledReqDataSource] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState();
  const [form] = Form.useForm();
  const columns = useMemo(() => {
    return [
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
        title: "Số lượng",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Đại lý",
        dataIndex: "store",
        key: "store",
      },
      {
        title: "Trạng thái",
        dataIndex: "progress",
        key: "progress",
        render: (_, record) => {
          return (
            <Badge
              text={progress[record.progress].context}
              color={progress[record.progress].color}
            />
          );
        },
      },
      {
        title: "Ngày xuất/nhận",
        dataIndex: "inExportDate",
        key: "inExportDate",
      },
      {
        title: "Lý do hủy",
        dataIndex: "cancelReason",
        key: "cancelReason",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => (
          <ActionsCell
            hasView={false}
            hasEdit={false}
            hasConfirm={record.progress === 0}
            onConfirm={() => handleConfirm(record)}
            onDelete={() => handleCancel(record)}
          />
        ),
      },
    ];
  }, []);

  useEffect(() => {
    getRequestsByManagerId();
    getCanceledReqsByManagerId();
  }, [cancelModalVisible]);

  const getRequestsByManagerId = async () => {
    let data = [];
    const condition0 = {
      condition: {
        progress: 0,
      },
      role: 2,
    };
    const res0 = await indexApi.getRequestsByManagerId(authUser.id, condition0);

    if (res0.success) {
      data = [...data, ...buildData(res0.data.receivedRequests)];
    }

    const condition1 = {
      condition: {
        progress: 1,
      },
      role: 2,
    };

    const res1 = await indexApi.getRequestsByManagerId(authUser.id, condition1);

    if (res1.success) {
      data = [...data, ...buildData(res1.data.receivedRequests)];
    }

    const condition2 = {
      condition: {
        progress: 2,
      },
      role: 2,
    };

    const res2 = await indexApi.getRequestsByManagerId(authUser.id, condition2);

    if (res2.success) {
      data = [...data, ...buildData(res2.data.receivedRequests)];
    }

    setReqDataSource(data);
  };

  const getCanceledReqsByManagerId = async () => {
    const condition = {
      condition: {
        progress: -1,
      },
      role: 2,
    };
    const res = await indexApi.getRequestsByManagerId(authUser.id, condition);

    if (res.success) {
      setCanceledReqDataSource(buildData(res.data.receivedRequests));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((req) => {
      const acceptedAt = req.acceptedAt
        ? new Date(req.acceptedAt).toLocaleString("vi-VN").split(",")[1]
        : "-";

      return {
        key: req.id,
        model: req.model.name,
        version: req.version.name,
        amount: req.amount,
        store: req.store.name,
        progress: req.progress,
        inExportDate: acceptedAt + " ~ -",
        canceledDate: new Date(req.canceledAt)
          .toLocaleString("vi-VN")
          .split(",")[1],
        cancelReason: req.canceledReason,
      };
    });

    return builtData;
  };

  const handleConfirm = async (data) => {
    try {
      const res = await acceptRequest(data.key, authUser.id);

      if (res.success) {
        message.success("Đã xác nhận gửi đơn hàng", 2);
        getRequestsByManagerId();
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };

  const handleCancel = (data) => {
    setSelectedReqId(data.key);
    setCancelModalVisible(true);
  };

  const handleAcceptCancel = () => {
    Modal.confirm({
      content: "Bạn có chắc muốn hủy đơn hàng này không?",
      cancelText: "Không",
      okText: "Có",
      onCancel: () => {},
      onOk: async () => {
        const res = await refuseRequestById(
          selectedReqId,
          form.getFieldValue()
        );

        if (res.success) {
          setCancelModalVisible(false);
          message.success("Hủy đơn hàng thành công!", 2);
        } else {
          message.error(res.message, 2);
        }
      },
    });
  };

  const tabItems = [
    {
      label: `Đơn hàng được yêu cầu`,
      key: "1",
      children: (
        <PageContent>
          <CustomTable
            dataSource={reqDataSource}
            columns={columns.filter(
              (column) =>
                column.key !== "canceledPerson" && column.key !== "cancelReason"
            )}
          />
        </PageContent>
      ),
    },
    {
      label: `Đơn hàng đã hủy`,
      key: "2",
      children: (
        <PageContent>
          <CustomTable
            dataSource={canceledReqDataSource}
            columns={columns.filter((column) => column.key !== "actions")}
          />
        </PageContent>
      ),
    },
  ];

  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Xuất sản phẩm cho đại lý",
          hasAction: false,
        }}
        showSearch={false}
      >
        <Tabs items={tabItems} />
      </PageContent>
      {cancelModalVisible && (
        <CustomModal
          open={cancelModalVisible}
          title="Sửa trạng thái đơn hàng"
          onCancel={() => setCancelModalVisible(false)}
          onOk={() => handleAcceptCancel()}
          width="40%"
        >
          <CancelForm form={form} reqId={selectedReqId} />
        </CustomModal>
      )}
    </>
  );
}
