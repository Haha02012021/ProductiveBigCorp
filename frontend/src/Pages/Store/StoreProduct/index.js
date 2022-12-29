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
import getUniqueArray from "../../../utils/getUniqueArray";

const StoreProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [currentTab, setCurrentTab] = useState("1");
  const [productStore, setProductStore] = useState([]);
  const [productMoving, setProductMoving] = useState([]);
  const [isModalRequest, setIsModalRequest] = useState(false);
  const [isModalSell, setIsModalSell] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [addRequest, setAddRequest] = useState(false);
  const [requests, setRequests] = useState([]);
  const [refuseProducts, setRefuseProducts] = useState([]);
  const [idProductSell, setIdProductSell] = useState(0);
  const [selled, setSelled] = useState(false);

  const buildDataFilter = (arr, ob) => {
    return arr.map((product) => {
      return {
        text: product[ob?.text],
        value: product[ob?.value],
      };
    });
  };
  const requestProductColumns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      width: 50,
      height: 56,
      align: "center",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      height: 56,
      width: 130,
      align: "center",
      filters: getUniqueArray(
        currentTab === "1"
          ? buildDataFilter(requests, { text: "model", value: "modelId" })
          : currentTab === "2"
          ? buildDataFilter(productMoving, { text: "model", value: "modelId" })
          : currentTab === "3"
          ? buildDataFilter(productStore, { text: "model", value: "modelId" })
          : currentTab === "4"
          ? buildDataFilter(refuseProducts, { text: "model", value: "modelId" })
          : []
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.modelId === values;
      },
    },

    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
      height: 56,
      align: "center",
      filters: getUniqueArray(
        currentTab === "1"
          ? buildDataFilter(requests, { text: "version", value: "versionId" })
          : currentTab === "2"
          ? buildDataFilter(productMoving, {
              text: "version",
              value: "versionId",
            })
          : currentTab === "3"
          ? buildDataFilter(productStore, {
              text: "version",
              value: "versionId",
            })
          : currentTab === "4"
          ? buildDataFilter(refuseProducts, {
              text: "version",
              value: "versionId",
            })
          : []
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.versionId === values;
      },
    },
    {
      title: "Cơ sở sản xuất",
      dataIndex: "factory",
      key: "factory",
      width: 120,
      height: 56,
      align: "center",
      filters: getUniqueArray(
        currentTab === "1"
          ? buildDataFilter(requests, { text: "factory", value: "factoryId" })
          : currentTab === "2"
          ? buildDataFilter(productMoving, {
              text: "factory",
              value: "factoryId",
            })
          : currentTab === "3"
          ? buildDataFilter(productStore, {
              text: "factory",
              value: "factoryId",
            })
          : currentTab === "4"
          ? buildDataFilter(refuseProducts, {
              text: "factory",
              value: "factoryId",
            })
          : []
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.colorId === values;
      },
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
      align: "center",
      filters: getUniqueArray(
        currentTab === "1"
          ? buildDataFilter(requests, { text: "color", value: "colorId" })
          : currentTab === "2"
          ? buildDataFilter(productMoving, { text: "color", value: "colorId" })
          : currentTab === "3"
          ? buildDataFilter(productStore, { text: "color", value: "colorId" })
          : currentTab === "4"
          ? buildDataFilter(refuseProducts, { text: "color", value: "colorId" })
          : []
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.colorId === values;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "center",
    },
    {
      title: "Trạng thấi",
      dataIndex: currentTab === "3" ? "status" : "progress",
      key: "progress",
      width: 104,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      with: 100,
      align: "center",
    },
    {
      title: "Lý do từ chối",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 30,
      render: (text, record, index) => (
        <ActionsCell
          hasEdit={currentTab === "3" ? true : false}
          hasView={currentTab === "3" ? true : false}
          hasConfirm={currentTab === "2" ? true : false}
          editText={"Bán"}
          confirmText={"Đã Nhận"}
          hasDelete={currentTab === "1" || currentTab === "4" ? true : false}
          onDelete={() => {
            deleteRequestClick(record);
          }}
          onConfirm={() => {
            setIsModalConfirm(true);
            setIdProduct(record.id);
          }}
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

  const deleteRequestClick = async (record) => {
    console.log(record);
    console.log(record.progress);
    if (record.progress === "Chờ xác nhận" || record.progress === "Đã hủy") {
      const res = await deleteRequest(record.id);
      if (res.success === true) {
        setAddRequest(!addRequest);
        setSelled(!selled);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Không được phép xóa");
    }
  };

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
    getRefuseReProducts();
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

  const getRefuseReProducts = async () => {
    try {
      const condition = {
        condition: {
          progress: -1,
        },
        role: 4,
      };
      const res = await indexApi.getRequestsByManagerId(authUser.id, condition);
      if (res.data && res.data.requests) {
        setRefuseProducts(buildDataRequest(res.data.requests));
      } else {
        setRefuseProducts([]);
      }
    } catch (error) {
      setRefuseProducts([]);
    }
  };

  const acceptProduct = async () => {
    try {
      const res = await completeProduct(idProduct, authUser.id);
      if (res.success === true) {
        setIsModalConfirm(false);
        setSelled(!selled);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRequest = async (id) => {
    try {
      const condition = {
        condition: {
          progress: 0,
        },
        role: 4,
      };
      const res = await indexApi.getRequestsByManagerId(id, condition);
      if (res.data && res.data.requests) {
        setRequests(buildDataRequest(res.data.requests));
      } else {
        setRequests([]);
      }
    } catch (error) {
      setRequests([]);
    }
  };

  const getProductMoving = async (id) => {
    try {
      const condition = {
        condition: {
          progress: 1,
        },
        role: 4,
      };

      const summonMoving = {
        condition: {
          isSold: 0,
          status_id: 10,
        },
      };
      const res = await indexApi.getRequestsByManagerId(id, condition);
      const res2 = await indexApi.getProductsByManagerId(
        authUser.id,
        summonMoving
      );
      if (res2.data && res2.data.products) {
        setProductMoving([...buildData(res2.data.products)]);
      }
      if (res.data && res.data.requests) {
        setProductMoving(buildDataRequest(res.data.requests));
      }
    } catch (error) {
      setProductMoving([]);
    }
  };

  const buildDataRequest = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const o = {};
      if (data[i]) {
        o.id = data[i]?.id;
        o.key = i;
        o.code = data[i]?.id;
        o.version = data[i]?.version?.name;
        o.versionId = data[i]?.verionId;
        o.model = data[i]?.model?.name;
        o.modelId = data[i]?.model?.id;
        o.color = data[i]?.color?.name;
        o.colorId = data[i]?.color?.id;
        o.factory = data[i]?.factory?.name;
        o.factoryId = data[i]?.factory?.id;
        o.price =
          `${data[i]?.version?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " VND";
        o.status = data[i]?.status?.context;
        o.amount = data[i]?.amount;
        o.time = moment(data[i]?.createdAt).calendar();
        o.progress =
          data[i]?.progress === 0
            ? "Chờ xác nhận"
            : data[i]?.progress === 1
            ? "Đang vận chuyển"
            : "Đã hủy";

        o.reason = data[i]?.canceledReason;
      }
      result.push(o);
    }
    if (result.length === 0) return [];
    return result;
  };

  const handleSearch = (results) => {
    switch (currentTab) {
      case "2":
        if (results) {
          setProductMoving(results);
        } else {
          getProductMoving();
        }
        break;
      case "3":
        if (results) {
          setProductStore(results);
        } else {
          getProductsStore();
        }
        break;
      default:
        break;
    }
  };

  const tabItems = [
    {
      label: `Yêu cầu tới nhà máy`,
      key: "1",
      children: (
        <CustomTable
          dataSource={requests}
          columns={requestProductColumns.filter((request) => {
            return request.key !== "reason";
          })}
        />
      ),
    },
    {
      label: `Sản phẩm đang vận chuyển`,
      key: "2",
      children: (
        <PageContent getSearchResults={handleSearch}>
          <CustomTable
            dataSource={productMoving}
            columns={requestProductColumns.filter((request) => {
              return request.key !== "reason";
            })}
          />
        </PageContent>
      ),
    },
    {
      label: `Sản phẩm trong kho`,
      key: "3",
      children: (
        <PageContent getSearchResults={handleSearch}>
          <CustomTable
            dataSource={productStore}
            columns={requestProductColumns.filter((request) => {
              return (
                request.key !== "progress" &&
                request.key !== "reason" &&
                request.key !== "time" &&
                request.key !== "amount"
              );
            })}
          />
        </PageContent>
      ),
    },
    {
      label: `Yêu cầu bị từ chối`,
      key: "4",
      children: (
        <CustomTable
          dataSource={refuseProducts}
          columns={requestProductColumns.filter((request) => {
            return request.key !== "progress" && request.key !== "time";
          })}
        />
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
        activeKey={currentTab}
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
          title={"Xác nhận đã nhận được sản phẩm"}
          handleCancel={() => setIsModalConfirm(false)}
          idProduct={idProduct}
        />
      )}
    </PageContent>
  );
};

export default StoreProduct;
