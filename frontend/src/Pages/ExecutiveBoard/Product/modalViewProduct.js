import React, { useEffect, useState } from "react";
import { Modal, Image, Tabs, Col, Row, Radio, ConfigProvider } from "antd";
import styled from "styled-components";
import indexApi from "../../../apis/index";
import ListImage from "../../../Components/ListImage";
import CustomTable from "../../../Components/Table/CustomTable";
import { historyColumns } from "../../../const/tableProduct";
import moment from "moment";

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
      if (res.data.model.colors) {
        setColors(
          res.data.model.colors.filter(
            (color) => color.id === res.data.color.id
          )
        );
        setIdColor(res.data.color.id);
      }
    }
  };

  console.log(product);

  const Specification = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Image width={270} src={colors[0]?.Model_Color?.image} />
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
                {" " + product &&
                product.managers &&
                product.managers.length > 0
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
          </Col>
        </Row>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <BoldText style={{ marginTop: 10, fontSize: 16 }}>
            Lịch sử sản phẩm
          </BoldText>
          <CustomTable
            columns={historyColumns}
            dataSource={buildDataHistory(product?.histories)}
            footer={[]}
            style={{ cursor: "pointer" }}
            showPagination={false}
          ></CustomTable>
        </Row>
      </>
    );
  };

  const buildDataHistory = (data) => {
    if (data && data.length > 0) {
      const result = new Array();
      for (let i = 0; i < data.length; i++) {
        const o = {};
        o.key = i + 1;
        o.status = data[i]?.status?.context;
        o.content = data[i].content;
        o.manage = data[i]?.manager?.name;
        o.time = moment(new Date(data[i]?.createdAt))
          .subtract(1, "hours")
          .calendar();
        result.push(o);
      }
      return result;
    }
    return [];
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
              children: (
                <ListImage
                  images={
                    product && product.model && product.model.images
                      ? product.model.images
                      : []
                  }
                />
              ),
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

const DesText = styled(Row)`
  text-transform: capitalize;
  padding-left: 5px;
`;
