import { useContext, useState } from "react";
import PageContent from "../../../Components/PageContent";
import CustomModal from "../../../Components/CustomModal";
import TransportForm from "./TransportForm";
import { Form } from "antd";
import { ThemeContext } from "../../../Provider/ThemeProvider";

export default function TransportProduct() {
  const { isModel } = useContext(ThemeContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <PageContent
        pageHeaderProps={{
          title: "Vận chuyển sản phẩm",
          onAdd: () => setAddModalVisible(true),
        }}
      ></PageContent>
      {addModalVisible && (
        <CustomModal
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          title="Thêm đơn vận chuyển"
          width={isModel ? "84%" : "60%"}
        >
          <TransportForm form={form} />
        </CustomModal>
      )}
    </>
  );
}
