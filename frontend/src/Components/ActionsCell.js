import { Button, Divider, Space } from "antd";
import styled from 'styled-components';

export default function ActionsCell() {
  return (
    <Space split={<Divider type="vertical" />} size>
      <StyledButton type="primary">Xem</StyledButton>
      <StyledButton type="primary" style={{ background: "#256D85" }}>
        Sửa
      </StyledButton>
      <StyledButton type="primary" danger>
        Xóa
      </StyledButton>
    </Space>
  );
}

const StyledButton = styled(Button)`
  border-radius: 2px
`;
