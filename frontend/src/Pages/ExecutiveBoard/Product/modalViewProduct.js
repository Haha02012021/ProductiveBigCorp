import React, { useEffect, useState } from "react";
import { Modal, Image, Tabs, Col, Row, Radio, ConfigProvider } from "antd";
import styled from "styled-components";
import indexApi from "../../../apis/index";

export default function ModalViewProduct(props) {
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  const [idColor, setIdColor] = useState(0);
  const onChange = (key) => {};

  useEffect(() => {
    if (props.idProduct) {
      getProduct(props.idProduct);
    }
  }, [props.idProduct]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
      if (res.data.color) {
        setColors(res.data.model.colors);
      }
    }
  };

  const Specification = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Image
              width={270}
              src={
                colors &&
                colors.length > 0 &&
                colors[idColor] &&
                colors[idColor].Model_Color.image
                  ? colors[idColor].Model_Color.image
                  : null
              }
            />
          </Col>
          <Col span={12}>
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
              MAZDA CX-5
            </Row>
            <Row
              style={{
                fontSize: "12px",
                paddingBottom: "0",
                marginBottom: "2px",
                fontStyle: "italic",
                color: "gray",
              }}
            >
              Ma
            </Row>
            <Row>
              {colors.length > 0 ? (
                <Radio.Group
                  name="radiogroup"
                  defaultValue={idColor}
                  onChange={(e) => setIdColor(e.target.value)}
                >
                  {colors.map((color, index) => {
                    return (
                      <ConfigProvider
                        key={index}
                        theme={{
                          components: {
                            Radio: {
                              colorPrimary: `${color.code}`,
                            },
                          },
                        }}
                      >
                        <Radio value={index} key={index}></Radio>
                      </ConfigProvider>
                    );
                  })}
                </Radio.Group>
              ) : (
                <></>
              )}
            </Row>
            <BoldText>Cơ sở sản xuất:</BoldText>
            <BoldText>Đại lý phân phối:</BoldText>
            <BoldText>Trung tâm bảo hành:</BoldText>
            <BoldText>Trạng thái:</BoldText>
          </Col>
        </Row>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <BoldText style={{ marginTop: 10 }}>Thông số kỹ thuật</BoldText>
          <Row></Row>
        </Row>
      </>
    );
  };

  return (
    <>
      <Modal
        title="Thông tin chi tiết"
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        width={880}
        footer={[]}
        centered={true}
      >
        <hr style={{ margin: 0, color: "gray" }} />
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `Thông số`,
              key: "1",
              children: <Specification />,
            },
            {
              label: `Hình ảnh`,
              key: "2",
              children: <>Lich su</>,
            },
          ]}
        />
      </Modal>
    </>
  );
}

const BoldText = styled(Row)`
  font-weight: bold;
`;
