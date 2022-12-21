import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const SiderCustom = ({ menuProps = {} }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const handleClickMenuOption = (selectedItem) => {
    let { keyPath } = selectedItem;
    keyPath.reverse();
    navigate("/" + menuProps.layout + "/" + keyPath.join("/"));
  };
  return (
    <Sider
      style={{
        height: "calc(100vh - 64px)",
        top: 0,
        position: "sticky",
        left: 0,
        bottom: 0,
      }}
      width={256}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div
        style={{
          height: "64px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!collapsed ? (
          <label style={{ fontSize: 48, fontWeight: 900 }} className="logo">
            LOGO
          </label>
        ) : (
          <></>
        )}
      </div>
      <Menu
        onClick={handleClickMenuOption}
        style={{ height: "100%" }}
        defaultSelectedKeys={[pathname.split("/").reverse()[0]]}
        defaultOpenKeys={[pathname.split("/").reverse()[1]]}
        mode="inline"
        items={menuProps.items}
      />
      <button
        style={{
          position: "absolute",
          top: "100px",
          right: "-10px",
          width: 20,
          height: 20,
          backgroundColor: "#ccc",
          borderRadius: "50%",
          border: "1px solid #ccc",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </button>
    </Sider>
  );
};

export default SiderCustom;
