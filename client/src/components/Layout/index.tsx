import React, { FC, PropsWithChildren } from "react";
import { Layout as AntL } from "antd";

import Header from "../Header";

const { Content, Footer } = AntL;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntL>
      <Header />
      <Content
        style={{
          padding: "25px",
          minHeight: "calc(100vh - 128px)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}> Alex Kostenko </Footer>
    </AntL>
  );
};

export default Layout;
