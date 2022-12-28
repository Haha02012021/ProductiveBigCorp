import React, { useState, useContext, useEffect } from "react";
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
import TabSendSummon from "./tabSendSummon";

const ProductWarranty = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalWarrantyOpen, setIsModalWarrantyOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [selledProducts, setSelledProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(0);
  const [idProductWarranty, setIdProductWarranty] = useState(1);
  const [change, setChange] = useState(false);

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
      render: (text, record) => (
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

  useEffect(() => {
    getProductsStore({
      condition: {
        isSold: 1,
      },
    });
  }, [change]);

  const buildData = (data) => {
    const result = [];
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
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);
      if (res.data && res.data.products) {
        setSelledProducts(buildData(res.data.products));
      } else {
        setSelledProducts([]);
      }
    } catch (error) {
      setSelledProducts([]);
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
          setTab={() => setCurrentTab("4")}
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
        <TabSendSummon
          showModal={() => setIsModalOpen(true)}
          selectProduct={(id) => setIdProduct(id)}
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
        tabPosition="top"
        items={tabItems}
        activeKey={currentTab}
        onChange={(key) => {
          console.log(key);
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
          handleOk={() => {
            setChange(!change);
            setCurrentTab("2");
            setIsModalWarrantyOpen(false);
          }}
          handleCancel={() => setIsModalWarrantyOpen(false)}
          idProductWarranty={idProductWarranty}
        />
      )}
    </PageContent>
  );
};

export default ProductWarranty;
