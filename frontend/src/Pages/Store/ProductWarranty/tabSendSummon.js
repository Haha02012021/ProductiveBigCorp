import React, { useState, useContext, useEffect } from "react";
import ActionsCell from "../../../Components/Table/ActionsCell";
import CustomTable from "../../../Components/Table/CustomTable";
import indexApi from "../../../apis";
import { AuthContext } from "../../../Provider/AuthProvider";
import moment from "moment";
import { sendWarrant } from "../../../apis/store";
import { toast } from "react-toastify";
import { Row, Col, Select, Button } from "antd";
const TabSendSummon = (props) => {
  const [summonProducts, setSummonProducts] = useState([]);
  const { authUser } = useContext(AuthContext);
  const [change, setChange] = useState(false);
  const [warranties, setWarranties] = useState([]);
  const [warranty, setWarranty] = useState(0);

  const summonProductColumns = [
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
          hasDelete={false}
          hasEdit={false}
          hasConfirm={false}
          onView={() => {
            props.selectProduct(record.id);
            props.showModal();
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    getSummonProducts({
      condition: {
        status_id: 16,
      },
    });
  }, [change]);

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

  const getSummonProducts = async (condition) => {
    try {
      const res = await indexApi.getProductsByManagerId(authUser.id, condition);
      if (res.data && res.data.products) {
        setSummonProducts(buildData(res.data.products));
      } else {
        setSummonProducts([]);
      }
    } catch (error) {
      setSummonProducts([]);
    }
  };

  const onChangeWarranty = (value) => {
    setWarranty(value);
  };

  const sendAllProductWarranty = async () => {
    if (warranty > 0 && summonProducts.length > 0) {
      const idProducts = summonProducts.map(
        (summonProduct) => summonProduct.id
      );

      const res = await sendWarrant({
        products: idProducts,
        store_id: authUser.id,
        warranty_id: warranty,
      });

      if (res.success === true) {
        setChange(!change);
        toast.success("Gửi các sản phẩm triệu hồi thành công!");
      } else {
        if (res.errors && res.errors.length > 0) {
          toast.error(res?.errors[0]?.msg);
        }
      }
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

  return (
    <div>
      <Row gutter={[8, 8]} style={{ paddingBottom: 20 }}>
        <Col sx={24} md={12}>
          <label>Cơ sở bảo hành: </label>
          <Select
            showSearch
            placeholder="Select a person"
            onChange={onChangeWarranty}
            style={{
              width: "100%",
            }}
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
        dataSource={[...summonProducts]}
        columns={summonProductColumns}
      />
    </div>
  );
};

export default TabSendSummon;
