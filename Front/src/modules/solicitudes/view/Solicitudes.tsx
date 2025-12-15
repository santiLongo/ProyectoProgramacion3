import { useEffect, useState } from "react";
import { CardView } from "../../../components/card-view/CardView";
import { getSolicitudes, respuesta } from "../services/solicitudes.service";
import type { GetSolicitudesResponse } from "../models/get-solicitudes.response";
import { Button, Divider } from "antd";
import dayjs from "dayjs";

export const Solicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] =
    useState<Array<GetSolicitudesResponse>>();
  async function fetchData() {
    const solicitudes = await getSolicitudes();
    setSolicitudes(solicitudes);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CardView title="Solicitudes a Emprendedor">
        {solicitudes?.map((solicitud) => (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <h3>{solicitud.nombre + " " + solicitud.apellido}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <p>
                  <strong>Fecha de Alta:</strong>{" "}
                  {dayjs(solicitud.fechaAlta).format("DD/MM/YYYY")}
                </p>
                <p>
                  <strong>Fecha de Solicitud:</strong>{" "}
                  {dayjs(solicitud.fechaSolicitud).format("DD/MM/YYYY")}
                </p>
                <p>
                  <strong>Cantidad de comentarios enviados:</strong>{" "}
                  {solicitud.comentarioEnviados}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <p>
                  <strong>DNI:</strong> {solicitud.dni}
                </p>
                <p>
                  <strong>Nacionalidad:</strong> {solicitud.nacionalidad}
                </p>
                <p>
                  <strong>Fecha Nacimiento:</strong>{" "}
                  {dayjs(solicitud.fechaNacimiento).format("DD/MM/YYYY")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <Button
                  variant="solid"
                  color="green"
                  style={{ marginTop: 20 }}
                  onClick={async () => {
                    await respuesta({ idSolcitud: solicitud.id, respuesta: true });
                    fetchData();
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  variant="solid"
                  color="red"
                  style={{ marginTop: 20 }}
                  onClick={async () => {
                    await respuesta({ idSolcitud: solicitud.id, respuesta: false });
                    fetchData();
                  }}
                >
                  Rechazar
                </Button>
              </div>
            </div>
            <Divider style={{ borderColor: "black" }}></Divider>
          </>
        ))}

        {solicitudes?.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <h1>No hay solicitudes, por el momento</h1>
            </div>
          </div>
        )}
      </CardView>
    </>
  );
};
