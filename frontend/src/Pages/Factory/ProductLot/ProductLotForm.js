import { Col, Form, InputNumber, Row, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import indexApi from "../../../apis";
import invertColor from "../../../utils/invertColor";

export default function ProductLotForm({ form, batchId }) {
  const [allModels, setAllModels] = useState([]);
  const [colors, setColors] = useState();
  const [versions, setVersions] = useState();
  const [selectedModelId, setSelectedModelId] = useState();
  const [optionsSelected, setOptionsSelected] = useState([]);

  useEffect(() => {
    if (batchId) {
      getBatchById();
    }
  }, [batchId]);

  useEffect(() => {
    getAllModels();

    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (selectedModelId) {
      getColorsVersionsByModel();
    }
  }, [selectedModelId]);

  const getBatchById = async () => {
    const res = await getBatchById(batchId);
  };

  const getAllModels = async () => {
    const res = await indexApi.getAllModels();

    if (res.success) {
      setAllModels(res.data);
    }
  };

  const getColorsVersionsByModel = async () => {
    const res = await indexApi.getModelById(selectedModelId);
    console.log(res);
    if (res.success) {
      setColors(res.data.colors);
      setVersions(res.data.versions);
    }
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const color = colors?.find((color) => color?.id === value);
    return (
      color && (
        <Tag
          color={color.code}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{
            marginRight: 3,
            color: invertColor(color.code, true),
          }}
        >
          {color.name}
        </Tag>
      )
    );
  };

  return (
    <Form
      labelCol={{ md: { span: 6 } }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      form={form}
    >
      <Form.Item label="Dòng sản phẩm" required name="model_id">
        <Select
          placeholder="Chọn dòng sản phẩm"
          options={allModels.map((model) => {
            return {
              value: model.id,
              label: model.name,
            };
          })}
          onChange={(option) => setSelectedModelId(option)}
        />
      </Form.Item>
      <Form.Item label="Phiên bản" required name="version_id">
        <Select
          placeholder="Chọn phiên bản"
          style={{ width: "100%" }}
          options={versions?.map((version) => {
            return {
              value: version.id,
              label: version.name,
            };
          })}
        ></Select>
      </Form.Item>
      <Row gutter={[24]}>
        <Col span={13}>
          <Form.Item
            labelCol={{ span: 11 }}
            label="Màu"
            required
            name="color_id"
          >
            <Select
              mode="multiple"
              placeholder="Chọn màu"
              showArrow
              tagRender={tagRender}
              defaultValue={[]}
              style={{
                width: "100%",
              }}
              showSearch={false}
              onChange={(options) => setOptionsSelected(options)}
              options={colors?.map((color) => {
                return {
                  key: color.id,
                  value: color.id,
                  label: (
                    <div
                      key={color.id}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          backgroundColor: color.code,
                          height: 16,
                          width: 16,
                        }}
                      ></div>
                      <p style={{ paddingLeft: 8 }}>{color.name}</p>
                    </div>
                  ),
                  disabled:
                    optionsSelected.length >= 1
                      ? optionsSelected.includes(color.id)
                        ? false
                        : true
                      : false,
                };
              })}
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            labelCol={{ span: 8 }}
            label="Số lượng"
            required
            name="amount"
          >
            <InputNumber
              placeholder="Nhập số lượng"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
