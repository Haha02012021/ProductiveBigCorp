import { Modal } from "antd";

export default function CustomModal({ children, title, open, onCancel, onOk }) {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText="Lưu"
      cancelText="Bỏ qua"
      width="72%"
    >
      {children}
    </Modal>
  );
}
