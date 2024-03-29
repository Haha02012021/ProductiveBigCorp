import React, { useState, useEffect, useContext } from "react";
import { Modal, Row, Col, Button, Form } from "antd";
import { Input } from "antd";
import styled from "styled-components";
import indexApi from "../../../apis/index";
import { AuthContext } from "../../../Provider/AuthProvider";
import { sendWarrantService } from "../../../apis/store";
import { toast } from "react-toastify";

const { TextArea } = Input;

const ModelSendWarranty = (props) => {
  const [product, setProduct] = useState({});
  const { authUser } = useContext(AuthContext);
  const [errContent, setErrorContent] = useState("");

  useEffect(() => {
    if (props.idProductWarranty) {
      getProduct(props.idProductWarranty);
    }
  }, [props.idProductWarranty]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
    }
  };

  const sendWarrant = async () => {
    if (props.idProductWarranty > 0 && errContent.length > 0) {
      const res = await sendWarrantService({
        product_id: props.idProductWarranty,
        store_id: authUser.id,
        content: errContent,
      });
      if (res.success === true) {
        toast.success(res.data);
        props.handleOk();
      } else {
        toast.error(res.data);
      }
    }
  };

  return (
    <Modal
      title="Yêu cầu bảo hành"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={880}
      footer={[]}
      centered={true}
    >
      <hr style={{ margin: 0, color: "gray" }} />
      <Col span={24} style={{ paddingTop: 20 }}>
        <BoldText style={{ textTransform: "uppercase" }}>
          Thông tin Sản phẩm
        </BoldText>
        <Row style={{ marginLeft: 5 }}>
          <Col
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "14px",
              paddingBottom: "0",
              marginBottom: "0px",
            }}
            span={24}
          >
            {product?.version?.name}
          </Col>
          <Col
            style={{
              fontSize: "12px",
              paddingBottom: "0",
              marginBottom: "2px",
              fontStyle: "italic",
              color: "gray",
              textTransform: "capitalize",
            }}
            span={24}
          >
            {product?.model?.name}
          </Col>

          <Col span={24}>
            <Row>
              <BoldText>Cơ sở sản xuất: </BoldText>
              <DesText>
                {" " + product &&
                product.managers &&
                product.managers.length > 0
                  ? product?.managers[0]?.name
                  : null}
              </DesText>
            </Row>
          </Col>

          <Row>
            <BoldText>Mã UUID:</BoldText>
            <DesText>{" " + product?.uuid}</DesText>
          </Row>

          <Col span={24}>
            <Row>
              <BoldText>Thời gian bảo hành:</BoldText>
              <DesText>{" " + product?.maintain_month + " Tháng"}</DesText>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <BoldText>Trạng thái: </BoldText>
              <DesText>{" " + product?.status?.context}</DesText>
            </Row>
          </Col>
        </Row>
      </Col>
      <Row gutter={[8, 8]} style={{ paddingTop: 20 }}>
        <BoldText style={{ textTransform: "uppercase" }}>
          Thông tin chi tiết bảo hành
        </BoldText>

        <Form layout="vertical" autoComplete="off" style={{ width: "100%" }}>
          <Col span={24}>
            <Form.Item
              label={"Mô tả lỗi: "}
              required
              name="reason"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Không được bỏ trống" },
                {
                  type: "string",
                  min: 1,
                  message: "Giá trị không phù hợp",
                },
              ]}
            >
              <TextArea
                autoSize={{
                  minRows: 4,
                  maxRows: 6,
                }}
                style={{ width: "100%" }}
                placeholder="Mô tả lỗi bạn gặp phải tại đây"
                onChange={(e) => setErrorContent(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Row style={{ paddingTop: 20 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => sendWarrant()}
              >
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Row>
    </Modal>
  );
};

export default ModelSendWarranty;
const BoldText = styled(Row)`
  font-weight: bold;
`;

const DesText = styled(Row)`
  text-transform: capitalize;
  padding-left: 5px;
`;
