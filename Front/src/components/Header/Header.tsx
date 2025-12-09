import React from "react";
import {
  AntDesignOutlined,
  AppstoreOutlined,
  HolderOutlined,
  PushpinOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { type MenuProps, Menu, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { logOutService } from "./services/header.service";
import { UserService } from "../../services/user.service";

type MenuItem = Required<MenuProps>["items"][number];

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const itemsEmpresa = (): MenuItem[] => {
    return [
      {
        key: "1",
        icon: <AppstoreOutlined />,
        label: "Inicio",
        onClick: () => {
          navigate("/");
        },
      },
      {
        key: "2",
        icon: <PushpinOutlined />,
        label: "Mis Publicaciones",
        onClick: () => {
          navigate("/gestion-publicaciones");
        },
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: "Mi Perfil",
        onClick: () => {
          navigate(`/mi-perfil/${UserService.role()}/${UserService.userId()}`);
        },
      },
      {
        key: "4",
        icon: <UserDeleteOutlined />,
        label: "Salir",
        onClick: () => {
          logOutService();
        },
      },
    ];
  };

  const itemsEmprendedor = (): MenuItem[] => {
    return [
      {
        key: "1",
        icon: <AppstoreOutlined />,
        label: "Inicio",
        onClick: () => {
          navigate("/");
        },
      },
      {
        key: "2",
        icon: <PushpinOutlined />,
        label: "Mis Propuestas",
        onClick: () => {
          // navigate("/gestion-publicaciones");
        },
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: "Mi Perfil",
        onClick: () => {
          navigate("/mi-perfil");
        },
      },
      {
        key: "4",
        icon: <UserDeleteOutlined />,
        label: "Salir",
        onClick: () => {
          logOutService();
        },
      },
    ];
  };

  const items =
    JSON.parse(localStorage.getItem("user") ?? "").role === "empresa"
      ? itemsEmpresa()
      : itemsEmprendedor();

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
            onClick={() => (window.location.href = "/")}
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
