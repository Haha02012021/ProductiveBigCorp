import { message, Tabs } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
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
  const [brokenProducts, setBrokenProducts] = useState([]);
  const [destroyedProducts, setDestroyedProducts] = useState([]);
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
            <CustomTable dataSource={brokenProducts} columns={columns} />
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

  useEffect(() => {
    getBrokenProducts();
  }, []);

  const getBrokenProducts = async () => {
    const condition = {
      condition: {
        status_id: 13,
      },
      role: 2,
    };
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    console.log(res);
    if (res.success) {
      setBrokenProducts(buildData(res.data.products));
    }
  };

  const buildData = (data) => {
    const builtData = data.map((product) => {
      return {
        key: product.id,
        id: product.uuid,
        model: product.model.name,
        version: product.version.name,
        error: product.errors[0].content,
      };
    });
    return builtData;
  };

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
