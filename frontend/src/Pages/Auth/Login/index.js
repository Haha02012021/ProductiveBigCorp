import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ttl } from "../../../const";
import loginImg from "../../../assets/toppng.com-car-front-vector-png-clipart-library-clip-art-library-car-clipart-png-transparent-1979x1054.png";
import { AuthContext } from "../../../Provider/AuthProvider";
import authApi from "../../../apis/auth";

export default function Login() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      navigate(-1);
    }
  }, [authUser, navigate]);
  const handleLogin = async (values) => {
    setLoading(true);
    const data = await authApi.login(values);

    setLoading(false);
    if (data?.user) {
      message.success("Đăng nhập thành công!", 2);
      const now = new Date();
      const item = { value: data.accessToken, expiry: now.getTime() + ttl };
      localStorage.setItem("accessToken", JSON.stringify(item));
      setTimeout(() => {
        setAuthUser(data.user);
        switch (data.user.role) {
          case "1":
            navigate("/executive-board/product-line/lines-manage", {
              replace: true,
            });
            break;
          case "2":
            navigate("/factory/product-lot", { replace: true });
            break;
          case "3":
            navigate("/maintainer/", { replace: true });
            break;
          case "4":
            navigate("/store/store-product", { replace: true });
            break;
          default:
            break;
        }
      }, 2000);
    } else {
      console.log(data);
      message.error(data?.message, 2);
    }
  };
  return (
    <Spin spinning={loading}>
      <Row gutter={[2, 24]} className="login">
        <Col span={13} className="left-side">
          <Form
            labelCol={{ xs: 10, sm: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 18 }}
            style={{ width: "64%" }}
            onFinish={handleLogin}
          >
            <Space
              direction="vertical"
              style={{ width: "100%" }}
              size={[0, 24]}
            >
              <Typography.Title
                style={{ display: "flex", justifyContent: "center" }}
                level={2}
              >
                Đăng nhập
              </Typography.Title>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size={[0, 0]}
              >
                <Form.Item
                  label="Tên tài khoản"
                  name="account"
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
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size={[0, 2]}
              >
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
    </Spin>
  );
}
