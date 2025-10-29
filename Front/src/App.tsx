import Layout, { Content } from "antd/es/layout/layout"
import AppRoutes from "./routes/AppRoutes"
import HeaderComponent from "./components/Header/Header"
import "./App.css"

function App () {
  return (
    <>
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <HeaderComponent></HeaderComponent>
        <Content style={{ padding: "0 48px", flex: 1 }}>
            <AppRoutes></AppRoutes>
        </Content>
      </Layout>
    </>
  )
}

export default App