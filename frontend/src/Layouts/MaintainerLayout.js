import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Fobbiden from "../Pages/ErrorPage/Fobbidden";
import { AuthContext } from "../Provider/AuthProvider";
import AuthLayout from "./AuthLayout";

export default function MaintainerLayout({ pageHeaderProps }) {
  const { authUser } = useContext(AuthContext);
  const menuItems = [];
  if (authUser && authUser.role !== "2") {
    return <Fobbiden />;
  }
  return (
    <AuthLayout
      menuProps={{
        items: menuItems,
        layout: "maintainer",
      }}
      pageHeaderProps={pageHeaderProps}
    >
      <Outlet />
    </AuthLayout>
  );
}
