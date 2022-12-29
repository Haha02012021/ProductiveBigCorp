import {
  Button,
  Col,
  Form,
  Image,
  Input,
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
import { toast } from "react-toastify";
import { ThemeContext } from "../../../Provider/ThemeProvider";

export default function Login() {
  const { isMobile } = useContext(ThemeContext);
  const { authUser, setAuthUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      navigate(-1);
    }
  }, [authUser, navigate]);

  const handleLogin = async (values) => {
    setError("");
    try {
      setLoading(true);
      const data = await authApi.login(values);

      setLoading(false);
      if (data?.user) {
        toast.success("Đăng nhập thành công!", 2);
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
              navigate("/maintainer/maintain-products", { replace: true });
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
        setError(data?.message);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Tên tài khoản hoặc mật khẩu không đúng");
      toast.error(error.message, 2);
    }
  };
  return (
    <Spin spinning={loading}>
      <Row gutter={[2, 24]} className="login">
        {isMobile ? (
          <Col span={24} className="right-side">
            <Space direction="vertical">
              <p
                style={{
                  fontSize: 60,
                  fontWeight: 800,
                  color: "white",
                  textAlign: "center",
                }}
              >
                LOGO
              </p>
            </Space>
          </Col>
        ) : (
          <></>
        )}
        <Col md={13} xs={24} className="left-side">
          <Form
            labelCol={{ xs: 10, sm: isMobile ? 24 : 6 }}
            labelAlign="left"
            wrapperCol={{ span: isMobile ? 24 : 18 }}
            style={{ width: "64%", display: "flex", justifyContent: "center" }}
            onFinish={handleLogin}
            layout={isMobile ? "vertical" : "horizontal"}
          >
            <Space
              direction="vertical"
              style={{ width: isMobile ? "92%" : "100%" }}
              size={[0, 24]}
            >
              <Typography.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
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
                  style={{ margin: 0 }}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Row style={{ color: "red" }}>{error}</Row>
              </Space>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size={[0, 1]}
              >
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Col sx={24} md={12}>
                    Chưa có tài khoản? <Link>Đăng ký!</Link>
                  </Col>
                  <Col
                    sx={24}
                    md={12}
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <Link>Quên mật khẩu?</Link>
                  </Col>
                </Row>
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
        <Col md={11} xs={24} className="right-side">
          <Space direction="vertical">
            {!isMobile ? (
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
            ) : (
              <></>
            )}
            <Image src={loginImg} style={{ height: "60%" }} />
          </Space>
        </Col>
      </Row>
    </Spin>
  );
}
