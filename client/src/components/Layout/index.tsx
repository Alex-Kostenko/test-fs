import React, { FC, PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout as AntL } from "antd";

import Header from "../Header";
import { PathsEnum } from "../../utils/enums";

const { Content, Footer } = AntL;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const nav = useNavigate();
  const location = useLocation();
  const isRoot =
    location.pathname === PathsEnum.home ||
    location.pathname === PathsEnum.characters;

  return (
    <AntL>
      <Header />
      <Content
        style={{
          padding: "25px",
          minHeight: "calc(100vh - 128px)",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div>
          {!isRoot && (
            <div
              style={{ textAlign: "left", cursor: "pointer" }}
              onClick={() => nav(-1)}
            >
              Go Back
            </div>
          )}
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}> Alex Kostenko </Footer>
    </AntL>
  );
};

export default Layout;
