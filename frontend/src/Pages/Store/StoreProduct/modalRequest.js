import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Select, Row, Col, Radio, ConfigProvider } from "antd";
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import indexApi from "../../../apis";
import { sendRequest } from "../../../apis/store";
import { AuthContext } from "../../../Provider/AuthProvider";

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
    const res = await sendRequest({ requests: requests });
    if (res.success === true) {
      setRequests([]);
      props.addRequest();
      props.handleOk();
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
      setModels(buildDataModel(res.data));
    }
  };

  const getModelById = async (id) => {
    const res = await indexApi.getModelById(id);
    if (res.data) {
      setVersions(buildDataModel(res.data.versions));
      setColors(res.data.colors);
    }
  };

  const getFactories = async (id) => {
    const res = await indexApi.getManagerByRole(2);
    if (res.data) {
      setFactories(buildDataModel(res.data));
    }
  };

  const buildDataModel = (data) => {
    const results = new Array();
    for (let i = 0; i < data.length; i++) {
      results.push({ value: data[i].id, label: data[i].name, index: i });
    }
    return results;
  };

  const renderRequest = useMemo(() => {
    const node = requests.map((request, index) => {
      console.log(request);
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
              <DeleteOutlined />
            </div>
          </Col>
        </Row>
      );
    });
    return node;
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
      <Row gutter={[8, 8]} style={{ paddingTop: 20 }}>
        <Col span={12}>
          <label>Model: </label>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChangeModel}
            style={{
              width: "100%",
            }}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={models}
          />
        </Col>

        <Col span={12}>
          <label>Version: </label>
          <Select
            showSearch
            title={"Version"}
            placeholder="Select a person"
            optionFilterProp="children"
            style={{
              width: "100%",
            }}
            onChange={onChangeVersion}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={idVersion}
            options={versions}
          />
        </Col>

        <Col span={8}>
          <label>Factory: </label>
          <Select
            showSearch
            title={"Version"}
            placeholder="Select a person"
            optionFilterProp="children"
            style={{
              width: "100%",
            }}
            onChange={onChangeFactory}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={factories}
          />
        </Col>

        <Col span={4}>
          <label>Số lượng: </label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={mount}
            style={{ width: "100%" }}
            onChange={onChangeMount}
          />
        </Col>

        <Col>
          <label>Màu: </label>
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
                      <Radio value={index} key={index}></Radio>
                    </ConfigProvider>
                  );
                })}
              </Radio.Group>
            </Row>
          ) : (
            <></>
          )}
        </Col>

        <Col style={{ display: "flex", alignItems: "flex-end" }}>
          <Button type="primary" onClick={() => addRequest()}>
            Thêm
          </Button>
        </Col>
      </Row>
      <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
        {requests.length > 0 ? renderRequest : <></>}
      </div>
      <Row>
        <Button type="primary" onClick={() => sendRequestToDb()}>
          Gửi yêu cầu
        </Button>
      </Row>
    </Modal>
  );
};

export default ModalRequest;
