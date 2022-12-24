import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Tabs } from "antd";
import { Image } from "antd";
import sample from "../../../assets/cx-5-mau.jpg";
import { Col, Row } from "antd";
import { Radio, ConfigProvider } from "antd";
import styled from "styled-components";
import TableHidenRow from "../../../Components/Table/TableHidenRow";
import ListImage from "../../../Components/ListImage";
import indexApi from "../../../apis/index";

export default function ModalViewProduct(props) {
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  const [idColor, setIdColor] = useState(0);
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    if (props.isModalOpen === true && props.idProduct) {
      getProduct(props.idProduct);
    }
  }, [props.isModalOpen]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
      if (res.data.color) {
        setColors(res.data.model.colors);
      }
    }
  };

  const buildDataVersion = (data) => {
    const arr = new Array();
    if (Object.keys(data).length < 4) return [];
    for (let i = 2; i < Object.keys(data).length - 2; i++) {
      const o = {};
      o["value"] = data[Object.keys(data)[i]];
      o["name"] = Object.keys(data)[i];
      o["key"] = i - 1;
      arr.push(o);
    }
    return arr;
  };

  const listTable = [
    {
      key: "chasis",
      title: "Khung gầm",
      data: {},
      columns: {},
    },
    {
      key: "engine",
      title: "Động cơ hộp số",
      data: {},
      columns: {},
    },
    {
      key: "exterior",
      title: "Ngoại thất",
      data: {},

      columns: {},
    },
    {
      key: "interior",
      title: "NỘI THẤT",
      data: {},

      columns: {},
    },
    {
      key: "i_activesense",
      title: "I-ACTIVSENSE",
      data: {},

      columns: {},
    },
    {
      key: "safety",
      title: "An toàn",
      data: {},

      columns: {},
    },
    {
      key: "size",
      title: "Kích thước khối lượng",
      data: {},
      columns: {},
    },
  ];

  if (product && product.version) {
    console.log(product.version);
    for (let i = 0; i < listTable.length; i++) {
      if (product.version[listTable[i].key]) {
        listTable[i].data = buildDataVersion(product.version[listTable[i].key]);
        listTable[i].columns = [
          {
            title: listTable[i].title,
            dataIndex: "name",
            width: "40%",
          },
          {
            title: "",
            dataIndex: "value",
            height: 34,
          },
        ];
      }
    }
  }

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
                        <Radio value={index}></Radio>
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
          <Row>
            {listTable.map((table, index) => {
              console.log(table);
              return Object.keys(table.columns).length > 0 ? (
                <TableHidenRow
                  columns={table.columns}
                  data={table.data}
                  key={index}
                />
              ) : (
                <></>
              );
            })}
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
