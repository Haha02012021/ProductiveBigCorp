import { Badge, Form, Select, Tabs } from "antd";
import { useMemo, useState } from "react";
import CustomModal from "../../../../Components/CustomModal";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import ExportForm from "./ExportForm";

const dataSource = [
  {
    model: "Model",
    version: "Version",
    amount: 100,
    store: "Store1",
    state: {
      id: 1,
      name: "created",
    },
    inExportDate: "25/12/2022 ~ ",
  },
];

export default function ProductExport() {
  const [editModalVisible, setEditModalVisible] = useState(false);
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
        dataIndex: "state",
        key: "state",
        render: (_, record) => {
          return <Badge status="success" text={record.state.name} />;
        },
      },
      {
        title: "Ngày xuất/nhận",
        dataIndex: "inExportDate",
        key: "inExportDate",
      },
      {
        title: "Người hủy",
        dataIndex: "canceledPerson",
        key: "canceledPerson",
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
            onEdit={() => handleEdit(record)}
            onConfirm={() => handleConfirm(record)}
          />
        ),
      },
    ];
  }, []);

  const handleEdit = (data) => {
    setEditModalVisible(true);
  };

  const handleConfirm = (data) => {};

  const tabItems = [
    {
      label: `Đơn hàng được yêu cầu`,
      key: "1",
      children: (
        <PageContent>
          <CustomTable
            dataSource={dataSource}
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
            dataSource={[]}
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
      {editModalVisible && (
        <CustomModal
          open={editModalVisible}
          title="Sửa trạng thái đơn hàng"
          onCancel={() => setEditModalVisible(false)}
        >
          <ExportForm form={form} />
        </CustomModal>
      )}
    </>
  );
}
