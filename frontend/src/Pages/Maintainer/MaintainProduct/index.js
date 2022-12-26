import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { getAllMaintainProducts } from "../../../apis/maintainer";
import PageContent from "../../../Components/PageContent";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";

export default function MaintainProduct() {
  const [maintainProductsDataSource, setMaintainProductsDataSource] = useState(
    []
  );
  const columns = [
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
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Đại lý",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Ngày tiếp nhận",
      dataIndex: "receivedDate",
      key: "receivedDate",
    },
    {
      title: "Ngày gửi đi",
      dataIndex: "finishedDate",
      key: "finishedDate",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render: () => <ActionsCell hasView={false} hasConfirm={false} />,
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Sản phẩm bảo hành",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter((column) => column.key !== "amount")}
            dataSource={maintainProductsDataSource}
          />
        </PageContent>
      ),
    },
    {
      key: "2",
      label: "Sản phẩm triệu hồi",
      children: (
        <PageContent>
          <CustomTable
            columns={columns.filter(
              (column) => column.key !== "id" && column.key !== "store"
            )}
          />
        </PageContent>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const res = await getAllMaintainProducts();

    if (res.success) {
      setMaintainProductsDataSource(buildData(res.data));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((product) => {
      return {
        key: product.id,
        id: product.uuid,
        model: product.model.name,
        version: product.version.name,
      };
    });

    return builtData;
  };
  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm bảo hành/triệu hồi",
        hasAction: false,
      }}
      showSearch={false}
    >
      <Tabs items={tabItems} />
    </PageContent>
  );
}
