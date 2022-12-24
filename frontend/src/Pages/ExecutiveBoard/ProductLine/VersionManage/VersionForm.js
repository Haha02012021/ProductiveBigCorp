import {
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import indexApi from "../../../../apis";

export default function VersionForm({ form, errorPanelKey, versionId }) {
  const [allModels, setAllModels] = useState([]);
  const [initialValues, setInitialValues] = useState();
  const [selectedPanelKey, setSelectedPanelKey] = useState([
    "size",
    "engine",
    "chassis",
    "exterior",
    "interior",
    "safety",
    "i-activsense",
  ]);

  useEffect(() => {
    if (versionId) {
      getVersionById();
    }
  }, [versionId]);

  useEffect(() => {
    if (errorPanelKey) {
      setSelectedPanelKey((prev) => [...prev, errorPanelKey]);
    }
  }, [errorPanelKey]);

  const getVersionById = async () => {
    const res = await indexApi.getVersionById(versionId);

    if (res.success) {
      const data = res.data;
      setInitialValues(data);
      form.setFieldValue("model_id", data.model_id);
      form.setFieldValue("name", data.name);
      form.setFieldValue("size", data.size);
      form.setFieldValue(
        ["size", "kich_thuoc_tong_the", "length"],
        data.size.kich_thuoc_tong_the.split(" x ")[0]
      );
      form.setFieldValue(
        ["size", "kich_thuoc_tong_the", "width"],
        data.size.kich_thuoc_tong_the.split(" x ")[1]
      );
      form.setFieldValue(
        ["size", "kich_thuoc_tong_the", "height"],
        data.size.kich_thuoc_tong_the.split(" x ")[2]
      );
      form.setFieldValue("engine", data.engine);
      form.setFieldValue("chassis", data.chassis);
      form.setFieldValue("exterior", data.exterior);
      form.setFieldValue("interior", data.interior);
      form.setFieldValue("safety", data.safety);
      form.setFieldValue("i_activesense", data.i_activesense);
    }
  };

  const handleChange = (selectedPanelKey) => {
    setSelectedPanelKey(selectedPanelKey);
  };

  useEffect(() => {
    getAllModels();
  }, []);

  const getAllModels = async () => {
    const res = await indexApi.getAllModels();
    if (res.success) {
      setAllModels(res.data);
    }
  };
  return (
    <Form
      labelCol={{ sm: 6, md: 4 }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item label="Dòng sản phẩm" required name="model_id">
        <Select
          placeholder="Chọn dòng sản phẩm"
          options={allModels.map((model) => {
            return {
              value: model.id,
              label: model.name,
            };
          })}
        />
      </Form.Item>
      <Form.Item label="Phiên bản" required name="name">
        <Input placeholder="Nhập tên phiên bản" />
      </Form.Item>
      <Form.Item label="Thông số" required>
        <Collapse
          onChange={handleChange}
          bordered
          ghost
          activeKey={selectedPanelKey}
        >
          <Collapse.Panel header="Kích thước - Khối lượng" key="size">
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Kích thước tổng thể"
              required
              style={{ margin: 0 }}
            >
              <Space size={[20, 0]}>
                <Form.Item
                  name={["size", "kich_thuoc_tong_the", "length"]}
                  required
                  // rules={[
                  //   { required: true, message: "Bạn phải nhập chiều dài!" },
                  // ]}
                >
                  <InputNumber
                    placeholder="Nhập chiều dài"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={["size", "kich_thuoc_tong_the", "width"]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều rộng"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={["size", "kich_thuoc_tong_the", "height"]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều cao"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Chiều dài cơ sở"
              required
              name={["size", "chieu_dai_co_so"]}
            >
              <InputNumber
                placeholder="Nhập chiều dài cơ sở"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Bán kính vòng quay tối thiểu"
              labelWrap
              required
              name={["size", "ban_kinh_quay_vong_toi_thieu"]}
            >
              <InputNumber
                placeholder="Nhập bán kính"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Khoảng sáng gầm xe"
              labelWrap
              required
              name={["size", "khoang_sang_gam_xe"]}
            >
              <InputNumber
                placeholder="Nhập khoảng sáng"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Khối lượng không tải"
              labelWrap
              required
              name={["size", "khoi_luong_khong_tai"]}
            >
              <InputNumber
                placeholder="Nhập khối lượng"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Khối lượng toàn tải"
              labelWrap
              required
              name={["size", "khoi_luong_toan_tai"]}
            >
              <InputNumber
                placeholder="Nhập khối lượng"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Thể tích khoang hành lý"
              labelWrap
              required
              name={["size", "the_tich_khoang_hanh_ly"]}
            >
              <InputNumber
                placeholder="Nhập thể tích"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Dung tích thùng nhiên liệu"
              labelWrap
              required
              name={["size", "dung_tich_thung_nhien_lieu"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Động cơ hộp số" key="engine">
            <SpecificationFormItem
              label="Loại động cơ"
              name={["engine", "loai_dong_co"]}
            >
              <Input placeholder="Nhập loại động cơ" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống nhiên liệu"
              name={["engine", "he_thong_nhien_lieu"]}
            >
              <Input placeholder="Nhập hệ thống nhiên liệu" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Dung tích xi lanh"
              name={["engine", "dung_tich_xilanh"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Công suất tối đa"
              name={["engine", "cong_suat_toi_da"]}
            >
              <InputNumber
                placeholder="Nhập công suất"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Momen xoắn cực đại"
              name={["engine", "momen_xoan_cuc_dai"]}
            >
              <InputNumber
                placeholder="Nhập giá trị mô men xoắn"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem label="Hộp số" name={["engine", "hop_so"]}>
              <Input placeholder="Nhập hộp số" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Chế độ thể thao"
              name={["engine", "che_do_the_thao"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát gia tốc (GVC)"
              name={["engine", "GVC"]}
            >
              <Input placeholder="Nhập GVC" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống ngừng/khởi động thông minh"
              name={["engine", "he_thong_ngung_khoi_dong_thong_minh"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Khung gầm" key="chassis">
            <SpecificationFormItem
              label="Hệ thống treo trước"
              name={["chassis", "he_thong_treo_truoc"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>

            <SpecificationFormItem
              label="Hệ thống treo sau"
              name={["chassis", "he_thong_treo_sau"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống dẫn động"
              name={["chassis", "he_thong_dan_dong"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh trước"
              name={["chassis", "he_thong_phanh_truoc"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh sau"
              name={["chassis", "he_thong_phanh_sau"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống trợ lực lái"
              name={["chassis", "he_thong_tro_luc_lai"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Kích thước lốp xe"
              name={["chassis", "kich_thuoc_lop_xe"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Đường kính lốp xe"
              name={["chassis", "duong_kinh_mam_xe"]}
            >
              <Input placeholder="Nhập đường kính" />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Ngoại thất" key="exterior">
            <SpecificationFormItem
              name={["exterior", "den_chieu_gan"]}
              label="Đèn chiếu gần"
            >
              <Input placeholder="Nhập đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "den_chieu_xa"]}
              label="Đèn chiếu xa"
            >
              <Input placeholder="Nhập đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "den_led_chay_ban_ngay"]}
              label="Đèn LED chạy ban ngày"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.den_led_chay_ban_ngay === "yes"
                    ? true
                    : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "den_truoc_tu_dong_bat_tat"]}
              label="Đèn trước tự động Bật/Tắt"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.den_truoc_tu_dong_bat_tat === "yes"
                    ? true
                    : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "den_truoc_tu_dong_can_bang_goc_chieu"]}
              label="Đèn trước tự động cân bằng góc chiếu"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "guong_chieu_hau_ngoai_gap_dien_chinh_dien"]}
              label="Gương chiếu hậu ngoài điều chỉnh chập điệu/chỉnh điện"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior
                    ?.guong_chieu_hau_ngoai_gap_dien_chinh_dien === "yes"
                    ? true
                    : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "gat_mua_tu_dong"]}
              label="Chức năng gạt mưa tự động"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.gat_mua_tu_dong === "yes"
                    ? true
                    : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "cum_den_sau_dang_led"]}
              label="Cụm đèn sau dạng LED"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.cum_den_sau_dang_led === "yes"
                    ? true
                    : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "cua_so_troi"]}
              label="Cửa sổ trời"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.cua_so_troi === "yes" ? true : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "ong_xa_kep"]}
              label="Ống xả kép"
            >
              <Switch
                defaultChecked={
                  initialValues?.exterior?.ong_xa_kep === "yes" ? true : false
                }
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Nội thất" key="interior">
            <SpecificationFormItem
              name={["interior", "chat_lieu_interior"]}
              label="Chất liệu nội thất"
            >
              <Input placeholder="Nhập chất liệu" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "ghe_lai_dieu_chinh_dien"]}
              label="Ghế lái điều chỉnh điện"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.ghe_lai_dieu_chinh_dien === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "ghe_lai_co_nho_vi_tri"]}
              label="Ghế lái có nhớ vị trí"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.ghe_lai_co_nho_vi_tri === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "ghe_phu_dieu_chinh_dien"]}
              label="Ghế phụ điều chỉnh điện"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.ghe_phu_dieu_chinh_dien === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "dvd_player"]}
              label="DVD player"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.dvd_player === "yes" ? true : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "man_hinh_cam_ung"]}
              label="Màn hình cảm ứng"
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "AUX_USB_bluetooth"]}
              label="Kết nối AUX, USB, bluetooth"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.AUX_USB_bluetooth === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem name={["interior", "so_loa"]} label="Số loa">
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "lay_chuyen_so"]}
              label="Lẫy chuyển số"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.lay_chuyen_so === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "phanh_tay_dien_tu"]}
              label="Phanh điện tử"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.phanh_tay_dien_tu === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "giu_phanh_tu_dong"]}
              label="Giữ phanh tự động"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.giu_phanh_tu_dong === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "khoi_dong_bang_nut_bam"]}
              label="Khởi động bằng nút bấm"
            >
              <Switch
                defaultChecked={
                  initialValues?.interior?.khoi_dong_bang_nut_bam === "yes"
                    ? true
                    : false
                }
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "ga_tu_dong"]}
              label="Ga tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "dieu_hoa_tu_dong"]}
              label="Điều hòa tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "cua_gio_hang_ghe_sau"]}
              label="Cửa gió hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "cua_so_chinh_dien"]}
              label="Cửa sổ chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "guong_hau_trung_tam_chong_choi_tu_dong"]}
              label="Gương chiếu hậu trung tâm chống chói tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "hud"]}
              label="Màn hình hiển thị tốc độ HUD"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "rem_che_nang_kinh_sau_chinh_dien"]}
              label="Rèm che nắng kính sau chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "rem_che_nang_cua_so_sau"]}
              label="Rèm che nắng cửa sổ hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "tua_tay_hang_ghe_sau"]}
              label="Tựa tay hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "tua_tay_ghe_sau_tich_hop_cong_usb"]}
              label="Tựa tay ghế sau tích hợp cổng USB"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["interior", "hang_ghe_thu_hai_gap_theo_ti_le_60_40"]}
              label="Hàng ghế thứ hai gập theo tỉ lệ 60:40"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="An toàn" key="safety">
            <SpecificationFormItem
              label="Số túi khí"
              name={["safety", "so_tui_khi"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống chống bó cứng phanh ABS"
              name={["safety", "ABS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phân bổ lực phanh điện tử EBD"
              name={["safety", "EBD"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ lực phanh khẩn cấp EBA"
              name={["safety", "EBA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cảnh báo phanh khẩn cấp ESS"
              name={["safety", "ESS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cân bằng điện tử DSC"
              name={["safety", "DSC"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát lực kéo chống trượt TCS"
              name={["safety", "TCS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ khởi hành ngang dốc HLA"
              name={["safety", "HLA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Mã hóa chống sao chép chìa khóa"
              name={["safety", "ma_hoa_chong_sao_chep_chia_khoa"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo chống trộm"
              name={["safety", "canh_bao_chong_trom"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Camera lùi"
              name={["safety", "camera_lui"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía sau"
              name={["safety", "cam_bien_canh_bao_va_cham_phia_sau"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía trước"
              name={["safety", "cam_bien_canh_bao_va_cham_phia_truoc"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Camera quan sát 360 độ"
              name={["safety", "camera_quan_sat_360"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo thắt dây an toàn"
              name={["safety", "canh_bao_that_day_safety"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="I-ACTIVSENSE" key="i-activsense">
            <SpecificationFormItem
              label="Hệ thống mở rộng góc chiếu đèn trước theo hướng đánh lái AFS"
              name={["i-activsense", "AFS"]}
            >
              <Switch
                defaultChecked={true}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống tự động điều chỉnh chế độ đèn chiếu xa HBC"
              name={["i-activsense", "HBC"]}
            >
              <Switch
                defaultChecked={true}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống đèn thích ứng thông minh ALH"
              name={["i-activsense", "ALH"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo phương tiện cắt ngang khi lùi RCTA"
              name={["i-activsense", "RCTA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo chệch làn LDW"
              name={["i-activsense", "LDW"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ giữ làn LAS"
              name={["i-activsense", "LAS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh trong thành phố (phía trước)"
              name={["i-activsense", "phanh_thong_mminh_truoc"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh trong thành phố (phía sau)"
              name={["i-activsense", "phanh_thong_minh_sau"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh SBS"
              name={["i-activsense", "SBS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống điều khiển hành trình tích hợp radar MRCC"
              name={["i-activsense", "MRCC"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống nhắc nhở người lái tập trung DAA"
              name={["i-activsense", "DAA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cảnh báo điểm mù BSM"
              name={["i-activsense", "BSM"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
        </Collapse>
      </Form.Item>
    </Form>
  );
}

function SpecificationFormItem({ children, label, name }) {
  return (
    <Form.Item
      labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
      label={label}
      labelWrap
      required
      name={[...name]}
    >
      {children}
    </Form.Item>
  );
}
