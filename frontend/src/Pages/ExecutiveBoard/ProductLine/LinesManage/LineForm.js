import {
  Form,
  Input,
  Select,
  Tag,
  Row,
  Col,
  Upload,
  Button,
  Modal,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import indexApi from "../../../../apis";
import { errorMessages } from "../../../../const";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

export default function LineForm({ form, lineId }) {
  const [colors, setAllColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

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
      form.setFieldValue("files", []);
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

  const onChange = (value) => {
    setSelectedColors(value);
    form.setFieldValue(
      "colors",
      value.map((i) => colors[i])
    );
  };

  const tagRender = (props) => {
    const { value, closable, onClose } = props;
    if (value >= 0 && value < colors.length) {
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      return (
        <Tag
          color={colors[value].code}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{
            marginRight: 3,
            color: invertHex(colors[value].code),
            border: "1px solid black",
          }}
          key={colors[value]?.code}
        >
          {colors[value].name}
        </Tag>
      );
    } else {
      return null;
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const changeSelectedColor = (file, value) => {
    const imageColors = colors;
    imageColors[value].file = file.file.originFileObj;
    setAllColors(imageColors);
    form.setFieldValue(
      "colors",
      selectedColors.map((value) => imageColors[value])
    );
  };

  const onClose = (value) => {
    setSelectedColors(selectedColors.filter((color) => color !== value));
  };

  const renderSelectImage = useMemo(() => {
    if (selectedColors.length > 0) {
      return (
        <div style={{ paddingTop: 20 }}>
          <Row>Up ảnh cho từng màu</Row>
          {selectedColors.length > 0 ? (
            [...selectedColors].map((value, index) => {
              return (
                <Row
                  style={{
                    width: "100%",
                    padding: "10px 0 10px 5px",
                    backgroundColor: "#cccccc85",
                    borderRadius: "5px",
                    marginTop: 10,
                  }}
                  key={index}
                >
                  <Col
                    span={24}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <Tag
                      color={colors[value].code}
                      closable={true}
                      onClose={() => onClose(value)}
                      style={{
                        marginRight: 3,
                        color: invertHex(colors[value].code),
                        border: "1px solid black",
                        marginBottom: 10,
                        height: 30,
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      key={colors[value]?.code}
                    >
                      {colors[value].name}
                    </Tag>
                  </Col>
                  <Col span={24}>
                    <Upload
                      listType="picture"
                      maxCount={1}
                      onChange={(file) => changeSelectedColor(file, value)}
                    >
                      <Button icon={<UploadOutlined />} style={{ width: 200 }}>
                        Upload
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              );
            })
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }, [selectedColors]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((file) => ({
        ...file,
        status: "done",
        response: undefined,
        error: undefined,
      }))
    );
    form.setFieldValue(
      "files",
      newFileList.map((file) => file.originFileObj)
    );
  };

  return (
    <Form
      labelCol={{ xs: { span: 6 }, sm: { span: 6 } }}
      form={form}
      style={{ paddingTop: 24, paddingBottom: 24, width: "100%" }}
      layout="vertical"
    >
      <Form.Item
        label="Dòng sản phẩm"
        required
        name="name"
        style={{ width: "100%" }}
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
          showSearch={false}
          onChange={onChange}
          dropdownRender={(menu) => (
            <>
              <div style={{ backgroundColor: "#cccccccc" }}>{menu}</div>
            </>
          )}
          options={colors.map((color, index) => {
            return {
              value: index,
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
        {renderSelectImage}
      </Form.Item>
      <Form.Item name="files">
        <div>
          <Row style={{ padding: "10px 0 10px 0" }}>Up ảnh cho model</Row>
          <Row>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Row>
        </div>
      </Form.Item>
    </Form>
  );
}
