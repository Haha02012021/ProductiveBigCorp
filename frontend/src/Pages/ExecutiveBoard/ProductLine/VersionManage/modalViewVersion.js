import React, { useEffect, useState } from "react";
import {
  Modal,
  Image,
  Tabs,
  Col,
  Row,
  Radio,
  ConfigProvider,
  Tooltip,
} from "antd";
import styled from "styled-components";
import TableHidenRow from "../../../../Components/Table/TableHidenRow";
import ListImage from "../../../../Components/ListImage";
import indexApi from "../../../../apis/index";

export default function ModalViewProduct(props) {
  const [version, setVersion] = useState({});
  const [colors, setColors] = useState([]);
  const [idColor, setIdColor] = useState(0);
  const onChange = () => {};

  useEffect(() => {
    if (props.idVersion) {
      getVersion(props.idVersion);
    }
  }, [props.idVersion]);

  const getVersion = async (id) => {
    const res = await indexApi.getVersionById(id);
    if (res.data) {
      setVersion(res.data);
      if (res.data.model && res.data.model.colors) {
        setColors(res.data.model.colors);
      }
    }
  };

  const buildDataVersion = (data) => {
    const arr = [];
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
  const invertHex = (hex) => {
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
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

  if (version) {
    for (let i = 0; i < listTable.length; i++) {
      if (version[listTable[i].key]) {
        listTable[i].data = buildDataVersion(version[listTable[i].key]);
        listTable[i].columns = [
          {
            title: listTable[i].title,
            dataIndex: "name",
            width: "45%",
            ellipsis: true,
            render: (address) => (
              <Tooltip placement="topLeft" title={address}>
                {address}
              </Tooltip>
            ),
          },
          {
            title: "",
            dataIndex: "value",
            height: 34,
            ellipsis: "showTitle",
            render: (address) => (
              <Tooltip placement="topLeft" title={address}>
                {address}
              </Tooltip>
            ),
          },
        ];
      }
    }
  }

  const Specification = () => {
    return (
      <>
        <Row gutter={[8, 8]} style={{ paddingBottom: 20 }}>
          <Col xs={{ span: 24 }} md={{ span: 8, offset: 0 }}>
            <Image
              width={"100%"}
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
              {version && version.name ? version.name : null}
            </Row>
            <Row
              style={{
                fontSize: "12px",
                paddingBottom: "0",
                marginBottom: "2px",
                fontStyle: "italic",
                color: "gray",
                height: 12,
              }}
            ></Row>
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
                        <Tooltip
                          title={color.name}
                          color={color.code}
                          overlayStyle={{
                            color: "#" + invertHex(color.code.substring(1)),
                          }}
                          key={index}
                        >
                          <Radio value={index} key={index}></Radio>
                        </Tooltip>
                      </ConfigProvider>
                    );
                  })}
                </Radio.Group>
              ) : (
                <></>
              )}
            </Row>
            <BoldText>Dòng sản phẩm: {version?.model?.name}</BoldText>
            <BoldText>Giá: {version?.price + " VND"}</BoldText>
          </Col>
        </Row>
        <hr />
        <Row
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <BoldText style={{ marginTop: 10 }}>Thông số kỹ thuật</BoldText>
          <Col span={24}>
            {listTable.map((table, index) => {
              return Object.keys(table.columns).length > 0 ? (
                <TableHidenRow
                  columns={table.columns}
                  data={table.data}
                  key={index}
                />
              ) : (
                <div key={index}></div>
              );
            })}
          </Col>
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
              children: (
                <ListImage
                  images={
                    version && version.model && version.model.images
                      ? version.model.images
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
