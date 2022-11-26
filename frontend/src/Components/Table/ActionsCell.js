import { Button, Divider, Space } from "antd";
import styled from "styled-components";

export default function ActionsCell({
  hasView = true,
  hasEdit = true,
  hasDelete = true,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <Space split={<Divider type="vertical" />} size>
      {hasView && (
        <StyledButton type="primary" onClick={onView}>
          Xem
        </StyledButton>
      )}
      {hasEdit && (
        <StyledButton
          type="primary"
          style={{ background: "#256D85" }}
          onClick={onEdit}
        >
          Sửa
        </StyledButton>
      )}
      {hasDelete && (
        <StyledButton type="primary" danger onClick={onDelete}>
          Xóa
        </StyledButton>
      )}
    </Space>
  );
}

const StyledButton = styled(Button)`
  border-radius: 2px;
`;
