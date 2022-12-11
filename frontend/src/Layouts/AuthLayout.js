import { Avatar, Dropdown, Layout, Space, Tabs } from "antd";
import Search from "antd/es/input/Search";
import PageHeader from "../Components/PageHeader";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Drawer from "../Components/Drawer";

const { Header, Sider, Content } = Layout;

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
  pageTabs = [],
  searchPlaceholder = "Nhập vào đây",
  user = {
    username: "username",
    avatar:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-hai-1.jpg?ssl=1",
  },
  pageHeaderProps = {},
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Drawer menuProps={menuProps} />
      <Layout>
        <Header className="custom-header">
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
            <Space direction="vertical" style={{ width: "100%" }}>
              <PageHeader
                title={pageHeaderProps.title}
                hasAction={pageHeaderProps.hasAction}
                onAdd={pageHeaderProps.onAdd}
              />
              {pageTabs && (
                <Tabs
                  items={pageTabs.map((tab) => {
                    return { key: tab, label: tab };
                  })}
                  tabBarStyle={{ marginBottom: 0 }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "right" }}>
                <Search
                  placeholder={searchPlaceholder}
                  style={{ width: "36%" }}
                />
              </div>
            </Space>
            {children}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}
