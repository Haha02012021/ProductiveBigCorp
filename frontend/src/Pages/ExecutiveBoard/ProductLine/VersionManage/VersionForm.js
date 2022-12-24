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

export default function VersionForm({ form, errorPanelKey }) {
  const [allModels, setAllModels] = useState([]);
  const [selectedPanelKey, setSelectedPanelKey] = useState([
    "kich_thuoc_khoi_luong",
    "dong_co_hop_so",
    "khung_gam",
    "ngoai_that",
    "noi_that",
    "an_toan",
    "i-activsense",
  ]);

  useEffect(() => {
    if (errorPanelKey) {
      setSelectedPanelKey((prev) => [...prev, errorPanelKey]);
    }
  }, [errorPanelKey]);

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
          <Collapse.Panel
            header="Kích thước - Khối lượng"
            key="kich_thuoc_khoi_luong"
          >
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Kích thước tổng thể"
              required
              style={{ margin: 0 }}
            >
              <Space size={[20, 0]}>
                <Form.Item
                  name={[
                    "kich_thuoc_khoi_luong",
                    "kich_thuoc_tong_the",
                    "length",
                  ]}
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
                  name={[
                    "kich_thuoc_khoi_luong",
                    "kich_thuoc_tong_the",
                    "width",
                  ]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều rộng"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={[
                    "kich_thuoc_khoi_luong",
                    "kich_thuoc_tong_the",
                    "height",
                  ]}
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
              name={["kich_thuoc_khoi_luong", "chieu_dai_co_so"]}
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
              name={["kich_thuoc_khoi_luong", "ban_kinh_quay_vong_toi_thieu"]}
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
              name={["kich_thuoc_khoi_luong", "khoang_sang_gam_xe"]}
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
              name={["kich_thuoc_khoi_luong", "khoi_luong_khong_tai"]}
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
              name={["kich_thuoc_khoi_luong", "khoi_luong_toan_tai"]}
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
              name={["kich_thuoc_khoi_luong", "the_tich_khoang_hanh_ly"]}
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
              name={["kich_thuoc_khoi_luong", "dung_tich_thung_nhien_lieu"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Động cơ hộp số" key="dong_co_hop_so">
            <SpecificationFormItem label="Loại động cơ" name={["loai_dong_co"]}>
              <Input placeholder="Nhập loại động cơ" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống nhiên liệu"
              name={["dong_co_hop_so", "he_thong_nhien_lieu"]}
            >
              <Input placeholder="Nhập hệ thống nhiên liệu" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Dung tích xi lanh"
              name={["dong_co_hop_so", "dung_tich_xilanh"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Công suất tối đa"
              name={["dong_co_hop_so", "cong_suat_toi_da"]}
            >
              <InputNumber
                placeholder="Nhập công suất"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Momen xoắn cực đại"
              name={["dong_co_hop_so", "momen_xoan_cuc_dai"]}
            >
              <InputNumber
                placeholder="Nhập giá trị mô men xoắn"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hộp số"
              name={["dong_co_hop_so", "hop_so"]}
            >
              <Input placeholder="Nhập hộp số" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Chế độ thể thao"
              name={["dong_co_hop_so", "che_do_the_thao"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát gia tốc (GVC)"
              name={["dong_co_hop_so", "GVC"]}
            >
              <Input placeholder="Nhập GVC" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống ngừng/khởi động thông minh"
              name={["dong_co_hop_so", "he_thong_ngung_khoi_dong_thong_minh"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Khung gầm" key="khung_gam">
            <SpecificationFormItem
              label="Hệ thống treo trước"
              name={["khung_gam", "he_thong_treo_truoc"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>

            <SpecificationFormItem
              label="Hệ thống treo sau"
              name={["khung_gam", "he_thong_treo_sau"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống dẫn động"
              name={["khung_gam", "he_thong_dan_dong"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh trước"
              name={["khung_gam", "he_thong_phanh_truoc"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh sau"
              name={["khung_gam", "he_thong_phanh_sau"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống trợ lực lái"
              name={["khung_gam", "he_thong_tro_luc_lai"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Kích thước lốp xe"
              name={["khung_gam", "kich_thuoc_lop_xe"]}
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Đường kính lốp xe"
              name={["khung_gam", "duong_kinh_lop_xe"]}
            >
              <Input placeholder="Nhập đường kính" />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Ngoại thất" key="ngoai_that">
            <SpecificationFormItem
              name={["ngoai_that", "den_chieu_gan"]}
              label="Đèn chiếu gần"
            >
              <Input placeholder="Nhập đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem name={["den_chieu_xa"]} label="Đèn chiếu xa">
              <Input placeholder="Nhập đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "den_led_chay_ban_ngay"]}
              label="Đèn LED chạy ban ngày"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "den_truoc_tu_dong_bat_tat"]}
              label="Đèn trước tự động Bật/Tắt"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "den_truoc_tu_dong_can_bang_goc_chieu"]}
              label="Đèn trước tự động cân bằng góc chiếu"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "guong_chieu_hau_ngoai_gap_dien_chinh_dien"]}
              label="Gương chiếu hậu ngoài điều chỉnh chập điệu/chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "gat_mua_tu_dong"]}
              label="Chức năng gạt mưa tự động"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "cum_den_sau_dang_led"]}
              label="Cụm đèn sau dạng LED"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "cua_so_troi"]}
              label="Cửa sổ trời"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["ngoai_that", "ong_xa_kep"]}
              label="Ống xả kép"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Nội thất" key="noi_that">
            <SpecificationFormItem
              name={["noi_that", "chat_lieu_noi_that"]}
              label="Chất liệu nội thất"
            >
              <Input placeholder="Nhập chất liệu" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "ghe_lai_dieu_chinh_dien"]}
              label="Ghế lái điều chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "ghe_lai_co_nho_vi_tri"]}
              label="Ghế lái có nhớ vị trí"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "ghe_phu_dieu_chinh_dien"]}
              label="Ghế phụ điều chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "dvd_player"]}
              label="DVD player"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "man_hinh_cam_ung"]}
              label="Màn hình cảm ứng"
            >
              <Input placeholder="Nhập hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "AUX_USB_bluetooth"]}
              label="Kết nối AUX, USB, bluetooth"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem name={["noi_that", "so_loa"]} label="Số loa">
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "lay_chuyen_so"]}
              label="Lẫy chuyển số"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "phanh_tay_dien_tu"]}
              label="Phanh điện tử"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "giu_phanh_tu_dong"]}
              label="Giữ phanh tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "khoi_dong_bang_nut_bam"]}
              label="Khởi động bằng nút bấm"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "ga_tu_dong"]}
              label="Ga tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "dieu_hoa_tu_dong"]}
              label="Điều hòa tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "cua_gio_hang_ghe_sau"]}
              label="Cửa gió hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "cua_so_chinh_dien"]}
              label="Cửa sổ chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "guong_hau_trung_tam_chong_choi_tu_dong"]}
              label="Gương chiếu hậu trung tâm chống chói tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "hud"]}
              label="Màn hình hiển thị tốc độ HUD"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "rem_che_nang_kinh_sau_chinh_dien"]}
              label="Rèm che nắng kính sau chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "rem_che_nang_cua_so_sau"]}
              label="Rèm che nắng cửa sổ hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "tua_tay_hang_ghe_sau"]}
              label="Tựa tay hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "tua_tay_ghe_sau_tich_hop_cong_usb"]}
              label="Tựa tay ghế sau tích hợp cổng USB"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["noi_that", "hang_ghe_thu_hai_gap_theo_ti_le_60_40"]}
              label="Hàng ghế thứ hai gập theo tỉ lệ 60:40"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="An toàn" key="an_toan">
            <SpecificationFormItem
              label="Số túi khí"
              name={["an_toan", "so_tui_khi"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống chống bó cứng phanh ABS"
              name={["an_toan", "ABS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phân bổ lực phanh điện tử EBD"
              name={["an_toan", "EBD"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ lực phanh khẩn cấp EBA"
              name={["an_toan", "EBA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cảnh báo phanh khẩn cấp ESS"
              name={["an_toan", "ESS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cân bằng điện tử DSC"
              name={["an_toan", "DSC"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát lực kéo chống trượt TCS"
              name={["an_toan", "TCS"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ khởi hành ngang dốc HLA"
              name={["an_toan", "HLA"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Mã hóa chống sao chép chìa khóa"
              name={["an_toan", "ma_hoa_chong_sao_chep_chia_khoa"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo chống trộm"
              name={["an_toan", "canh_bao_chong_trom"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Camera lùi"
              name={["an_toan", "camera_lui"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía sau"
              name={["an_toan", "cam_bien_canh_bao_va_cham_phia_sau"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía trước"
              name={["an_toan", "cam_bien_canh_bao_va_cham_phia_truoc"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Camera quan sát 360 độ"
              name={["an_toan", "camera_quan_sat_360"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo thắt dây an toàn"
              name={["an_toan", "canh_bao_that_day_an_toan"]}
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
