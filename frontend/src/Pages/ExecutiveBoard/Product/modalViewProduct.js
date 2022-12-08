import React from "react";
import { Modal } from "antd";
import { Tabs } from "antd";
import { Image } from "antd";
import sample from "../../../assets/cx-5-mau.jpg";
import { Col, Row } from "antd";
import { Radio, ConfigProvider } from "antd";
import styled from "styled-components";
import TableHidenRow from "../../../Components/Table/TableHidenRow";
import ListImage from "../../../Components/ListImage";

export default function ModalViewProduct(props) {
  const onChange = (key) => {
    console.log(key);
  };

  const columnsSize = [
    {
      title: "Kích thước khối lượng",
      dataIndex: "name",
      width: "40%",
    },
    {
      title: "",
      dataIndex: "value",
      height: 34,
    },
  ];
  const columnsEngine = [
    {
      title: "Động cơ hộp số",
      dataIndex: "name",
      width: "40%",
    },
    {
      title: "",
      dataIndex: "value",
      height: 34,
    },
  ];

  const data = [
    {
      key: "1",
      name: "Kích thước tổng thể",
      value: "￥300,000.00",
    },
    {
      key: "2",
      name: "Chiều dài cơ sở",
      value: "￥1,256,000.00",
    },
    {
      key: "3",
      name: "Bán kính quay vòng tối thiểu",
      value: "￥120,000.00",
    },
    {
      key: "3",
      name: "Khoảng sáng gầm xe",
      value: "￥120,000.00",
    },
  ];

  const colors = [
    { name: "red", code: "#cf1322" },
    { name: "black", code: "#000000" },
    { name: "green", code: "#008000" },
    { name: "blue", code: "#1677ff" },
  ];

  const Specification = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Image width={270} src={sample} />
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
              <Radio.Group name="radiogroup" defaultValue={colors[0].code}>
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
                      <Radio value={color.code}></Radio>
                    </ConfigProvider>
                  );
                })}
              </Radio.Group>
            </Row>
            <BoldText>Cơ sở sản xuất:</BoldText>
            <BoldText>Đại lý phân phối:</BoldText>
            <BoldText>Trung tâm bảo hành:</BoldText>
            <BoldText>Trạng thái:</BoldText>
          </Col>
        </Row>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <BoldText style={{ marginTop: 10 }}>Thông số kỹ thuật</BoldText>
          <Row>
            <TableHidenRow columns={columnsSize} data={data} />
            <TableHidenRow columns={columnsEngine} data={data} />
          </Row>
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
        width={600}
        footer={[]}
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
              children: <ListImage />,
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
