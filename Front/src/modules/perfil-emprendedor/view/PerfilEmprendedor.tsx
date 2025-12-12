import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PerfilEmprendedorProps } from "../models/emprendedor/perfil-emprendedor-props";
import { Button, Form, Modal, Image } from "antd";
import type { GetPerfilEmprendedorResponse } from "../models/emprendedor/get-perfil-emprendedor-response";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../components/basic-form/BasicFom";
import dayjs from "dayjs";
import { getEmprendedor } from "../services/perfil-emprendedor.service";
import { CardView } from "../../../components/card-view/CardView";
import { AlertService } from "../../../services/alert.service";
import { UserService } from "../../../services/user.service";
import profileImg from "../../../assets/profile-img.jpg";
import { EditOutlined } from "@ant-design/icons";
import type { UpdatePerfilEmprendedorCommand } from "../models/emprendedor/update-perfil-emprendedor";

export const PerfilEmprendedor: React.FC<PerfilEmprendedorProps> = ({
  isEditable,
}) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [user, setUser] = useState<GetPerfilEmprendedorResponse>();
  const [form] = Form.useForm();

  const salirModal = () => {
    setOpen(false);
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
          {
            user?.role === 'emprendedor' ? <h1>{`${user?.nombre} ${user?.apellido}`}</h1> : <h1>{`${user?.userName}`}</h1>
          }
          <div style={{ padding: 10 }}>
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
              const command: UpdatePerfilEmprendedorCommand = {
                email: form.getFieldValue("email")
              };
              //   await updateEmprendedor(command);
            } else {
              const command: UpdatePerfilEmprendedorCommand = {
                email: form.getFieldValue("email")
              };
              //   await updateEmprendedor(command);
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
        title={user?.userName}
      >
        <BasicForm config={config} form={form}></BasicForm>
      </Modal>
    </>
  );
};
