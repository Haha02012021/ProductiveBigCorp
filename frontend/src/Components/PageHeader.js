import { Button, Space } from "antd";
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
      <div
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Space
          style={{
            display: "flex",
            alignItems: "center",
          }}
          size={[16, 0]}
          align="center"
        >
          <ArrowLeftOutlined size={16} onClick={handleBack} />
          <p style={{ fontSize: 20, fontWeight: 600 }}>{title}</p>
        </Space>
        {hasAction && !customAction && (
          <Button type="primary" onClick={onAdd}>
            Thêm
          </Button>
        )}
        {customAction}
      </div>
    </div>
  );
}
