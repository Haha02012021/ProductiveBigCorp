import React from "react";
import { Drawer } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";

const DrawerCustom = ({ onClose, open, menuProps = {} }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickMenuOption = (selectedItem) => {
    let { keyPath } = selectedItem;
    keyPath.reverse();
    navigate("/" + menuProps.layout + "/" + keyPath.join("/"));
  };
  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={open}
      getContainer={false}
      height="100%"
      width={256}
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
        <label style={{ fontSize: 48, fontWeight: 900 }} className="logo">
          LOGO
        </label>
      </div>
      <Menu
        onClick={handleClickMenuOption}
        defaultSelectedKeys={[pathname.split("/").reverse()[0]]}
        defaultOpenKeys={[pathname.split("/").reverse()[1]]}
        mode="inline"
        items={menuProps.items}
      />
    </Drawer>
  );
};

export default DrawerCustom;
