import React, { useState, useEffect, useMemo } from "react";
import { Modal, Select, Row, Col, Radio, ConfigProvider } from "antd";
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import indexApi from "../../../apis";

const ModalRequest = (props) => {
  const [versions, setVersions] = useState([]);
  const [models, setModels] = useState([]);
  const [idModel, setIdModel] = useState(0);
  const [idVersion, setIdVersion] = useState(0);
  const [mount, setMount] = useState(1);
  const [idColor, setIdColor] = useState(0);
  const [colors, setColors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [changeRequest, setChangeRequest] = useState(false);

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

  const onChangeMount = (value) => {
    setMount(value);
  };

  const addRequest = () => {
    if (idModel !== 0 && idVersion !== 0) {
      const data = requests;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].idModel === idModel &&
          data[i].idVersion === idVersion &&
          data[i].idColor === idColor
        ) {
          data[i].mount += mount;
          setRequests(data);
          setChangeRequest(!changeRequest);
          return;
        }
      }
      data.push({
        idModel: idModel,
        idVersion: idVersion,
        idColor: idColor,
        mount: mount,
      });
      setRequests(data);
      setChangeRequest(!changeRequest);
    }
  };

  const deleteRequest = (i) => {
    let data = requests;
    data = data.filter((request, index) => index !== i);
    console.log(data);
    setRequests(data);
    setChangeRequest(!changeRequest);
  };

  const sendRequest = () => {
    console.log(requests);
  };

  useEffect(() => {
    getAllModels();
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

  const buildDataModel = (data) => {
    const results = new Array();
    for (let i = 0; i < data.length; i++) {
      results.push({ value: data[i].id, label: data[i].name });
    }
    return results;
  };

  const renderRequest = useMemo(() => {
    const node = requests.map((request, index) => {
      return (
        <Row
          key={index}
          style={{
            backgroundColor: `${index % 2 === 0 ? "#ececec" : "#faf9f9"}`,
            padding: "5px 0 5px 10px",
          }}
        >
          <Col span={7}>
            <div>Model: {request.idModel}</div>
          </Col>
          <Col span={7}>
            <div>Version: {request.idVersion}</div>
          </Col>
          <Col span={4}>
            <div>Color: {request.idColor}</div>
          </Col>
          <Col span={4}>
            <div>Mount: {request.mount}</div>
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
      <hr />
      <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
        {requests.length > 0 ? renderRequest : <></>}
      </div>
      <Row>
        <Button type="primary" onClick={() => sendRequest()}>
          Gửi yêu cầu
        </Button>
      </Row>
    </Modal>
  );
};

export default ModalRequest;
