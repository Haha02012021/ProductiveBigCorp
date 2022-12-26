import React, { useState, useEffect } from "react";
import { Modal, Select, Row, Col, Switch } from "antd";
import { Input, Button } from "antd";
import ProductDetail from "../../ExecutiveBoard/Product/ProductDetail";
import indexApi from "../../../apis";

const ModalSell = (props) => {
  const [create, setCreate] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (props.idProduct) {
      getProduct(props.idProduct);
    }
  }, [props.idProduct]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
    }
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const CreateUser = () => {
    return (
      <Col span={24} style={{ marginLeft: 10 }}>
        <Row>
          <label>Tên: </label>
          <Input placeholder="Basic usage" />
        </Row>
        <Row>
          <label>Địa chỉ: </label>
          <Input placeholder="Basic usage" />
        </Row>
        <Row>
          <label>Email: </label>
          <Input placeholder="Basic usage" />
        </Row>
        <Row>
          <label>Sdt: </label>
          <Input placeholder="Basic usage" />
        </Row>
      </Col>
    );
  };

  const SearchUser = () => {
    return (
      <Col span={24}>
        <Row style={{ display: "flex", alignItems: "center" }} span={12}>
          <label>Tìm kiếm người dùng: </label>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "100%" }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </Row>
      </Col>
    );
  };
  return (
    <Modal
      title="Tạo thông tin người mua"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={880}
      footer={[]}
      centered={true}
    >
      <hr style={{ margin: 0, color: "gray" }} />
      <Row>Thông tin sản phẩm</Row>
      <ProductDetail product={product} />
      <Row span={24} style={{ paddingTop: 20 }} gutter={[8, 8]}>
        <Col span={24}>
          <label>Tạo người mua mới: </label>
          <Switch
            checkedChildren="YES"
            unCheckedChildren="NO"
            defaultChecked
            onChange={() => setCreate(!create)}
          />
        </Col>
        {create ? <CreateUser /> : <SearchUser />}
      </Row>

      <Row style={{ paddingTop: 20 }}>
        <Button type="primary">Tạo yêu cầu</Button>
      </Row>
    </Modal>
  );
};

export default ModalSell;
