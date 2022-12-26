import { Button, Divider, Space } from "antd";
import styled from "styled-components";

export default function ActionsCell({
  hasView = true,
  hasEdit = true,
  hasDelete = true,
  hasConfirm = true,
  onView,
  onEdit,
  onDelete,
  onConfirm,
  viewText = "Xem",
  editText = "Sửa",
  deleteText = "Xóa",
  confirmText = "Xác nhận",
}) {
  return (
    <Space split={<Divider type="vertical" />} size>
      {hasView && (
        <StyledButton type="primary" onClick={onView}>
          {viewText}
        </StyledButton>
      )}
      {hasEdit && (
        <StyledButton
          type="primary"
          style={{ background: "#256D85" }}
          onClick={onEdit}
        >
          {editText}
        </StyledButton>
      )}
      {hasDelete && (
        <StyledButton type="primary" danger onClick={onDelete}>
          {deleteText}
        </StyledButton>
      )}
      {hasConfirm && (
        <StyledButton type="primary" onClick={onConfirm}>
          {confirmText}
        </StyledButton>
      )}
    </Space>
  );
}

const StyledButton = styled(Button)`
  border-radius: 2px;
`;
