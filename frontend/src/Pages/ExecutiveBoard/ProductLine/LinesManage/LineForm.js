import { Form, Input, Select, Spin, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import indexApi from "../../../../apis";
import invertColor from "../../../../utils/invertColor";
import { errorMessages } from "../../../../const";

export default function LineForm({ form, lineId }) {
  const [initialValues, setInitialValues] = useState(lineId ? null : {});
  const [colors, setAllColors] = useState([]);
  useEffect(() => {
    if (lineId) {
      getModel();
    }
  }, [lineId]);

  useEffect(() => {
    getAllColors();

    return () => {
      form.resetFields();
    };
  }, []);

  const getAllColors = async () => {
    const res = await indexApi.getAllColors();
    setAllColors(res.data);
  };

  const getModel = async () => {
    const res = await indexApi.getModelById(lineId);

    if (res.success) {
      const dataColors = res.data.colors.map((color) => color.id);
      form.setFieldValue("name", res.data.name);
      form.setFieldValue("colors", dataColors);
      setInitialValues({
        name: res.data.name,
        colors: dataColors,
      });
    }
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    if (value) {
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
      const color = colors.find((color) => color.id === value);
      return (
        <Tag
          key={color.id}
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
      );
    }
  };
  return (
    <Spin spinning={lineId && !initialValues}>
      {initialValues && (
        <Form
          labelCol={{ xs: { span: 6 }, sm: { span: 4 } }}
          form={form}
          style={{ paddingTop: 24, paddingBottom: 24 }}
          // initialValues={initialValues}
        >
          <Form.Item
            label="Dòng sản phẩm"
            required
            name="name"
            rules={[
              { required: true, message: errorMessages.lineForm.name },
              {
                type: "string",
                max: 40,
                message: errorMessages.lineForm.nameLength,
              },
            ]}
          >
            <Input placeholder="Nhập dòng sản phẩm mới" />
          </Form.Item>
          <Form.Item
            label="Màu"
            required
            name="colors"
            rules={[{ required: true, message: errorMessages.lineForm.colors }]}
          >
            <Select
              placeholder="Chọn màu"
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{
                width: "100%",
              }}
              showSearch={false}
              options={colors.map((color) => {
                return {
                  value: color.id,
                  label: (
                    <div
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
                };
              })}
            />
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
}
