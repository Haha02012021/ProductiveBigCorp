import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Col, ConfigProvider, Form, InputNumber, Modal, Radio, Row, Select} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import indexApi from "../../../apis";
import {sendRequest} from "../../../apis/store";
import {AuthContext} from "../../../Provider/AuthProvider";
import {toast} from "react-toastify";

const ModalRequest = (props) => {
  const [versions, setVersions] = useState([]);
  const [models, setModels] = useState([]);
  const [idModel, setIdModel] = useState(0);
  const [idVersion, setIdVersion] = useState(0);
  const [mount, setMount] = useState(1);
  const [idColor, setIdColor] = useState(0);
  const [colors, setColors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [factories, setFactories] = useState([]);
  const [idFactory, setIdFactory] = useState(0);
  const [changeRequest, setChangeRequest] = useState(false);
  const { authUser } = useContext(AuthContext);

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeModel = (value) => {
    setIdModel(value);
    setVersions(null);
    setIdVersion(0);
  };

  const onChangeVersion = (value) => {
    setIdVersion(value);
  };

  const onChangeFactory = (value) => {
    setIdFactory(value);
  };

  const onChangeMount = (value) => {
    setMount(value);
  };

  const addRequest = () => {
    if (idModel !== 0 && idVersion !== 0) {
      const data = requests;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].model_id === idModel &&
          data[i].version_id === idVersion &&
          data[i].color_id === idColor &&
          data[i].factory_id === idFactory
        ) {
          data[i].amount += mount;
          setRequests(data);
          setChangeRequest(!changeRequest);
          return;
        }
      }
      data.push({
        model_id: idModel,
        version_id: idVersion,
        color_id: idColor,
        amount: mount,
        factory_id: idFactory,
        store_id: authUser.id,
      });
      setRequests(data);
      setChangeRequest(!changeRequest);
    }
  };

  const deleteRequest = (i) => {
    let data = requests;
    data = data.filter((request, index) => index !== i);
    setRequests(data);
    setChangeRequest(!changeRequest);
  };

  const sendRequestToDb = async () => {
    if (requests.length > 0) {
      try {
        const res = await sendRequest({ requests: requests });
        if (res.success === true) {
          setRequests([]);
          props.addRequest();
          props.handleOk();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("error service");
      }
    } else {
      toast.error("Vui lòng chọn các sản phẩm🤪");
    }
  };

  useEffect(() => {
    getAllModels();
    getFactories();
  }, []);

  useEffect(() => {
    getModelById(idModel);
  }, [idModel]);

  const getAllModels = async () => {
    const res = await indexApi.getAllModels();
    if (res.data) {
      setModels(buildDataModel(res.data.models));
    }
  };

  const getModelById = async (id) => {
    const res = await indexApi.getModelById(id);
    if (res.data) {
      setVersions(buildDataModel(res.data.versions));
      setColors(res.data.colors);
    }
  };

  const getFactories = async () => {
    const res = await indexApi.getManagerByRole(2);
    if (res.data) {
      setFactories(buildDataModel(res.data.managers));
    }
  };

  const buildDataModel = (data) => {
    const results = [];
    for (let i = 0; i < data.length; i++) {
      results.push({ value: data[i].id, label: data[i].name, index: i });
    }
    return results;
  };

  const renderRequest = useMemo(() => {
    return requests.map((request, index) => {
      return (
          <Row
              key={index}
              style={{
                backgroundColor: `${index % 2 === 0 ? "#ececec" : "#faf9f9"}`,
                padding: "5px 0 5px 10px",
              }}
          >
            <Col span={7}>
              <div>Model: {request.model_id}</div>
            </Col>
            <Col span={7}>
              <div>Version: {request.version_id}</div>
            </Col>
            <Col span={4}>
              <div>Color: {request.color_id}</div>
            </Col>
            <Col span={4}>
              <div>Amount: {request.amount}</div>
            </Col>
            <Col span={2}>
              <div className="hoverRed" onClick={() => deleteRequest(index)}>
                <DeleteOutlined/>
              </div>
            </Col>
          </Row>
      );
    });
  }, [changeRequest]);

  return (
    <Modal
      title="Thêm yêu cầu tới nhà máy"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={880}
      footer={[]}
      centered={true}
    >
      <hr style={{ margin: 0, color: "gray" }} />
      <Form layout="vertical" autoComplete="off">
        <Row gutter={[8, 0]} style={{ paddingTop: 20 }}>
          <Col span={12}>
            <Form.Item
              label="Model: "
              required
              name="model"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Không được bỏ trống" },
                {
                  type: "number",
                  min: 1,
                  max:
                    models && models.length > 0
                      ? models[models.length - 1].id
                      : 10000,
                  message: "Giá trị không phù hợp",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a model"
                optionFilterProp="children"
                onChange={onChangeModel}
                style={{
                  width: "100%",
                }}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={models}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Version: "
              required
              name="version"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Chọn Version" },
                {
                  type: "number",
                  min: 1,
                  max:
                    versions && versions.length > 0
                      ? versions[versions.length - 1].id
                      : 10000,
                  message: "Giá trị không phù hợp",
                },
              ]}
            >
              <Select
                showSearch
                title={"Version"}
                placeholder="Select a version"
                optionFilterProp="children"
                style={{
                  width: "100%",
                }}
                onChange={onChangeVersion}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={idVersion}
                options={versions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label={"Factory: "}
              required
              name="factory"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Không được bỏ trống" },
                {
                  type: "number",
                  min: 1,
                  max:
                    factories && factories.length > 0
                      ? factories[factories.length - 1].id
                      : 10000,
                  message: "Giá trị không phù hợp",
                },
              ]}
            >
              <Select
                showSearch
                title={"Version"}
                placeholder="Select a factory"
                optionFilterProp="children"
                style={{
                  width: "100%",
                }}
                onChange={onChangeFactory}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={factories}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label={"Số lượng: "}
              name="amount"
              style={{ width: "100%" }}
              rules={[
                {
                  type: "number",
                  max: 10,
                  min: 1,
                  message: "Giá trị không phù hợp",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                defaultValue={mount}
                style={{ width: "100%" }}
                onChange={onChangeMount}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label={"Màu: "}
              required
              name="color"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Không được bỏ trống" }]}
            >
              {colors.length > 0 ? (
                <Row style={{ width: "100%" }}>
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
                          <Radio value={color.id} key={index}></Radio>
                        </ConfigProvider>
                      );
                    })}
                  </Radio.Group>
                </Row>
              ) : (
                <></>
              )}
            </Form.Item>
          </Col>

          <Col style={{ display: "flex", alignItems: "flex-end" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => addRequest()}
              >
                Thêm
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
          {requests.length > 0 ? renderRequest : <></>}
        </div>
        <Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => sendRequestToDb()}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalRequest;
