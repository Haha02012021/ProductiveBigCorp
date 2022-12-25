import { DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";
import indexApi from "../../../../apis";
import { progress } from "../../../../const";

export default function ExportForm({ form, reqId }) {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (reqId) {
      getReqById();
    }
  }, [reqId]);

  const getReqById = async () => {
    const res = await indexApi.getRequestById(reqId);

    if (res.success) {
      const values = {
        exportDate: res.data.exportDate,
        progress: progress[res.progress],
      };
      setInitialValues(values);
    }
  };
  const buildProgress = () => {
    const builtProgress = new Array();

    for (const key in progress) {
      const option = {
        label: progress[key].context,
        value: key,
      };
      builtProgress.push(option);
    }
  };

  return (
    <Form form={form} style={{ paddingTop: 16 }} initialValues={initialValues}>
      <Form.Item label="Ngày xuất" name="exportDate">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Trạng thái" name="progress">
        <Select placeholder="Chọn trạng thái" options={buildProgress()} />
      </Form.Item>
    </Form>
  );
}
