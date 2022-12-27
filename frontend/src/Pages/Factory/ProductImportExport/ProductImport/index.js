import { message, Modal, Tabs } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import { receiveBrokenProducts } from "../../../../apis/factory";
import PageContent from "../../../../Components/PageContent";
import ActionsCell from "../../../../Components/Table/ActionsCell";
import CustomTable from "../../../../Components/Table/CustomTable";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { ThemeContext } from "../../../../Provider/ThemeProvider";

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
  const { isMobile } = useContext(ThemeContext);
  const { authUser } = useContext(AuthContext);
  const [brokenProducts, setBrokenProducts] = useState([]);
  const [destroyedProducts, setDestroyedProducts] = useState([]);
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
  ];

  const handleSearchBrokenProductResults = (results) => {
    if (results) {
      setBrokenProducts(buildData([results]));
    } else {
      getBrokenProducts();
    }
  };

  const handleSearchDestroyedProductResults = (results) => {
    if (results) {
      setDestroyedProducts(buildData([results]));
    } else {
      getDestroyedProducts();
    }
  };

  const tabItems = [
    {
      label: `Chờ xác nhận`,
      key: "1",
      children: (
        <PageContent getSearchResults={handleSearchBrokenProductResults}>
          <CustomTable dataSource={brokenProducts} columns={columns} />
        </PageContent>
      ),
    },
    {
      label: `Sản phẩm lỗi`,
      key: "2",
      children: (
        <PageContent getSearchResults={handleSearchDestroyedProductResults}>
          <CustomTable
            dataSource={destroyedProducts}
            columns={columns.filter((column) => column.key !== "actions")}
          />
        </PageContent>
      ),
    },
  ];

  useEffect(() => {
    getBrokenProducts();
    getDestroyedProducts();
  }, [authUser]);

  const getBrokenProducts = async () => {
    const condition = {
      condition: {
        status_id: 13,
      },
      role: 2,
    };
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);
      if (res.success) {
        setBrokenProducts(buildData(res.data.products));
      }
    } catch (error) {
      setBrokenProducts([]);
    }
  };

  const getDestroyedProducts = async () => {
    let ds = [];
    const condition14 = {
      condition: {
        status_id: 14,
      },
      role: 2,
    };
    try {
      const res14 = await indexApi.getProductsByManagerId(
        authUser.id,
        condition14
      );
      if (res14.success) {
        ds = [...ds, ...buildData(res14.data.products)];
      }
    } catch (error) {}

    const condition15 = {
      condition: {
        status_id: 15,
      },
      role: 2,
    };
    try {
      const res15 = await indexApi.getProductsByManagerId(
        authUser.id,
        condition15
      );
      console.log(res15);
      if (res15.success) {
        ds = [...ds, ...buildData(res15.data.products)];
      }
    } catch (error) {}

    setDestroyedProducts(ds);
  };

  const buildData = (data) => {
    const builtData = data.map((product) => {
      return {
        key: product.id,
        id: product.uuid,
        model: product.model.name,
        version: product.version.name,
        error: product.errors[0]?.content,
      };
    });
    return builtData;
  };

  const handleConfirm = (data) => {
    const req = {
      products: [data.key],
      factory_id: authUser.id,
    };

    Modal.confirm({
      content:
        "Bạn có chắc chắn xác nhận sản phẩm này bị lỗi và sẽ bị tiêu hủy không?",
      okText: "Có",
      cancelText: "Không",
      closable: true,
      width: isMobile ? "80%" : "40%",
      onCancel: () => {},
      onOk: async () => {
        try {
          const res = await receiveBrokenProducts(req);

          if (res.success) {
            message.success("Đã xác nhận sản phẩm lỗi", 2);
            getBrokenProducts();
            getDestroyedProducts();
          }
        } catch (error) {
          message.error(error.message, 2);
        }
      },
    });
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
