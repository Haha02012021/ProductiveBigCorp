import React, { useState, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";

import ActionsCell from "../../../Components/Table/ActionsCell";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment";
import ModalConfirm from "../StoreProduct/modalConfirm";
import { warrantyReceive } from "../../../apis/store";

import { toast } from "react-toastify";

const TabProductMoving = (props) => {
  const [maintainedProducts, setMaintainedProducts] = useState([]);
  const { authUser } = useContext(AuthContext);
  const [onChange, setOnChange] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idProduct, setIdProduct] = useState(0);
  const productWarrantyColumns = [
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
    },
    {
      title: "Lỗi cần xử lý",
      dataIndex: "error",
      key: "error",
      width: 150,
    },
    {
      title: "Ngày xuất",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 150,
    },
    {
      title: "Cơ sở bảo hành",
      dataIndex: "factory",
      key: "factory",
      width: 150,
    },
    {
      title: "Trạng thái bảo hành",
      dataIndex: "status",
      key: "status",
      width: 170,
      align: "center",
    },

    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <ActionsCell
          hasDelete={false}
          hasEdit={false}
          onConfirm={() => {
            setIdProduct(record.id);
            setIsModalConfirm(true);
          }}
          onView={() => {
            props.selectProduct(record.id);
            props.showModal();
          }}
        />
      ),
    },
  ];

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

  useEffect(() => {
    getMovingProductsStore();
  }, [onChange]);

  const getMovingProductsStore = async () => {
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, {
        condition: {
          isSold: 2,
          status_id: 10,
        },
      });
      const res2 = await indexApi.getProductsByManagerId(authUser.id, {
        condition: {
          isSold: 0,
          status_id: 10,
        },
      });
      let productData = [];
      if (res.data && res.data.products) {
        productData = [...buildData(res.data.products)];
      }
      if (res2.data && res2.data.products) {
        productData = [...productData, ...buildData(res2.data.products)];
      }
      setMaintainedProducts(productData);
    } catch {
      setMaintainedProducts([]);
    }
  };

  const acceptProduct = async () => {
    const res = await warrantyReceive({
      products: [idProduct],
      store_id: authUser.id,
    });
    if (res.success === true) {
      if (maintainedProducts.length === 1) {
        props.setTab();
      }
      setIsModalConfirm(false);
      setOnChange(!onChange);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <CustomTable
        dataSource={[...maintainedProducts]}
        columns={productWarrantyColumns}
      />
      {isModalConfirm && (
        <ModalConfirm
          title="Xác nhận đã nhận được sản phẩm"
          isModalOpen={isModalConfirm}
          handleOk={() => {
            acceptProduct();
          }}
          handleCancel={() => setIsModalConfirm(false)}
          idProduct={idProduct}
        />
      )}
    </div>
  );
};

export default TabProductMoving;
