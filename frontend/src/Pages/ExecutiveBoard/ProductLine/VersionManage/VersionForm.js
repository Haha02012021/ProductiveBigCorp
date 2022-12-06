import {
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
} from "antd";

export default function VersionForm({ form }) {
  const handleChange = () => {};

  return (
    <Form
      labelCol={{ sm: 6, md: 4 }}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      form={form}
    >
      <Form.Item label="Dòng sản phẩm" required name="productLine">
        <Select placeholder="Chọn dòng sản phẩm" />
      </Form.Item>
      <Form.Item label="Phiên bản" required name="version">
        <Select placeholder="Chọn phiên bản" />
      </Form.Item>
      <Form.Item label="Thông số" required>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={handleChange}
          bordered
          ghost
        >
          <Collapse.Panel header="Kích thước - Khối lượng" key="1">
            <Form.Item
              labelCol={{ sm: { span: 12 }, md: { span: 10 } }}
              label="Kích thước tổng thể"
              required
              style={{ margin: 0 }}
            >
              <Space size={[20, 0]}>
                <Form.Item
                  name={[
                    "specifications",
                    "sizeWeight",
                    "overallSize",
                    "length",
                  ]}
                  required
                >
                  <InputNumber
                    placeholder="Nhập chiều dài"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={[
                    "specifications",
                    "sizeWeight",
                    "overallSize",
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
                    "specifications",
                    "sizeWeight",
                    "overallSize",
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
              name={["specifications", "sizeWeight", "standardLength"]}
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
              name={["specifications", "sizeWeight", "radius"]}
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
              name={["specifications", "sizeWeight", "groundClearance"]}
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
              name={["specifications", "sizeWeight", "unladenWeight"]}
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
              name={["specifications", "sizeWeight", "fullLoadMass"]}
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
              name={[
                "specifications",
                "sizeWeight",
                "luggageCompartmentVolume",
              ]}
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
              name={["specifications", "sizeWeight", "fuelTankCapacity"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Động cơ hộp số" key="2">
            <SpecificationFormItem
              label="Loại động cơ"
              name={["engine", "engineType"]}
            >
              <Select placeholder="Chọn loại động cơ"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống nhiên liệu"
              name={["engine", "fuelSystem"]}
            >
              <Select placeholder="Chọn hệ thống nhiên liệu"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Dung tích xi lanh"
              name={["engine", "cylinderCapacity"]}
            >
              <InputNumber
                placeholder="Nhập dung tích"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Công suất tối đa"
              name={["engine", "maximumCapacity"]}
            >
              <InputNumber
                placeholder="Nhập công suất"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Momen xoắn cực đại"
              name={["engine", "maximumTorque"]}
            >
              <InputNumber
                placeholder="Nhập giá trị mô men xoắn"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem label="Hộp số" name={["engine", "gear"]}>
              <Select placeholder="Chọn hộp số"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Chế độ thể thao"
              name={["engine", "sportMode"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát gia tốc (GVC)"
              name={["engine", "gvc"]}
            >
              <Select placeholder="Chọn hệ thống GVC"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống ngừng/khởi động thông minh"
              name={["engine", "smartSystem"]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Khung gầm" key="4">
            <SpecificationFormItem
              label="Hệ thống treo trước"
              name={["chassis", "frontSuspension"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>

            <SpecificationFormItem
              label="Hệ thống treo sau"
              name={["chassis", "rearSuspension"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống dẫn động"
              name={["chassis", "driveSystem"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh trước"
              name={["chassis", "frontBrakeSystem"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phanh sau"
              name={["chassis", "rearBrakeSystem"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống trợ lực lái"
              name={["chassis", "powerSteeringSystem	"]}
            >
              <Select placeholder="Chọn hệ thống" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Kích thước lốp xe"
              name={["chassis", "tireSize"]}
            >
              <Select placeholder="Chọn kích thước" />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Đường kính lốp xe"
              name={["chassis", "wheelDiameter	"]}
            >
              <Select placeholder="Chọn đường kính" />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Ngoại thất" key="5">
            <SpecificationFormItem
              name={["exterior", "dimmingLamp"]}
              label="Đèn chiếu gần"
            >
              <Select placeholder="Chọn đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "highBeam"]}
              label="Đèn chiếu xa"
            >
              <Select placeholder="Chọn đèn" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "daytimeLed"]}
              label="Đèn LED chạy ban ngày"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "frontLightsAutoOnOff"]}
              label="Đèn trước tự động Bật/Tắt"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "frontLightsAutoBalanceAngle"]}
              label="Đèn trước tự động cân bằng góc chiếu"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "electricwithOutsideRearviewMirror"]}
              label="Gương chiếu hậu ngoài điều chỉnh chập điệu/chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "autoWiper"]}
              label="Chức năng gạt mưa tự động"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "LEDRearLightCluster"]}
              label="Cụm đèn sau dạng LED"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "sunroof"]}
              label="Cửa sổ trời"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["exterior", "dualExhaust"]}
              label="Ống xả kép"
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="Nội thất" key="6">
            <SpecificationFormItem
              name={["furniture", "interiorMaterial"]}
              label="Chất liệu nội thất"
            >
              <Select placeholder="Chọn chất liệu"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "interiorMaterial"]}
              label="Chất liệu nội thất"
            >
              <Select placeholder="Chọn chất liệu"></Select>
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Ghế lái điều chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Ghế lái có nhớ vị trí"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Ghế phụ điều chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="DVD player"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Màn hình cảm ứng"
            >
              <Select placeholder="Chọn kích thước" />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Kết nối AUX, USB, bluetooth"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Số loa"
            >
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Lẫy chuyển số"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Phanh điện tử"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Giữ phanh tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Khởi động bằng nút bấm"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Ga tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Điều hòa tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Cửa gió hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Cửa sổ chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Gương chiếu hậu trung tâm chống chói tự động"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Màn hình hiển thị tốc độ HUD"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Rèm che nắng kính sau chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Rèm che nắng cửa sổ hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Tựa tay hàng ghế sau"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Tựa tay ghế sau tích hợp cổng USB"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Hàng ghế thứ hai gập theo tỉ lệ 60:40"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              name={["furniture", "electricallyAdjustableDriverSeat"]}
              label="Ghế lái điều chỉnh điện"
            >
              <Switch
                defaultChecked={false}
                checkedChildren="Có"
                unCheckedChildren="Không"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="An toàn" key="7">
            <SpecificationFormItem label="Số túi khí" name={["safe", ""]}>
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống chống bó cứng phanh ABS"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống phân bổ lực phanh điện tử EBD"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ lực phanh khẩn cấp EBA"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cảnh báo phanh khẩn cấp ESS"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cân bằng điện tử DSC"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống kiểm soát lực kéo chống trượt TCS"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống hỗ trợ khởi hành ngang dốc HLA"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Mã hóa chống sao chép chìa khóa"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo chống trộm"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem label="Camera lùi" name={["safe", ""]}>
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía sau"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảm biến cảnh báo va chạm phía trước"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Camera quan sát 360 độ"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo thắt dây an toàn"
              name={["safe", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
          </Collapse.Panel>
          <Collapse.Panel header="I-ACTIVSENSE" key="8">
            <SpecificationFormItem
              label="Hệ thống mở rộng góc chiếu đèn trước theo hướng đánh lái AFS"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống tự động điều chỉnh chế độ đèn chiếu xa HBC"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống đèn thích ứng thông minh ALH"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo phương tiện cắt ngang khi lùi RCTA"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Cảnh báo chệch làn LDW"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ giữ làn LAS"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh trong thành phố (phía trước)"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh trong thành phố (phía sau)"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hỗ trợ phanh thông minh SBS"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống điều khiển hành trình tích hợp radar MRCC"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống nhắc nhở người lái tập trung DAA"
              name={["i-activsense", ""]}
            >
              <Switch
                defaultChecked={false}
                unCheckedChildren="Không"
                checkedChildren="Có"
              />
            </SpecificationFormItem>
            <SpecificationFormItem
              label="Hệ thống cảnh báo điểm mù BSM"
              name={["i-activsense", ""]}
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
      name={["specifications", ...name]}
    >
      {children}
    </Form.Item>
  );
}
