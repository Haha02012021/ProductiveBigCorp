import { Avatar, Dropdown, Layout, Space } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import SiderCustom from "../Components/SiderCustom";
import DrawerCustom from "../Components/DrawerCustom";
import React, { useState, useEffect } from "react";

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

export default function AuthLayout({
  menuProps = {},
  children,
  user = {
    username: "username",
    avatar:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-hai-1.jpg?ssl=1",
  },
  pageHeaderProps = {},
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile ? <></> : <SiderCustom menuProps={menuProps} />}
      {isMobile ? (
        <DrawerCustom menuProps={menuProps} onClose={onClose} open={open} />
      ) : (
        <></>
      )}
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
            <p style={{ fontWeight: 500 }}>{user.username}</p>
            <Dropdown menu={{ items: dropdownMenu }} arrow placement="topRight">
              <Avatar size={40} src={user.avatar} icon={<UserOutlined />} />
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
          <Space direction="vertical" className="page-content" size={[0, 16]}>
            {children}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}
