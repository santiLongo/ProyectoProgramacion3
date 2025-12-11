import { Button, Col, Input, Layout, Row } from "antd";
import { CardView } from "../../../components/card-view/CardView";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { MensajesService } from "../services/mensajes.service";
import type { GetCanalesByIdCommand } from "../models/get-canales-by-id-command";
import { UserService } from "../../../services/user.service";
import type { GetCanalesByIdResponse } from "../models/get-canales-by-id-response";
import type { SendMessageCommand } from "../models/send-message-commnad";
import type { GetMensajesResponse } from "../models/get-mensajes-response";

export const Mensajes: React.FC = () => {
  const [mensajes, setMensajes] = useState<Array<GetMensajesResponse>>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const [canales, setCanales] = useState<Array<GetCanalesByIdResponse>>([]);
  const [canalSelected, setCanalSelected] =
    useState<GetCanalesByIdResponse | null>(null);
  const [mensajesService] = useState(() => new MensajesService());

  useEffect(() => {
    const command: GetCanalesByIdCommand = {
      id: UserService.userId(),
    };
    mensajesService.getCanals(command, (canals) => {
      setCanales(canals);
    });
    // mensajesService.onGetMensajes((mensajes) => {
    //   setMensajes(mensajes);
    // });
    mensajesService.onGetMensaje((mensajes) => {
      setMensajes((prev) => [...prev, mensajes]);
    });

    return () => {
      mensajesService.leaveChannel(canalSelected?.idCanal || "");
      mensajesService.disconnect();
    };
  }, []);

  return (
    <CardView title="Mensajes">
      <div style={{ background: "transparent", borderRadius: 20 }}>
        <Layout
          style={{
            background: "white",
            minHeight: "400px",
            maxHeight: "600px",
          }}
        >
          <Sider
            style={{
              background: "transparent",
              width: "100%",
              border: "1px solid black",
              overflow: "auto",
            }}
            width={300}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                padding: 10,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Canales
            </div>
            {canales.map((canal) => (
              <div
                key={canal.idCanal}
                onClick={async () => {
                  if (canalSelected?.idCanal !== canal.idCanal) {
                    mensajesService.leaveChannel(canalSelected?.idCanal || "");
                    setCanalSelected(canal);
                    await mensajesService.getMensajes(
                      { id: canal.idCanal },
                      (mensajes) => {
                        setMensajes(mensajes);
                      }
                    );
                    mensajesService.joinChannel(canal.idCanal);
                  }
                }}
                style={{
                  padding: 10,
                  borderBottom: "1px solid black",
                  cursor: "pointer",
                }}
              >
                <p>{canal.name}</p>
              </div>
            ))}
          </Sider>
          <Content
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                padding: 10,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {canalSelected
                ? `Canal: ${canalSelected?.name}`
                : "Selecciona un canal"}
            </div>
            {canalSelected ? (
              <div style={{ padding: 10, width: "100%", height: "90%" }}>
                <div
                  className="Mensajes"
                  style={{
                    height: "90%",
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: 10,
                  }}
                >
                  {mensajes.map((msg, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <strong>{msg.remitente}:</strong> {msg.texto}{" "}
                      <em style={{ fontSize: "0.8em", color: "gray" }}>
                        ({new Date(msg.fechaEnvio).toLocaleString()})
                      </em>
                    </div>
                  ))}
                </div>
                <div
                  className="Input"
                  style={{
                    padding: 10,
                    borderTop: "1px solid #ccc",
                    background: "white",
                  }}
                >
                  <Row style={{ padding: "10 10" }} gutter={10}>
                    <Col span={22}>
                      <Input
                        value={mensaje}
                        onChange={(value) => {
                          setMensaje(value.target.value);
                          console.log(mensaje);
                        }}
                      ></Input>
                    </Col>
                    <Col span={2}>
                      <Button
                        style={{ width: "100%" }}
                        color="blue"
                        type="primary"
                        onClick={() => {
                          const command: SendMessageCommand = {
                            canalId: canalSelected.idCanal,
                            fecha: new Date(),
                            remitenteId: UserService.userId(),
                            mensaje: mensaje,
                          };
                          mensajesService.sendMessage(command);
                          setMensaje("");
                        }}
                      >
                        Enviar
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: 10,
                  width: "100%",
                  height: "90%",
                  justifyContent: "start",
                  alignItems: "end",
                  display: "flex",
                }}
              >
                <p>Por favor, selecciona un canal para ver los mensajes.</p>
              </div>
            )}
          </Content>
        </Layout>
      </div>
    </CardView>
  );
};
