import React, { useState, useMemo, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import { Tabs } from "antd";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";
import ModelSendWarranty from "./modelSendWarranty";
import moment from "moment";
import TabProductWarranty from "./tabProductWarranty";
import TabProductMantained from "./tabProductMaintained";
import TabProductMoving from "./tabProductMoving";

const ProductWarranty = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalWarrantyOpen, setIsModalWarrantyOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [selledProducts, setSelledProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(0);
  const [idProductWarranty, setIdProductWarranty] = useState(1);
  const [summonProducts, setSummonProducts] = useState([]);

  const showModal = (data) => {
    if (data.id !== idProduct) {
      setIdProduct(data.id);
    }
    if (isModalOpen === false) {
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productSelledColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
      align: "center",
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
      title: "Ngày bán",
      dataIndex: "sellDate",
      key: "sellDate",
      width: 150,
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 150,
    },
    {
      title: "Màu sản phẩm",
      dataIndex: "color",
      key: "color",
      width: 150,
      height: 56,
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (text, record, index) => (
        <ActionsCell
          hasDelete={false}
          hasConfirm={false}
          onView={() => showModal(record)}
          onEdit={() => {
            if (record.id !== idProductWarranty) {
              setIdProductWarranty(record.id);
            }
            if (isModalOpen === false) {
              setIsModalWarrantyOpen(true);
            }
          }}
        />
      ),
      align: "center",
    },
  ];

  const summonProductColumns = useMemo(
    () => [
      {
        title: "Mã",
        dataIndex: "code",
        key: "code",
        width: 50,
        height: 56,
        align: "center",
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "version",
        width: 200,
        align: "center",
      },
      {
        title: "Lỗi",
        dataIndex: "error",
        key: "error",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 100,
      },
      {
        title: "Ngày gửi",
        dataIndex: "requestDate",
        key: "requestDate",
        width: 140,
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 80,
        render: (text, record, index) => (
          <ActionsCell
            hasConfirm={false}
            hasDelete={false}
            hasEdit={false}
            onView={() => showModal(record)}
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getProductsStore({
      condition: {
        isSold: 1,
      },
    });

    getSummonProducts({
      condition: {
        status_id: 16,
      },
    });
  }, []);

  const buildData = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.key = data[i]?.id;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.sellDate = moment(data[i]?.soldAt).calendar();
        o.factory = data[i]?.managers[0]?.name;
        o.status = data[i]?.status?.context;
        o.statusWarranty = data[i]?.statusWarranty;
        o.model = data[i]?.model?.name;
        o.color = data[i]?.color?.name;
        o.id = data[i]?.id;
        o.error =
          data[i] && data[i].errors && data[i].errors.length > 0
            ? data[i].errors[0]?.content
            : null;
        o.requestDate = moment(
          data[i] && data[i].errors && data[i].errors.length > 0
            ? data[i].errors[0]?.updatedAt
            : null
        ).calendar();
      }
      result.push(o);
    }
    return result;
  };

  const getProductsStore = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSelledProducts(buildData(res.data.products));
    }
  };

  const getSummonProducts = async (condition) => {
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setSummonProducts(buildData(res.data.products));
    }
  };

  const tabItems = [
    {
      label: `Sản phẩm đã bán`,
      key: "1",
      children: (
        <CustomTable
          dataSource={selledProducts}
          columns={productSelledColumns}
        />
      ),
    },
    {
      label: `Gửi bảo hành`,
      key: "2",
      children: (
        <TabProductWarranty
          showModal={() => setIsModalOpen(true)}
          selectProduct={(id) => setIdProduct(id)}
        />
      ),
    },
    {
      label: `Chờ vận chuyển`,
      key: "3",
      children: (
        <TabProductMoving
          showModal={() => setIsModalOpen(true)}
          selectProduct={(id) => setIdProduct(id)}
        />
      ),
    },
    {
      label: `Chờ bàn giao`,
      key: "4",
      children: (
        <TabProductMantained
          showModal={() => setIsModalOpen(true)}
          selectProduct={(id) => setIdProduct(id)}
        />
      ),
    },
    {
      label: `Sản phẩm triệu hồi`,
      key: "5",
      children: (
        <CustomTable
          dataSource={summonProducts}
          columns={summonProductColumns}
        />
      ),
    },
  ];
  return (
    <PageContent
      pageHeaderProps={{
        title: "Sản phẩm bảo hành/triệu hồi",
        hasAction: false,
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
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idProduct={idProduct}
        />
      )}
      {isModalWarrantyOpen && (
        <ModelSendWarranty
          isModalOpen={isModalWarrantyOpen}
          handleOk={() => setIsModalWarrantyOpen(false)}
          handleCancel={() => setIsModalWarrantyOpen(false)}
          idProductWarranty={idProductWarranty}
        />
      )}
    </PageContent>
  );
};

export default ProductWarranty;
