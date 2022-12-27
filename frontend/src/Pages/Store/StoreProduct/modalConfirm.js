import React, { useEffect, useState } from "react";
import { Modal, Row } from "antd";
import ProductDetail from "../../ExecutiveBoard/Product/ProductDetail";
import indexApi from "../../../apis";

const ModalConfirm = (props) => {
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
  return (
    <Modal
      title={props.title}
      onOk={props.handleOk}
      open={props.isModalOpen}
      onCancel={props.handleCancel}
      width={880}
    >
      <hr style={{ margin: 0, color: "gray" }} />
      <Row>Thông tin sản phẩm</Row>
      <ProductDetail product={product} />
    </Modal>
  );
};

export default ModalConfirm;
