import React, { useState, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";

import ActionsCell from "../../../Components/Table/ActionsCell";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment";
import ModalConfirm from "../StoreProduct/modalConfirm";

import { toast } from "react-toastify";
import { sendBackCustomer } from "../../../apis/store";

const TabProductMantained = (props) => {
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
      title: "Ngày yêu cầu",
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
      render: (text, record, index) => (
        <ActionsCell
          hasDelete={false}
          hasEdit={false}
          onView={() => {
            props.selectProduct(record.id);
            props.showModal();
          }}
          onConfirm={() => {
            setIdProduct(record.id);
            setIsModalConfirm(true);
          }}
        />
      ),
    },
  ];

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

  useEffect(() => {
    getMaintainedProductsStore({
      condition: {
        isSold: 2,
        status_id: 11,
      },
    });
  }, [onChange]);

  const getMaintainedProductsStore = async (condition) => {
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);
      if (res.data && res.data.products) {
        setMaintainedProducts(buildData(res.data.products));
      }
    } catch {
      setMaintainedProducts([]);
    }
  };

  const acceptProduct = async () => {
    const res = await sendBackCustomer(idProduct, authUser.id);
    if (res.success === true) {
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

export default TabProductMantained;
