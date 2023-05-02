import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const Header = () => {
  const nav = useNavigate();
  return (
    <AntHeader>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        onSelect={({ key }) => nav(key)}
        items={[
          { key: "/", label: "Films", title: "Films" },
          { key: "/characters", label: "Characters", title: "Characters" },
        ]}
      />
    </AntHeader>
  );
};

export default Header;
