import { Button, Col, Form, Image, Input, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/toppng.com-car-front-vector-png-clipart-library-clip-art-library-car-clipart-png-transparent-1979x1054.png";

export default function Login() {
  const handleLogin = () => {};
  return (
    <Row gutter={[2, 24]} className="login">
      <Col span={13} className="left-side">
        <Form
          labelCol={{ xs: 10, sm: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          style={{ width: "64%" }}
          onFinish={handleLogin}
        >
          <Space direction="vertical" style={{ width: "100%" }} size={[0, 24]}>
            <Typography.Title
              style={{ display: "flex", justifyContent: "center" }}
              level={2}
            >
              Đăng nhập
            </Typography.Title>
            <Space direction="vertical" style={{ width: "100%" }} size={[0, 0]}>
              <Form.Item
                label="Tên tài khoản"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên tài khoản!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên tài khoản" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Space>
            <Space direction="vertical" style={{ width: "100%" }} size={[0, 2]}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  Chưa có tài khoản? <Link>Đăng ký!</Link>
                </span>
                <Link>Quên mật khẩu?</Link>
              </div>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Space>
          </Space>
        </Form>
      </Col>
      <Col span={11} className="right-side">
        <Space direction="vertical">
          <p
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
            }}
          >
            LOGO
          </p>
          <Image src={loginImg} style={{ height: 244 }} />
        </Space>
      </Col>
    </Row>
  );
}
