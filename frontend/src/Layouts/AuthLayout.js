import { Avatar, Dropdown, Layout, Space, Spin } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Drawer from "../Components/Drawer";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { getLocaStorageItem } from "../const";

const { Header, Content } = Layout;

const dropdownMenu = [
  {
    label: "Thông tin chi tiết",
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: "Đăng xuất",
    key: "signout",
    icon: <LogoutOutlined />,
  },
];

export default function AuthLayout({ menuProps = {}, children }) {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  useEffect(() => {
    const localAccessToken = JSON.parse(localStorage.getItem("accessToken"));
    const now = new Date();
    if (localAccessToken && localAccessToken.expiry < now) {
      localStorage.removeItem("accessToken");
      setAuthUser(null);
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <Spin size="large" spinning={!authUser}>
      <Layout hasSider={true} style={{ minHeight: "100vh" }}>
        <Drawer menuProps={menuProps} />
        {authUser && (
          <Layout>
            <Header className="custom-header">
              <Space className="user" size={[8, 0]}>
                <p style={{ fontWeight: 500 }}>{authUser.name}</p>
                <Dropdown
                  menu={{ items: dropdownMenu }}
                  arrow
                  placement="topRight"
                >
                  <Avatar
                    size={40}
                    src={authUser.avatar}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </Space>
            </Header>
            <Content
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Space
                direction="vertical"
                className="page-content"
                size={[0, 16]}
              >
                {children}
              </Space>
            </Content>
          </Layout>
        )}
      </Layout>
    </Spin>
  );
}
