import { DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";
import indexApi from "../../../../apis";

export default function ExportForm({ form }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    getAllStatuses();
  }, []);

  const getAllStatuses = async () => {
    const res = await indexApi.getAllStatuses();

    if (res.success) {
      console.log(res.data);
    }
  };

  return (
    <Form form={form}>
      <Form.Item label="Ngày xuất">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Trạng thái">
        <Select options={statuses} />
      </Form.Item>
    </Form>
  );
}
