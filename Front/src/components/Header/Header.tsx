import React from "react";
import {
  AntDesignOutlined,
  AppstoreOutlined,
  CommentOutlined,
  HolderOutlined,
  PushpinOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { type MenuProps, Menu, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <AppstoreOutlined />, label: "Inicio", onClick: () => { window.location.href = "/"; } },
  { key: "2", icon: <CommentOutlined />, label: "Mensajes" },
  { key: "3", icon: <PushpinOutlined />, label: "Mis Publicaciones", onClick: () => { window.location.href = "/gestion-propuestas"; } },
  { key: "4", icon: <SettingOutlined />, label: "Ajustes" },
  { key: "5", icon: <UserOutlined />, label: "Mi Perfil" },
];

const HeaderComponent: React.FC = () => {
  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          maxHeight: 150,
          display: "flex",
          alignItems: "center",
          background: "var(--primary-color)",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0, background: "transparent" }}
          expandIcon={<HolderOutlined />}
        />
        <div
          className="navbar-right"
          style={{
            justifyContent: "flex-end",
            marginRight: 20,
            cursor: "pointer",
          }}
        >
          <Avatar
            onClick={() => window.location.href = "/"}
            size="large"
            src="https://api.dicebear.com/8.x/adventurer/svg?seed=RoboDev"
            icon={<AntDesignOutlined />}
          />
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
