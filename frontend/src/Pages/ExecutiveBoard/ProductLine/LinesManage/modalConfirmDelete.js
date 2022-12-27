import React from "react";
import { Modal, Row } from "antd";

const ModalConfirm = (props) => {
  return (
    <Modal
      title={props.title}
      onOk={props.onOk}
      open={props.open}
      onCancel={props.onCancel}
      width={880}
    >
      <hr style={{ margin: 0, color: "gray" }} />
      <Row>Bạn muốn xóa {props.type + ": " + props.name}</Row>
    </Modal>
  );
};

export default ModalConfirm;
