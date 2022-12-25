import { DatePicker, Form, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import indexApi from "../../../../apis";
import { dateFormat, progress } from "../../../../const";

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
      const exportDate = dayjs(res.data.createdAt, dateFormat);
      console.log(exportDate);
      const values = {
        exportDate,
        progress: progress[res.data.progress].context,
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

    return builtProgress;
  };

  return (
    <Spin spinning={!initialValues && reqId}>
      {initialValues && (
        <Form
          form={form}
          style={{ paddingTop: 16 }}
          initialValues={initialValues}
        >
          <Form.Item label="Ngày xuất" name="exportDate">
            <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label="Trạng thái" name="progress">
            <Select placeholder="Chọn trạng thái" options={buildProgress()} />
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
}
