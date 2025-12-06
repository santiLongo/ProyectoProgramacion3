import { useEffect, useState } from "react";
import { CardView } from "../../../components/card-view/CardView";
import { useParams } from "react-router-dom";
import {
  comentarPropuesta,
  comentarPublicacion,
  getPublicacion,
  votarPropuesta,
} from "../services/ver-publicacion-http.service";
import type { GetPublicacionResponse } from "../models/get-publicacion-response";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Flex,
  Input,
  Rate,
  Row,
  Tabs,
  Tag,
  type CollapseProps,
  type TabsProps,
} from "antd";
import { TagsOutlined, UserOutlined } from "@ant-design/icons";

export const VerPublicacion: React.FC = () => {
  const [publi, setPubli] = useState<GetPublicacionResponse>();
  const [comentario, setComentario] = useState<string>("");
  const [comentar, setComentar] = useState<boolean>(false);
  const [comentarioPropuesta, setComentarioPropuesta] = useState<string>("");
  const [comentPropuesta, setComentPropuesta] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  async function fechData() {
    const data = await getPublicacion({ id: id! });
    setPubli(data);
  }

  useEffect(() => {
    fechData();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Comentarios",
      children: (
        <>
          {publi?.comentarios.map((comentario) => (
            <>
              <Row style={{ marginTop: 10 }}>
                <Col
                  span={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserOutlined
                    style={{
                      fontSize: 20,
                      color: "#000",
                      border: "2px solid #000",
                      borderRadius: 100,
                    }}
                  />
                  <p style={{ margin: 0 }}>{comentario.usuario}</p>
                  <p style={{ margin: 0 }}>
                    {new Date(comentario.fecha).toLocaleDateString("es-AR")}{" "}
                    {new Date(comentario.fecha).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Col>
                <p style={{ marginLeft: 10 }}>{comentario.comentario}</p>
              </Row>
              <Divider style={{ borderColor: "gray" }} />
            </>
          ))}
        </>
      ),
    },
    {
      key: "2",
      label: "Propuestas",
      children: (
        <>
          {publi?.propuestas.map((propuesta) => {
            const itemsCollapse: CollapseProps["items"] = [
              {
                key: "1",
                label: "Comentarios de la Propuesta",
                children: (
                  <>
                    {propuesta.comentarios.map((comentario) => (
                      <>
                        <Row style={{ marginTop: 10 }}>
                          <Col
                            span={4}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <UserOutlined
                              style={{
                                fontSize: 20,
                                color: "#000",
                                border: "2px solid #000",
                                borderRadius: 100,
                              }}
                            />
                            <p style={{ margin: 0 }}>{comentario.usuario}</p>
                            <p style={{ margin: 0 }}>
                              {new Date(comentario.fecha).toLocaleDateString(
                                "es-AR"
                              )}{" "}
                              {new Date(comentario.fecha).toLocaleTimeString(
                                "es-AR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </Col>
                          <p style={{ marginLeft: 10 }}>
                            {comentario.comentario}
                          </p>
                        </Row>
                        <Divider style={{ borderColor: "gray" }} />
                      </>
                    ))}
                  </>
                ),
              },
            ];

            return (
              <>
                <div
                  style={{
                    marginTop: 10,
                    border:
                      "1px solid " + propuesta.estado == "Rechazada"
                        ? "red"
                        : "black",
                    borderRadius: 10,
                  }}
                >
                  <Row style={{ margin: 5 }}>
                    <Col
                      span={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UserOutlined
                        style={{
                          fontSize: 20,
                          color: "#000",
                          border: "2px solid #000",
                          borderRadius: 100,
                        }}
                      />
                      <p style={{ margin: 0 }}>{propuesta.emprendedor}</p>
                    </Col>
                    <Col
                      span={20}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Row style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <h3>{propuesta.titulo}</h3>
                          <p style={{ marginLeft: 20 }}>
                            {new Date(propuesta.fecha).toLocaleDateString(
                              "es-AR"
                            )}{" "}
                            {new Date(propuesta.fecha).toLocaleTimeString(
                              "es-AR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </Row>
                      <p>{propuesta.descripcion}</p>
                      <Rate
                        value={propuesta.promedioVotos}
                        disabled={propuesta.puedoVotar ? false : true}
                        onChange={async (value) => {
                          await votarPropuesta({propuesta: propuesta.id, voto: value});
                          fechData();
                        }}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <div style={{ marginTop: 10, marginBottom: 10 }}>
                    {!comentPropuesta && (
                      <Button
                        variant="solid"
                        color="blue"
                        onClick={() => setComentPropuesta(true)}
                      >
                        Comentar
                      </Button>
                    )}

                    {comentPropuesta && (
                      <Button
                        variant="solid"
                        color="red"
                        onClick={() => {
                          setComentarioPropuesta("");
                          setComentPropuesta(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                  {comentPropuesta && (
                    <>
                      <Input.TextArea
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={(value) =>
                          setComentarioPropuesta(value.target.value)
                        }
                      />
                      <Button
                        style={{ marginTop: 10 }}
                        variant="solid"
                        color="blue"
                        onClick={() => {
                          comentarPropuesta({
                            comentario: comentarioPropuesta,
                            idPropuesta: propuesta.id!,
                          });
                          setComentPropuesta(false);
                          setComentarioPropuesta("");
                          fechData();
                        }}
                      >
                        Enviar Comentario
                      </Button>
                    </>
                  )}
                  <Divider />
                  <Collapse
                    expandIconPosition="end"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid transparent",
                    }}
                    items={itemsCollapse}
                  ></Collapse>
                </div>
                <Divider style={{ borderColor: "gray" }} />
              </>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <CardView title={publi?.publicacion.titulo ?? ""}>
        <div style={{ height: "auto" }}>
          <div style={{ height: "auto", margin: 10 }}>
            <p>{publi?.publicacion.descripcion}</p>
          </div>

          <Row>
            <TagsOutlined />
            <Flex style={{ margin: 10 }} gap="small" align="center" wrap>
              {publi?.publicacion.tags.split(" ").map((tag) => (
                <Tag key={tag} color={"blue"}>
                  {tag}
                </Tag>
              ))}
            </Flex>
          </Row>
        </div>
        <Divider />
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          {!comentar && (
            <Button
              variant="solid"
              color="blue"
              onClick={() => setComentar(true)}
            >
              Comentar
            </Button>
          )}

          {comentar && (
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                setComentario("");
                setComentar(false);
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
        {comentar && (
          <>
            <Input.TextArea
              style={{ width: "100%" }}
              autoComplete="off"
              onChange={(value) => setComentario(value.target.value)}
            />
            <Button
              style={{ marginTop: 10 }}
              variant="solid"
              color="blue"
              onClick={() => {
                comentarPublicacion({
                  comentario: comentario,
                  idPublicacion: id!,
                });
                setComentar(false);
                setComentario("");
                fechData();
              }}
            >
              Enviar Comentario
            </Button>
          </>
        )}
        <Divider />
        <Tabs defaultActiveKey="1" items={items} centered={true} />
      </CardView>
    </>
  );
};
