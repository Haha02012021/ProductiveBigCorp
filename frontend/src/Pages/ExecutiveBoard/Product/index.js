import { Badge } from "antd";
import React, { useState, useEffect } from "react";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import ModalViewProduct from "./modalViewProduct";
import PageContent from "../../../Components/PageContent";
import coporationApi from "../../../apis/coporation";
import { statuses } from "../../../const/index";
import getUniqueArray from "../../../utils/getUniqueArray";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const [products, setProducts] = useState([]);

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
    getProducts();
  }, []);

  const getProducts = async (condition) => {
    const res = await coporationApi.getProducts(condition);
    if (res.data) {
      const data = res.data;
      const builtData = buildData(data.products);
      setProducts(builtData);
      // setFilteredProducts(builtData);
    }
  };

  const buildData = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const o = {};
      const factory = data[i].managers.find((manager) => manager.role === "2");
      const store = data[i].managers.find((manager) => manager.role === "4");
      const maintainCenter = data[i].managers.find(
        (manager) => manager.role === "3"
      );
      if (data[i]) {
        o.id = data[i].id;
        o.key = i;
        o.version = data[i].version.name;
        o.versionId = data[i].version.id;
        o.productLine = data[i].model.name;
        o.productLineId = data[i].model.id;
        o.factory = factory?.name;
        o.factoryId = factory?.id;
        o.store = store && store.name ? store.name : "Chưa phân phối";
        o.storeId = store?.id;
        o.maintainer = maintainCenter?.name;
        o.maintainerId = maintainCenter?.id;
        o.state = statuses[data[i].status_id].content;
        o.stateId = data[i].status_id;
      }
      result.push(o);
    }
    return result;
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "productLine",
      key: "productLine",
      filters: getUniqueArray(
        products.map((product) => {
          return {
            text: product.productLine,
            value: product.productLineId,
          };
        })
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.productLineId === values;
      },
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
      filters: getUniqueArray(
        products.map((product) => {
          return {
            text: product.version,
            value: product.versionId,
          };
        })
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
      filters: getUniqueArray(
        products.map((product) => {
          return {
            text: product.factory,
            value: product.factoryId,
          };
        })
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.factoryId === values;
      },
    },
    {
      title: "Đại lý phân phối",
      dataIndex: "store",
      key: "store",
      filters: getUniqueArray(
        products.map((product) => {
          return {
            text: product.store,
            value: product.storeId,
          };
        })
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.storeId === values;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (state) => <Badge color="blue" text={state} />,
      filters: getUniqueArray(
        products.map((product) => {
          return {
            text: product.state,
            value: product.stateId,
          };
        })
      ),
      filterSearch: true,
      onFilter: (values, record) => {
        return record.stateId === values;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      fixed: "center",
      width: 60,
      render: (text, record) => (
        <ActionsCell
          hasEdit={false}
          hasDelete={false}
          onView={() => showModal(record)}
          hasConfirm={false}
        />
      ),
    },
  ];

  const handleSearchResults = (results) => {
    if (results) {
      setProducts(buildData([results]));
    } else {
      getProducts();
    }
  };

  return (
    <>
      <PageContent
        pageHeaderProps={{ title: "Sản phẩm", hasAction: false }}
        getSearchResults={(results) => handleSearchResults(results)}
      >
        <CustomTable columns={columns} dataSource={products} />
      </PageContent>
      {isModalOpen && (
        <ModalViewProduct
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          idProduct={idProduct}
        />
      )}
    </>
  );
}
