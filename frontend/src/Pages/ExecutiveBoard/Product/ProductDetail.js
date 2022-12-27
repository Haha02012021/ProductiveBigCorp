import React, { useState, useEffect } from "react";
import { Image, Col, Row, Radio, ConfigProvider } from "antd";
import styled from "styled-components";

const ProductDetail = ({ product = {}, isProduct = true }) => {
  const [colors, setColors] = useState([]);
  const [idColor, setIdColor] = useState(0);

  useEffect(() => {
    if (product) {
      getColors();
    }
  }, [product]);

  const getColors = async () => {
    if (product && product.model && product.model.colors) {
      if (isProduct === true) {
        setColors(
          product.model.colors.filter((color) => color.id === product.color.id)
        );
        if (product.color && product.color.id) {
          setIdColor(product.color.id);
        }
      } else {
        setColors(product.model.colors);
      }
    }
  };

  return (
    <>
      <Row gutter={[8, 8]} style={{ paddingBottom: 20 }}>
        <Col xs={{ span: 24 }} md={{ span: 8, offset: 0 }}>
          <Image width={"100%"} src={colors[0]?.Model_Color?.image} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8, offset: 4 }}>
          <Row
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "14px",
              paddingBottom: "0",
              marginBottom: "0px",
              height: "17px",
            }}
          >
            {product?.version?.name}
          </Row>
          <Row
            style={{
              fontSize: "12px",
              paddingBottom: "0",
              marginBottom: "2px",
              fontStyle: "italic",
              color: "gray",
              textTransform: "capitalize",
            }}
          >
            {product?.model?.name}
          </Row>
          <Row>
            {colors.length > 0 ? (
              <Radio.Group
                name="radiogroup"
                defaultValue={idColor}
                onChange={(e) => setIdColor(e.target.value)}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Radio: {
                        colorPrimary: `${colors[0].code}`,
                      },
                    },
                  }}
                >
                  <Radio value={idColor}></Radio>
                </ConfigProvider>
                ;
              </Radio.Group>
            ) : (
              <></>
            )}
          </Row>

          <Row>
            <BoldText>Cơ sở sản xuất: </BoldText>
            <DesText>
              {" " + product && product.managers && product.managers.length > 0
                ? product?.managers[0]?.name
                : null}
            </DesText>
          </Row>

          <Row>
            <BoldText>Mã UUID:</BoldText>
            <DesText>{" " + product?.uuid}</DesText>
          </Row>

          <Row>
            <BoldText>Thời gian bảo hành:</BoldText>
            <DesText>{" " + product?.maintain_month + " Tháng"}</DesText>
          </Row>
          <Row>
            <BoldText>Trạng thái: </BoldText>
            <DesText>{" " + product?.status?.context}</DesText>
          </Row>
          {product?.customer?.name && (
            <>
              <Row>
                <BoldText>Tên người mua: </BoldText>
                <DesText>{" " + product?.customer?.name}</DesText>
              </Row>
              <Row>
                <BoldText>Số điện thoại: </BoldText>
                <DesText>{" " + product?.customer?.phone}</DesText>
              </Row>
              <Row>
                <BoldText>Email: </BoldText>
                <DesText>{" " + product?.customer?.email}</DesText>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;

const BoldText = styled(Row)`
  font-weight: bold;
`;

const DesText = styled(Row)`
  text-transform: capitalize;
  padding-left: 5px;
`;
