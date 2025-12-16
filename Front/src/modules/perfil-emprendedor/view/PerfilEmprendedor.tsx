import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { PerfilEmprendedorProps } from "../models/emprendedor/perfil-emprendedor-props";
import { Button, Form, Modal, Image, Divider } from "antd";
import type { GetPerfilEmprendedorResponse } from "../models/emprendedor/get-perfil-emprendedor-response";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../components/basic-form/BasicFom";
import dayjs from "dayjs";
import {
  enviarSolicitud,
  getEmprendedor,
  updateEmprendedor,
  updatePropuesta,
} from "../services/perfil-emprendedor.service";
import { CardView } from "../../../components/card-view/CardView";
import { AlertService } from "../../../services/alert.service";
import profileImg from "../../../assets/profile-img.jpg";
import { EditOutlined } from "@ant-design/icons";
import type { UpdatePerfilEmprendedorCommand } from "../models/emprendedor/update-perfil-emprendedor";
import type { UpdatePropuestaCommand } from "../models/emprendedor/update-propuesta-commnand";
import type { SolicitudEmprendedorCommand } from "../models/emprendedor/solicitud-emprendedor-command";

export const PerfilEmprendedor: React.FC<PerfilEmprendedorProps> = ({
  isEditable,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [editPropeusta, setEditPropuesta] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [openSolicitud, setOpenSolicitud] = useState<boolean>(false);
  const [user, setUser] = useState<GetPerfilEmprendedorResponse>();
  const [form] = Form.useForm();

  const salirModal = () => {
    setOpen(false);
    setEditPropuesta(false);
    setOpenSolicitud(false);
    form.resetFields();
    fetchData();
  };

  const fetchData = async () => {
    const data = await getEmprendedor({ id: params.id! });
    setUser(data);
    return;
  };

  useEffect(() => {
    fetchData();
    console.log(isEditable);
  }, []);

  const config: BasicFormConfig[] = [
    {
      label: "Nombre",
      formControlName: "nombre",
      type: "form-field",
      col: 12,
      row: 1,
      readonly: true,
      required: true,
    },
    {
      label: "Apellido",
      formControlName: "apellido",
      type: "form-field",
      col: 12,
      row: 1,
      readonly: true,
      required: true,
    },
    {
      label: "Email de Contacto",
      formControlName: "email",
      type: "form-field",
      col: 12,
      row: 2,
      readonly: !edit,
      required: true,
    },
    {
      label: "DNI",
      formControlName: "dni",
      type: "form-field",
      col: 12,
      row: 2,
      readonly: true,
      required: true,
    },
    {
      label: "Fecha de Nacimiento",
      formControlName: "fechaNacimiento",
      type: "form-date",
      col: 12,
      row: 3,
      readonly: true,
      required: true,
    },
    {
      label: "Pais",
      formControlName: "pais",
      type: "form-field",
      col: 12,
      row: 3,
      readonly: true,
      required: true,
    },
  ];

  const configPropuesta: BasicFormConfig[] = [
    {
      label: "Descripcion",
      formControlName: "descripcion",
      type: "textarea",
      col: 24,
      row: 1,
    },
    {
      label: "Presupuesto",
      formControlName: "presupuesto",
      type: "form-number",
      col: 24,
      row: 2,
    },
    {
      label: "id",
      formControlName: "id",
      type: "form-field",
      col: 24,
      row: 3,
      hidden: true,
    },
  ];

  const configSolicitud: BasicFormConfig[] = [
    {
      label: "Nombre",
      formControlName: "nombre",
      type: "form-field",
      col: 12,
      row: 1,
      required: true,
    },
    {
      label: "Apellido",
      formControlName: "apellido",
      type: "form-field",
      col: 12,
      row: 1,
      required: true,
    },
    {
      label: "DNI",
      formControlName: "dni",
      type: "form-field",
      col: 12,
      row: 2,
      required: true,
    },
    {
      label: "Fecha de Nacimiento",
      formControlName: "fechaNacimiento",
      type: "form-date",
      col: 12,
      row: 2,
      required: true,
    },
    {
      label: "Pais",
      formControlName: "nacionalidad",
      type: "form-field",
      col: 24,
      row: 3,
      required: true,
    },
  ];

  return (
    <>
      <CardView title="">
        <div
          style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            width={200}
            alt="perfil"
            src={profileImg}
            style={{ borderRadius: 100 }}
            preview={false}
          />
          {user?.role === "emprendedor" ? (
            <h1>{`${user?.nombre} ${user?.apellido}`}</h1>
          ) : (
            <h1>{`${user?.userName}`}</h1>
          )}
          <div style={{ padding: 10 }}>
            {user?.role === "emprendedor" ? (
              <>
                <Button
                  type="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    setEdit(false);
                    form.setFieldsValue({
                      nombre: user?.nombre,
                      apellido: user?.apellido,
                      email: user?.email,
                      dni: user?.dni,
                      pais: user?.pais,
                      fechaNacimiento: dayjs(user?.fechaNacimiento),
                    });
                    setOpen(true);
                  }}
                >
                  Más Datos
                </Button>

                {isEditable && (
                  <EditOutlined
                    style={{
                      cursor: "pointer",
                      marginLeft: 10,
                      fontSize: 20,
                    }}
                    onClick={() => {
                      setEdit(true);
                      form.setFieldsValue({
                        nombre: user?.nombre,
                        apellido: user?.apellido,
                        email: user?.email,
                        dni: user?.dni,
                        pais: user?.pais,
                        fechaNacimiento: dayjs(user?.fechaNacimiento),
                      });
                      setOpen(true);
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {isEditable && user?.solicito && (
                  <Button
                    type="primary"
                    style={{ marginTop: 20 }}
                    onClick={() => {
                      setOpenSolicitud(true);
                    }}
                  >
                    Solicitar ser Emprendedor
                  </Button>
                )}
                {isEditable && !user?.solicito && (
                  <h3 style={{ color: "green" }}>Solicitud Enviada</h3>
                )}
              </>
            )}
          </div>
          <div
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>

        {user?.role === "emprendedor" && (
          <>
            <Divider orientation="start">Datos Adicionales</Divider>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
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
                <strong>Propuestas Enviadas: </strong>
                <p>{user.datosAdicionales?.propuestasEnviadas}</p>
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
                <strong>Propuestas Aceptadas: </strong>
                <p>{user.datosAdicionales?.propuestasAceptadas}</p>
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
                <strong>Propuestas Rechazadas: </strong>
                <p>{user.datosAdicionales?.propuestasRechazadas}</p>
              </div>
            </div>

            <Divider orientation="start">Propuestas</Divider>

            {user.propuestsas?.map((propuesta) => (
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
                    <h3>{propuesta.titulo}</h3>
                    <p>-</p>
                    <h3
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/publicacion/${propuesta.publicacionId}`)
                      }
                    >
                      {propuesta.publicacion}
                    </h3>
                    <p>-</p>
                    <p>{dayjs(propuesta.fecha).format("DD/MM/YYYY")}</p>
                    {isEditable && propuesta.estado === "Pendiente" && (
                      <EditOutlined
                        style={{
                          cursor: "pointer",
                          marginLeft: "auto",
                          fontSize: 20,
                        }}
                        onClick={() => {
                          form.setFieldsValue({
                            id: propuesta.id,
                            descripcion: propuesta.descripcion,
                            presupuesto: propuesta.presupuesto,
                          });
                          setEditPropuesta(true);
                        }}
                      />
                    )}
                  </div>
                  <p>{propuesta.descripcion}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "24px",
                    }}
                  >
                    {isEditable && (
                      <p>
                        <strong>Presupuesto:</strong> ${propuesta.presupuesto}
                      </p>
                    )}
                    <p>
                      <strong>Estado:</strong> {propuesta.estado}
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
                      <strong>Votos:</strong> {propuesta.votos!}
                    </p>
                    <p>
                      <strong>Promedio de votos:</strong>{" "}
                      {propuesta.promedioVotos!}
                    </p>
                  </div>
                </div>
                <Divider style={{ borderColor: "black" }}></Divider>
              </>
            ))}
          </>
        )}
      </CardView>

      <Modal
        destroyOnHidden={true}
        open={open}
        onOk={async () => {
          if (!edit) {
            salirModal();
            return;
          }
          try {
            await form.validateFields();
            const command: UpdatePerfilEmprendedorCommand = {
              email: form.getFieldValue("email"),
            };
            await updateEmprendedor(command);
            salirModal();
            AlertService.success({
              title: "Perfil actualizado",
              descripcion: "El perfil se ha actualizado correctamente",
            });
            return;
          } catch (e) {
            AlertService.error({
              title: "Error",
              descripcion:
                e?.message ?? "Ocurrió un error al actualizar el perfil",
            });
            return;
          }
        }}
        onCancel={() => salirModal()}
        title={user?.userName}
      >
        <BasicForm config={config} form={form}></BasicForm>
      </Modal>

      <Modal
        destroyOnHidden={true}
        open={editPropeusta}
        onOk={async () => {
          try {
            await form.validateFields();
            const command: UpdatePropuestaCommand = {
              id: form.getFieldValue("id"),
              descripcion: form.getFieldValue("descripcion"),
              presupuesto: form.getFieldValue("presupuesto"),
            };
            await updatePropuesta(command);
            salirModal();
            AlertService.success({
              title: "Propuesta actualizada",
              descripcion: "La propuesta se ha actualizado correctamente",
            });
            return;
          } catch (e) {
            AlertService.error({
              title: "Error",
              descripcion:
                e?.message ?? "Ocurrió un error al actualizar la propuesta",
            });
            return;
          }
        }}
        onCancel={() => salirModal()}
        title={user?.userName}
      >
        <BasicForm config={configPropuesta} form={form}></BasicForm>
      </Modal>

      <Modal
        destroyOnHidden={true}
        open={openSolicitud}
        onOk={async () => {
          try {
            await form.validateFields();
            const command: SolicitudEmprendedorCommand = {
              nombre: form.getFieldValue("nombre"),
              apellido: form.getFieldValue("apellido"),
              dni: form.getFieldValue("dni"),
              fechaNacimiento: form.getFieldValue("fechaNacimiento"),
              nacionalidad: form.getFieldValue("nacionalidad"),
            };
            await enviarSolicitud(command);
            salirModal();
            AlertService.success({
              title: "Solicitud Enviada",
              descripcion: "La solicitud se ha enviado correctamente",
            });
            return;
          } catch (e) {
            AlertService.error({
              title: "Error",
              descripcion:
                e?.message ?? "Ocurrió un error al enviar la solicitud",
            });
            return;
          }
        }}
        onCancel={() => salirModal()}
        title={user?.userName}
      >
        <BasicForm config={configSolicitud} form={form}></BasicForm>
      </Modal>
    </>
  );
};
