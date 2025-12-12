import type React from "react";
import { CardView } from "../../../components/card-view/CardView";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmpresa, updateEmpresa } from "../services/perfil.service";
import type { GetPerfilEmpresaResponse } from "../models/empresa/get-perfil-empresa-response";
import {
  Button,
  Divider,
  Flex,
  Form,
  Image,
  Modal,
  Row,
  Tag,
} from "antd";
import empresaImg from "../../../assets/empresa-img.png";
import { EditOutlined } from "@ant-design/icons";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../components/basic-form/BasicFom";
import dayjs from "dayjs";
import type { UpdatePerfilEmpresaCommand } from "../models/empresa/update-perfil-empresa.command";
import { AlertService } from "../../../services/alert.service";
import { UserService } from "../../../services/user.service";

export interface MiPerfilProps {
  isEditable: boolean;
}

export const MiPerfil: React.FC<MiPerfilProps> = ({ isEditable }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [empresa, setEmpresa] = useState<GetPerfilEmpresaResponse>();
  const [form] = Form.useForm();
  const salirModal = () => {
    setOpen(false);
    form.resetFields();
    fetchData();
  };
  const fetchData = async () => {
    const data = await getEmpresa({ id: params.id! });
      setEmpresa(data);
      return;
  };

  useEffect(() => {
    fetchData();
    console.log(isEditable);
  }, []);

  const configEmpresa: BasicFormConfig[] = [
    {
      label: "Nombre",
      formControlName: "nombre",
      type: "form-field",
      col: 24,
      row: 1,
      readonly: !edit,
      hidden: !edit,
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
      label: "Sector",
      formControlName: "sector",
      type: "combo",
      comboType: "SectorEmpresaV1",
      col: 12,
      row: 2,
      readonly: !edit,
      required: true,
    },
    {
      label: "CUIT",
      formControlName: "cuit",
      type: "form-field",
      col: 12,
      row: 3,
      readonly: true,
      required: true,
    },
    {
      label: "Fecha de Ingreso",
      formControlName: "fechaAlta",
      type: "form-date",
      col: 12,
      row: 3,
      readonly: true,
      required: true,
    },
    {
      label: "Estado",
      formControlName: "estado",
      type: "form-field",
      col: 12,
      row: 4,
      readonly: true,
      required: true,
    },
    {
      label: "Fecha de Fundacion",
      formControlName: "fechaFundacion",
      type: "form-date",
      col: 12,
      row: 4,
      readonly: true,
      required: true,
    },
  ];


  return (
    <>
      <CardView title={""}>
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
            src={empresaImg}
            style={{ borderRadius: 100 }}
            preview={false}
          />
          <h1>{empresa?.nombre}</h1>
          <div style={{ padding: 10 }}>
            <Button
              type="primary"
              style={{ marginTop: 20 }}
              onClick={() => {
                setEdit(false);
                form.setFieldsValue({
                  nombre: empresa?.nombre,
                  email: empresa?.email,
                  fechaAlta: empresa?.fechaAlta ? dayjs(empresa.fechaAlta) : null,
                  fechaFundacion: empresa?.fechaFundacion
                    ? dayjs(empresa.fechaFundacion)
                    : null,
                  cuit: empresa?.cuit,
                  sector: empresa?.sector.id,
                  estado: empresa?.estado ? "Activo" : "Baja",
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
                    nombre: empresa?.nombre,
                    email: empresa?.email,
                    fechaAlta: empresa?.fechaAlta
                      ? dayjs(empresa.fechaAlta)
                      : null,
                    fechaFundacion: empresa?.fechaFundacion
                      ? dayjs(empresa.fechaFundacion)
                      : null,
                    cuit: empresa?.cuit,
                    sector: empresa?.sector.id,
                    estado: empresa?.estado ? "Activo" : "Baja",
                  });
                  setOpen(true);
                }}
              />
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
          >
            <Divider
                  style={{ width: "100%", borderColor: "black" }}
                  orientation="start"
                >
                  Publicaciones
                </Divider>
                {empresa?.publicaciones?.map((publi) => (
                  <div
                    key={publi.id!}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h4
                      style={{
                        textAlign: "center",
                        marginBottom: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/publicacion/${publi.id}`)}
                    >
                      {publi.titulo}
                    </h4>

                    <p
                      style={{
                        textAlign: "center",
                        margin: 0,
                        fontSize: 14,
                        color: "#555",
                      }}
                    >
                      {publi.sector} —{" "}
                      {new Date(publi.fecha).toLocaleDateString("es-AR")}{" "}
                      {new Date(publi.fecha).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <p
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginBottom: 10,
                        maxWidth: "80%",
                      }}
                    >
                      {publi.descripcion}
                    </p>

                    <Row style={{ justifyContent: "center" }}>
                      <Flex gap="small" align="center" wrap justify="center">
                        {publi?.tags?.split(" ").map((tag) => (
                          <Tag key={tag} color="blue">
                            {tag}
                          </Tag>
                        ))}
                      </Flex>
                    </Row>

                    <Divider style={{ width: "100%", borderColor: "gray" }} />
                  </div>
                ))}
          </div>
        </div>
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
            if (UserService.soyEmpresa()) {
              const command: UpdatePerfilEmpresaCommand = {
                email: form.getFieldValue("email"),
                nombre: form.getFieldValue("nombre"),
                sector: form.getFieldValue("sector"),
              };
              await updateEmpresa(command);
            } else {
              const command: UpdatePerfilEmpresaCommand = {
                email: form.getFieldValue("email"),
                nombre: form.getFieldValue("nombre"),
                sector: form.getFieldValue("sector"),
              };
              await updateEmpresa(command);
            }
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
        title={empresa?.nombre}
      >
        <BasicForm config={configEmpresa} form={form}></BasicForm>
      </Modal>
    </>
  );
};
