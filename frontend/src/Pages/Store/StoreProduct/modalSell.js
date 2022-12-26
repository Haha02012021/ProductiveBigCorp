import React, { useState, useEffect } from "react";
import { Modal, Select, Row, Col, Switch, Form } from "antd";
import { Input, Button } from "antd";
import ProductDetail from "../../ExecutiveBoard/Product/ProductDetail";
import indexApi from "../../../apis";
import styled from "styled-components";
import { newCustomer } from "../../../apis/store";
const ModalSell = (props) => {
  const [create, setCreate] = useState(true);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

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

  const onFinish = async (values) => {
    setError("");
    const data = { ...values, product_id: props.idProduct };
    console.log(data);
    const res = await newCustomer(data);
    if (res.success === true) {
      props.handleOk();
    } else {
      setError(res.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const CreateUser = () => {
    return (
      <Col span={24} style={{ marginLeft: 10 }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Row>
            <LabelInput>Tên người mua: </LabelInput>
            <Form.Item
              style={{ width: "100%", margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập đầy đủ họ tên" />
            </Form.Item>
          </Row>

          <Row>
            <LabelInput>Địa chỉ: </LabelInput>
            <Form.Item
              style={{ width: "100%", margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please input your address",
                },
              ]}
              name="place"
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Row>
          <Row>
            <LabelInput>Email: </LabelInput>
            <Form.Item
              style={{ width: "100%", margin: 0 }}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
              name="email"
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Row>

          <Row>
            <LabelInput>Sdt: </LabelInput>
            <Form.Item
              style={{ width: "100%", margin: 0 }}
              rules={[
                {
                  required: true,
                  message: "Please input your phoneNumber",
                },
              ]}
              name="phone"
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Row>
          <ErrorMessage>{error}</ErrorMessage>
          <Form.Item>
            <Row style={{ padding: "20px 0 20px 0" }}>
              <Button type="primary" htmlType="submit">
                Tạo yêu cầu
              </Button>
            </Row>
          </Form.Item>
        </Form>
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
            placeholder="Nhập số điện thoại để tìm kiếm người dùng"
            onChange={onChange}
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
    </Modal>
  );
};

export default ModalSell;

const LabelInput = styled(Row)`
  font-weight: 450;
  padding-top: 5px;
`;

const ErrorMessage = styled(Row)`
  padding-top: 5px;
  color: red;
`;
