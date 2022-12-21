import { Avatar, Dropdown, Layout, Space, Spin } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import SiderCustom from "../Components/SiderCustom";
import DrawerCustom from "../Components/DrawerCustom";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

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
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localAccessToken = JSON.parse(localStorage.getItem("accessToken"));
    const now = new Date();
    if (!localAccessToken || localAccessToken?.expiry < now) {
      localStorage.removeItem("accessToken");
      setAuthUser(null);
      navigate("/login");
    }
  }, [authUser, navigate]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.screen.width <= 1000 ? setIsMobile(true) : setIsMobile(false);
  }, [window.screen.width]);

  function detectWindowSize() {
    window.innerWidth <= 1000 ? setIsMobile(true) : setIsMobile(false);
  }
  window.onresize = detectWindowSize;

  const handleDropdown = () => {};

  return (
    <Spin size="large" spinning={!authUser}>
      <Layout hasSider={true} style={{ minHeight: "100vh" }}>
        {isMobile ? <></> : <SiderCustom menuProps={menuProps} />}
        {isMobile ? (
          <DrawerCustom menuProps={menuProps} onClose={onClose} open={open} />
        ) : (
          <></>
        )}
        {authUser && (
          <Layout>
            <Header className="custom-header">
              {isMobile ? (
                <MenuOutlined
                  onClick={() => showDrawer()}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <></>
              )}
              <Space className="user" size={[8, 0]}>
                <p style={{ fontWeight: 500 }}>{authUser.name}</p>
                <Dropdown
                  menu={{ items: dropdownMenu }}
                  arrow
                  placement="topRight"
                  onClick={handleDropdown}
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
