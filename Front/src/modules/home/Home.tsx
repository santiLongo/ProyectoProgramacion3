import React from "react";
import {
  Layout,
} from "antd";
import { Content } from "antd/es/layout/layout";
import "./home.css";
import HeaderComponent from "../../components/Header/Header";



const Home: React.FC = () => {
  const soyEmprendedor = false;

  return (
    <>
      <Layout style={{ height: " 100vh " }}>
        <HeaderComponent></HeaderComponent>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              marginTop: 30,
              padding: 24,
              height: "100%",
              maxHeight: 600,
              background: "var(--text-color)",
              borderRadius: "var(--secundary-color)",
            }}
          >
            Content
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Home;
