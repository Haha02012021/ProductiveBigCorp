import { message, Tabs } from "antd";
import { useContext, useMemo } from "react";
import { receiveBrokenProducts } from "../../../../apis/factory";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import { AuthContext } from "../../../../Provider/AuthProvider";

const waitingProducts = [
  {
    id: 1,
    productLine: "ABC",
    version: "1",
    error: "Error",
    key: 1,
  },
];

const errorProducts = [
  {
    id: 1,
    model: "ABC MNPQ MNPQMNPQ MNPQMNPQ MNPQ",
    version: "1",
    error:
      "Error Error Error Error Error Error Error ErrorErrorError ErrorErrorErrorErrorError     ErrorErrorErrorErrorErrorErrorErrorErrorErrorError ErrorErrorErrorErrorError ErrorErrorErrorErrorError",
  },
];

export default function ProductImport() {
  const { authUser } = useContext(AuthContext);
  const columns = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: "id",
        key: "id",
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
        title: "Lỗi",
        dataIndex: "error",
        key: "error",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 130,
        render: (_, record) => (
          <ActionsCell
            hasDelete={false}
            hasEdit={false}
            hasView={false}
            onConfirm={() => handleConfirm(record)}
          />
        ),
      },
    ],
    []
  );
  const tabItems = useMemo(
    () => [
      {
        label: `Chờ xác nhận`,
        key: "1",
        children: (
          <PageContent>
            <CustomTable dataSource={waitingProducts} columns={columns} />
          </PageContent>
        ),
      },
      {
        label: `Sản phẩm lỗi`,
        key: "2",
        children: (
          <PageContent>
            <CustomTable
              dataSource={errorProducts}
              columns={columns.filter((column) => column.key !== "actions")}
            />
          </PageContent>
        ),
      },
    ],
    []
  );

  const handleConfirm = async (data) => {
    const req = {
      products: [data.key],
      factory_id: authUser.id,
    };

    try {
      const res = await receiveBrokenProducts(req);

      if (res.success) {
        message.success("Đã xác nhận sản phẩm lỗi", 2);
      }
    } catch (error) {
      message.error(error.message, 2);
    }
  };

  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm lỗi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} />
    </PageContent>
  );
}
