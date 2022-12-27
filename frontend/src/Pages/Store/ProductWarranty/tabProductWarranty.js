import React, { useState, useContext, useEffect } from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import { Row, Col, Select, Button } from "antd";

import ActionsCell from "../../../Components/Table/ActionsCell";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment";
import { sendWarrant } from "../../../apis/store";

import { toast } from "react-toastify";

const TabProductWarranty = (props) => {
  const [warrantyProducts, setWarrantyProducts] = useState([]);
  const { authUser } = useContext(AuthContext);
  const [warranty, setWarranty] = useState(0);
  const [warranties, setWarranties] = useState([]);
  const [onChange, setOnChange] = useState(false);

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
      width: 80,
      render: (text, record, index) => (
        <ActionsCell
          hasDelete={false}
          hasConfirm={false}
          hasEdit={false}
          onView={() => {
            props.selectProduct(record.id);
            props.showModal();
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
    getWarrantyProductsStore({
      condition: {
        isSold: 1,
        status_id: 6,
      },
    });
    console.log(warrantyProducts);
  }, [onChange]);

  const getWarrantyProductsStore = async (condition) => {
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);
      if (res.data && res.data.products) {
        setWarrantyProducts(buildData(res.data.products));
      } else {
        setWarrantyProducts([]);
      }
    } catch {
      setWarrantyProducts([]);
    }
  };

  useEffect(() => {
    getWarranties();
  }, []);

  const getWarranties = async () => {
    const res = await indexApi.getManagerByRole(3);
    if (res.data) {
      setWarranties(buildDataModel(res.data));
    } else {
      setWarranties([]);
    }
  };

  const buildDataModel = (data) => {
    const results = new Array();
    for (let i = 0; i < data.length; i++) {
      results.push({ value: data[i].id, label: data[i].name });
    }
    return results;
  };

  const onChangeWarranty = (value) => {
    setWarranty(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const sendAllProductWarranty = async () => {
    if (warranty > 0 && warrantyProducts.length > 0) {
      const idProducts = warrantyProducts.map(
        (warrantyProducts) => warrantyProducts.id
      );

      const res = await sendWarrant({
        products: idProducts,
        store_id: authUser.id,
        warranty_id: warranty,
      });

      if (res.success === true) {
        setOnChange(!onChange);
        toast.success("Gửi bảo hành thành công");
      } else {
        if (res.errors && res.errors.length > 0) {
          toast.error(res?.errors[0]?.msg);
        }
      }
    }
  };

  return (
    <div>
      <Row gutter={[8, 8]} style={{ paddingBottom: 20 }}>
        <Col sx={24} md={12}>
          <label>Cơ sở bảo hành: </label>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChangeWarranty}
            style={{
              width: "100%",
            }}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={warranties}
          />
        </Col>
        <Col
          sx={24}
          md={12}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <Button type="primary" onClick={() => sendAllProductWarranty()}>
            Gửi bảo hành
          </Button>
        </Col>
      </Row>
      <CustomTable
        dataSource={[...warrantyProducts]}
        columns={productWarrantyColumns}
      />
    </div>
  );
};

export default TabProductWarranty;
