import { Form, Input, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import indexApi from "../../../../apis";
import { errorMessages } from "../../../../const";

export default function LineForm({ form, lineId }) {
  const [lineInfo, setLineInfo] = useState([]);
  const [colors, setAllColors] = useState([]);
  useEffect(() => {
    if (lineId) {
      getModel();
    }
  }, [lineId]);

  useEffect(() => {
    getAllColors();
  }, []);

  const getAllColors = async () => {
    const res = await indexApi.getAllColors();
    setAllColors(res.data);
  };

  const getModel = async () => {
    const res = await indexApi.getModelById(lineId);

    if (res.success) {
      setLineInfo(res.data);
    }
  };

  const invertHex = (hex) => {
    if (hex && hex.length > 0) {
      const color = hex.substr(1);
      return (
        "#" +
        (Number(`0x1${color}`) ^ 0xffffff).toString(16).substr(1).toUpperCase()
      );
    }
    return "#ffffff";
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const color = colors.find((color) => color.id === value);

    return (
      <Tag
        color={color?.code}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          color: invertHex(color?.code),
          border: "1px solid black",
        }}
        key={color?.code}
      >
        {color?.name}
      </Tag>
    );
  };
  console.log(form.getFieldsValue());
  return (
    <Form
      labelCol={{ xs: { span: 6 }, sm: { span: 4 } }}
      form={form}
      style={{ paddingTop: 24, paddingBottom: 24 }}
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
          defaultValue={lineInfo?.colors?.map((color) => {
            return color.code;
          })}
          style={{
            width: "100%",
          }}
          showSearch={false}
          dropdownRender={(menu) => (
            <>
              <div style={{ backgroundColor: "#cccccccc" }}>{menu}</div>
            </>
          )}
          options={colors.map((color, index) => {
            return {
              value: color.id,
              label: (
                <div
                  style={{ display: "inline-flex", alignItems: "center" }}
                  key={index}
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
  );
}
