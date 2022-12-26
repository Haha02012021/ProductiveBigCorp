import React, { useEffect, useState } from "react";
import { Modal, Image, Tabs, Col, Row, Radio, ConfigProvider } from "antd";
import styled from "styled-components";
import indexApi from "../../../apis/index";
import ListImage from "../../../Components/ListImage";
import CustomTable from "../../../Components/Table/CustomTable";
import { historyColumns } from "../../../const/tableProduct";
import moment from "moment";
import ProductDetail from "./ProductDetail";

export default function ModalViewProduct(props) {
  const [product, setProduct] = useState({});

  const onChange = (key) => {};

  useEffect(() => {
    if (props.idProduct) {
      getProduct(props.idProduct);
    }
  }, [props.idProduct]);

  const getProduct = async (id) => {
    const res = await indexApi.getProductById(id);
    if (res.data) {
      setProduct(res.data);
    }
  };

  const Specification = () => {
    return (
      <>
        <ProductDetail product={product} />
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <BoldText style={{ marginTop: 10, fontSize: 16, marginBottom: 10 }}>
            Lịch sử sản phẩm
          </BoldText>
          <CustomTable
            columns={historyColumns}
            dataSource={buildDataHistory(product?.histories)}
            footer={[]}
            style={{ cursor: "pointer" }}
            showPagination={false}
          ></CustomTable>
        </Row>
      </>
    );
  };

  const buildDataHistory = (data) => {
    if (data && data.length > 0) {
      const result = new Array();
      for (let i = 0; i < data.length; i++) {
        const o = {};
        o.key = i + 1;
        o.status = data[i]?.status?.context;
        o.content = data[i].content;
        o.manage = data[i]?.manager?.name;
        o.time = moment(new Date(data[i]?.createdAt))
          .subtract(1, "hours")
          .calendar();
        result.push(o);
      }
      return result;
    }
    return [];
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
                    product && product.model && product.model.images
                      ? product.model.images
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

const DesText = styled(Row)`
  text-transform: capitalize;
  padding-left: 5px;
`;
