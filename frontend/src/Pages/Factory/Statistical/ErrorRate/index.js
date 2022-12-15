import FactoryLayout from "../../../../Layouts/FactoryLayout";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import PieChart from "../../../../Components/Chart/PieChart";
import { G2 } from "@ant-design/plots";

const factoryData = [
  {
    type: "Sản phẩm lỗi",
    value: 500,
  },
  {
    type: "Sản phẩm tốt",
    value: 400,
  },
];

const storeData = [
  {
    type: "Sản phẩm lỗi",
    value: 600,
  },
  {
    type: "Sản phẩm tốt",
    value: 400,
  },
];

export default function ErrorRate() {
  const [searchValue, setSearchValue] = useState("");
  const [factory, setFactory] = useState();
  const [store, setStore] = useState();
  const G = G2.getEngine("canvas");

  const factoryConfig = useMemo(() => {
    return {
      appendPadding: 48,
      data: factory?.factoryData,
      angleField: "value",
      colorField: "type",
      radius: 0.75,
      legend: false,
      label: {
        type: "spider",
        labelHeight: 40,
        formatter: (data, mappingData) => {
          const group = new G.Group({});
          group.addShape({
            type: "circle",
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              r: 5,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 10,
              y: 8,
              text: `${data.type}`,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 0,
              y: 25,
              text: ` ${Math.round(data.percent * 100)}%`,
              fill: "rgba(0, 0, 0, 0.65)",
              fontWeight: 700,
            },
          });
          return group;
        },
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
    };
  }, [factory]);
  const storeConfig = useMemo(() => {
    return {
      appendPadding: 48,
      data: store?.storeData,
      angleField: "value",
      colorField: "type",
      radius: 0.75,
      legend: false,
      label: {
        type: "spider",
        labelHeight: 40,
        formatter: (data, mappingData) => {
          const group = new G.Group({});
          group.addShape({
            type: "circle",
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              r: 5,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 10,
              y: 8,
              text: `${data.type}`,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 0,
              y: 25,
              text: ` ${Math.round(data.percent * 100)}%`,
              fill: "rgba(0, 0, 0, 0.65)",
              fontWeight: 700,
            },
          });
          return group;
        },
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
    };
  }, [store]);

  useEffect(() => {
    setFactory(null);
    setStore(null);
  }, [searchValue]);

  const handleSearch = (values) => {
    setSearchValue(values.productLine);
  };

  const handleChooseFactory = (factory) => {
    console.log(factory);
    setFactory({ factory, factoryData });
  };

  const handleChooseStore = (store) => {
    console.log(store);
    setStore({ store, storeData });
  };
  return (
    <FactoryLayout
      pageHeaderProps={{
        title: "Tỉ lệ sản phẩm lỗi",
        customAction: (
          <Form layout="inline" onFinish={handleSearch}>
            <Form.Item
              name="productLine"
              label="Dòng sản phẩm"
              style={{ marginRight: 0 }}
            >
              <Input placeholder="Nhập dòng sản phẩm" />
            </Form.Item>
            <Button
              htmlType="submit"
              icon={<SearchOutlined />}
              type="primary"
            />
          </Form>
        ),
      }}
    >
      <Row gutter={[24]}>
        <Col span={12}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Select
              disabled={!searchValue}
              placeholder="Chọn cơ sở sản xuất"
              onChange={handleChooseFactory}
              value={factory?.factory}
            >
              <Select.Option value="factory1">Cơ sở 1</Select.Option>
            </Select>
            {factory && (
              <PieChart
                config={factoryConfig}
                title={`Biểu đồ biểu diễn tỉ lệ sản phẩm lỗi trong dòng ${searchValue} của cơ sở sản xuất ${factory.factory}`}
              />
            )}
          </Space>
        </Col>
        <Col span={12}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Select
              disabled={!searchValue}
              placeholder="Chọn đại lý phân phối"
              onChange={handleChooseStore}
              value={store?.store}
            >
              <Select.Option value="store1">Đại lý 1</Select.Option>
            </Select>
            {store && (
              <PieChart
                config={storeConfig}
                title={`Biểu đồ biểu diễn tỉ lệ sản phẩm lỗi trong dòng ${searchValue} của đại lý ${store.store}`}
              />
            )}
          </Space>
        </Col>
      </Row>
    </FactoryLayout>
  );
}
