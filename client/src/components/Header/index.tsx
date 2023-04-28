import { Menu } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  return (
    <AntHeader>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" onSelect={({ key }) => nav(key)}>
        <Menu.Item key="/">Films</Menu.Item>
        <Menu.Item key="/characters">Characters</Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;