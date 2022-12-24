import React from "react";
import { Col, Row, Image } from "antd";

const ListImage = ({ images }) => {
  return (
    <Row gutter={[8, 8]}>
      {images.length > 0 ? (
        images.map((image, index) => {
          return (
            <Col key={index} md={8} xs={24} sm={12}>
              <Image width={"100%"} src={image.link} />
            </Col>
          );
        })
      ) : (
        <></>
      )}
    </Row>
  );
};

export default ListImage;
