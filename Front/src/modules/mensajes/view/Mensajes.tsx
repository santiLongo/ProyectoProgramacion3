import { Layout } from "antd";
import { CardView } from "../../../components/card-view/CardView";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { use, useEffect, useState } from "react";
import { MensajesService } from "../services/mensajes.service";
import type { GetCanalesByIdCommand } from "../models/get-canales-by-id-command";
import { UserService } from "../../../services/user.service";
import type { GetCanalesByIdResponse } from "../models/get-canales-by-id-response";

export const Mensajes: React.FC = () => {
  const [canales, setCanales] = useState<Array<GetCanalesByIdResponse>>([]);
  const mensajesService = new MensajesService();

  const handleCanales = (canals: Array<GetCanalesByIdResponse>) => {
    setCanales(canals);
  };

  useEffect(() => {
    const command: GetCanalesByIdCommand = {
      id: UserService.userId(),
    };
    mensajesService.getCanals(command, (canals) => {
      setCanales(canals);
    });

    return () => {
      mensajesService.disconnect();
    };
  }, []);

  return (
    <CardView title="Mensajes">
      <div style={{ background: "transparent", borderRadius: 20 }}>
        <Layout style={{ background: "white" }}>
          <Sider
            style={{ background: "gray", maxWidth: 300, width: "100%" }}
            width={300}
          ></Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </div>
    </CardView>
  );
};
