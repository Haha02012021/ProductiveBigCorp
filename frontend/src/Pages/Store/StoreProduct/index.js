import React, { useState, useCallback, useEffect, useContext } from "react";
import { Tabs } from "antd";
import CustomTable from "../../../Components/Table/CustomTable";
import ActionsCell from "../../../Components/Table/ActionsCell";
import PageContent from "../../../Components/PageContent";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import { buildData } from "../../../const/tableProduct";
import ModalViewProduct from "../../ExecutiveBoard/Product/modalViewProduct";
import ModalRequest from "./modalRequest";
import ModalSell from "./modalSell";
import moment from "moment";
import ModalConfirm from "./modalConfirm";
import { completeProduct, deleteRequest } from "../../../apis/store";
import { toast } from "react-toastify";

const StoreProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [productStore, setProductStore] = useState([]);
  const [productMoving, setProductMoving] = useState([]);
  const [isModalRequest, setIsModalRequest] = useState(false);
  const [isModalSell, setIsModalSell] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [addRequest, setAddRequest] = useState(false);
  const [requests, setRequests] = useState([]);
  const [idProductSell, setIdProductSell] = useState(0);
  const [selled, setSelled] = useState(false);

  const requestProductColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
      align: "center",
    },

    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
      width: 182,
      height: 56,
      align: "center",
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 140,
      height: 56,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      width: 50,
      align: "center",
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      width: 50,
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 182,
      align: "center",
    },
    {
      title: "Trạng thấi",
      dataIndex: "progress",
      key: "progress",
      width: 104,
    },
    {
      title: "Thời gian yêu cầu",
      dataIndex: "time",
      key: "time",
      with: 100,
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 80,
      render: (text, record, index) => (
        <ActionsCell
          hasEdit={false}
          hasView={false}
          hasConfirm={false}
          onDelete={async () => {
            const res = await deleteRequest(record.id);
            if (res.success === true) {
              setAddRequest(!addRequest);
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
          }}
        />
      ),
    },
  ];

  const movingProductColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 100,
      height: 56,
      align: "center",
    },

    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
      width: 182,
      height: 56,
      align: "center",
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 140,
      height: 56,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      width: 50,
      align: "center",
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      width: 50,
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 182,
      align: "center",
    },
    {
      title: "Trạng thấi",
      dataIndex: "progress",
      key: "progress",
      width: 104,
    },
    {
      title: "Thời gian yêu cầu",
      dataIndex: "time",
      key: "time",
      with: 100,
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 80,
      render: (text, record, index) => (
        <ActionsCell
          hasEdit={false}
          hasView={false}
          hasDelete={false}
          onConfirm={() => {
            setIsModalConfirm(true);
            setIdProduct(record.id);
          }}
        />
      ),
    },
  ];

  const productColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 64,
      height: 56,
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Màu sản phẩm",
      dataIndex: "color",
      key: "color",
      width: 150,
      height: 56,
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Trạng thấi",
      dataIndex: "status",
      key: "status",
      width: 104,
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
          onView={() => showModal(record)}
          onEdit={() => {
            if (record.id !== idProductSell) {
              setIdProductSell(record.id);
            }
            if (isModalOpen === false) {
              setIsModalSell(true);
            }
          }}
        />
      ),
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

  const handleRequestOk = () => {
    setIsModalRequest(false);
  };
  const handleRequestCancel = () => {
    setIsModalRequest(false);
  };

  const { authUser } = useContext(AuthContext);

  const changeData = useCallback(() => {
    setAddRequest(!addRequest);
  }, []);

  useEffect(() => {
    if (authUser && authUser.id) {
      getRequest(authUser.id);
    }
  }, [addRequest]);

  useEffect(() => {
    getProductsStore();
    if (authUser && authUser.id) {
      getProductMoving(authUser.id);
    }
  }, [selled]);

  const getProductsStore = async () => {
    const condition = {
      condition: {
        isSold: 0,
        status_id: 4,
      },
    };
    const res = await indexApi.getProductsByManagerId(authUser.id, condition);
    if (res.data && res.data.products) {
      setProductStore(buildData(res.data.products));
    }
  };

  const acceptProduct = async () => {
    const res = await completeProduct(idProduct, authUser.id);
    if (res.success === true) {
      setIsModalConfirm(false);
      setSelled(!selled);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const getRequest = async (id) => {
    const condition = {
      condition: {
        progress: 0,
      },
      role: 4,
    };
    const res = await indexApi.getRequestsByManagerId(id, condition);
    console.log(res);
    if (res.data && res.data.sentRequests) {
      setRequests(buildDataRequest(res.data.sentRequests));
    }
  };

  const getProductMoving = async (id) => {
    const condition = {
      condition: {
        progress: 1,
      },
      role: 4,
    };
    const res = await indexApi.getRequestsByManagerId(id, condition);
    if (res.data && res.data.sentRequests) {
      setProductMoving(buildDataRequest(res.data.sentRequests));
    }
  };

  const buildDataRequest = (data) => {
    const result = new Array();
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.id = data[i]?.id;
        o.key = i;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.model = data[i]?.model?.name;
        o.color = data[i]?.color?.name;
        o.factory = data[i]?.factory?.name;
        o.price = data[i]?.version?.price + " VND";
        o.status = data[i]?.status?.context;
        o.amount = data[i]?.amount;
        o.time = moment(data[i]?.createdAt).calendar();
        o.progress =
          data[i]?.progress === 0
            ? "Chờ xác nhận"
            : data[i]?.progress === 1
            ? "Đang vận chuyển"
            : "Đã hủy";
      }
      result.push(o);
    }
    if (result.length === 0) return [];
    return result;
  };

  const tabItems = [
    {
      label: `Yêu cầu tới nhà máy`,
      key: "1",
      children: (
        <CustomTable dataSource={requests} columns={requestProductColumns} />
      ),
    },
    {
      label: `Sản phẩm đang vận chuyển`,
      key: "2",
      children: (
        <CustomTable
          dataSource={productMoving}
          columns={movingProductColumns}
        />
      ),
    },
    {
      label: `Sản phẩm trong kho`,
      key: "3",
      children: (
        <CustomTable dataSource={productStore} columns={productColumns} />
      ),
    },
    {
      label: `Yêu cầu bị từ chối`,
      key: "4",
      children: (
        <CustomTable dataSource={requests} columns={requestProductColumns} />
      ),
    },
  ];

  return (
    <PageContent
      pageHeaderProps={{
        title: "Kho sản phẩm",
        hasAction: true,
        onAdd: () => setIsModalRequest(true),
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
      {isModalRequest && (
        <ModalRequest
          isModalOpen={isModalRequest}
          handleOk={handleRequestOk}
          handleCancel={handleRequestCancel}
          addRequest={changeData}
        />
      )}
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idProduct={idProduct}
        />
      )}
      {isModalSell && (
        <ModalSell
          isModalOpen={isModalSell}
          handleOk={() => setIsModalSell(false)}
          handleCancel={() => setIsModalSell(false)}
          idProduct={idProductSell}
          handleSell={() => setSelled(!selled)}
        />
      )}
      {isModalConfirm && (
        <ModalConfirm
          isModalOpen={isModalConfirm}
          handleOk={() => {
            acceptProduct();
          }}
          handleCancel={() => setIsModalConfirm(false)}
          idProduct={idProduct}
        />
      )}
    </PageContent>
  );
};

export default StoreProduct;
