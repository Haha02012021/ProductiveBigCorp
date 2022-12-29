import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function PageHeader({
  title = "Title",
  hasAction = true,
  customAction = null,
  onAdd,
}) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        height: "fit-content",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Col
          style={{
            display: "flex",
            alignItems: "center",
          }}
          align="center"
        >
          <ArrowLeftOutlined size={16} onClick={handleBack} />
          <p style={{ fontSize: 20, fontWeight: 600, marginLeft: 8 }}>
            {title}
          </p>
        </Col>
        <Col>
          {hasAction && !customAction && (
            <Button type="primary" onClick={onAdd}>
              Thêm
            </Button>
          )}
        </Col>

        {customAction}
      </Row>
    </div>
  );
}
