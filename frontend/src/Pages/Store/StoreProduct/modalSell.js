import React, { useState, useEffect } from "react";
import { Modal, Select, Row, Col, Switch, Form } from "antd";
import { Input, Button } from "antd";
import ProductDetail from "../../ExecutiveBoard/Product/ProductDetail";
import indexApi from "../../../apis";
import styled from "styled-components";
import { newCustomer, searchCustomer, sellProduct } from "../../../apis/store";

const Option = Select.Option;
const ModalSell = (props) => {
  const [create, setCreate] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (props.idProduct) {
      getProduct(props.idProduct);
    }
    getCustomers();
  }, [props.idProduct]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
    }
  };

  const getCustomers = async () => {
    const res = await searchCustomer({ phoneNum: "" });
    if (res.success === true && res.data) {
      setCustomers(res.data);
    }
  };

  const onChange = async (value) => {
    const res = await searchCustomer({ phoneNum: value });
    if (res.success === true && res.data) {
      setCustomer(res.data[0]);
    }
  };

  const onFinish = async (values) => {
    setError("");
    const data = { ...values, product_id: props.idProduct };
    const res = await newCustomer(data);
    if (res.success === true) {
      props.handleSell();
      props.handleOk();
    } else {
      setError(res.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sellProductClick = async () => {
    if (customer && customer.id && props.idProduct) {
      const res = await sellProduct({
        customer_id: customer.id,
        product_id: props.idProduct,
      });
      if (res.success === true) {
        props.handleSell();
        props.handleOk();
      }
    }
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
            dropdownRender={(menu) => (
              <React.Fragment>
                <div onMouseDown={() => console.log("before clicked")}>
                  Danh sách người dùng
                </div>
                {menu}
              </React.Fragment>
            )}
            value={customer ? customer.phone : ""}
          >
            {customers &&
              customers.length > 0 &&
              customers.map((c, index) => {
                return (
                  <Option
                    value={c.phone}
                    style={{
                      backgroundColor: `${
                        index % 2 === 0 ? "#ececec" : "#faf9f9"
                      }`,
                    }}
                    key={index}
                  >
                    <Row>Số điện thoại: {c.phone}</Row>
                    <Row>Tên người mua: {c.name}</Row>
                  </Option>
                );
              })}
          </Select>
          {customer && customer.name && customer.email && customer.phone && (
            <Col span={24} style={{ marginLeft: 5 }}>
              <Row style={{ paddingTop: 5 }}>
                Tên người mua: {customer.name}
              </Row>
              <Row style={{ paddingTop: 5 }}>Địa chỉ: {customer.place}</Row>
              <Row style={{ paddingTop: 5 }}>Email: {customer.email}</Row>
              <Row style={{ paddingTop: 5 }}>
                Số điện thoại : {customer.phone}
              </Row>
              <Row style={{ padding: "20px 0 20px 0" }}>
                <Button type="primary" onClick={() => sellProductClick()}>
                  Tạo yêu cầu
                </Button>
              </Row>
            </Col>
          )}
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
            checked={create}
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
