import React from "react";
import Sidebar from "./Sidebar";
import "./common.css";

const Layout = ({ children }) => {
  return (
    <section className="dashboard-admin">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </section>
  );
};

export default Layout;
