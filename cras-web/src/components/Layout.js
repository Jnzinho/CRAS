import Header from "./Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;