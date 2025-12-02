import {
  GithubOutlined,
  InstagramOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, Modal, Space, theme } from "antd";
import type { CSSProperties } from "react";
import React from "react";
import "./Login.css";
import { login, singUp } from "./service/login.service";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../components/basic-form/BasicFom";
import type { SingUpForm } from "./models/sign-up-form";
import { alertService } from "../../services/alert.service";

export const Login: React.FC = () => {
  const { token } = theme.useToken();
  const [openRegistro, setOpenRegistro] = React.useState(false);
  const [esEmpresa, setEsEmpresa] = React.useState(false);
  const [formRegistro] = Form.useForm();

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: "var(--text-color)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const configForm: BasicFormConfig[] = [
    {
      label: "Nombre de usuario",
      formControlName: "nombreUsuario",
      type: "form-field",
      col: 12,
      row: 1,
      required: true,
    },
    {
      label: "Correo electrónico",
      formControlName: "email",
      type: "form-field",
      col: 12,
      row: 1,
      required: true,
    },
    {
      label: "Contraseña",
      formControlName: "contraseña",
      type: "password",
      col: 12,
      row: 2,
      required: true,
    },
    {
      label: "Confirmar Contraseña",
      formControlName: "confirmContraseña",
      type: "password",
      col: 12,
      row: 2,
      required: true,
    },
    {
      label: "¿Soy una empresa?",
      formControlName: "esEmpresa",
      type: "checkbox",
      col: 24,
      row: 3,
    },
    {
      label: "Nombre de la empresa",
      formControlName: "nombreEmpresa",
      type: "form-field",
      col: 12,
      row: 4,
      required: esEmpresa,
      hidden: !esEmpresa,
    },
    {
      label: "CUIT de la empresa (sin guiones)",
      formControlName: "cuitEmpresa",
      type: "form-number",
      col: 12,
      row: 4,
      required: esEmpresa,
      hidden: !esEmpresa,
    },
    {
      label: "Fecha de fundacion",
      formControlName: "fechaFundacion",
      type: "form-date",
      col: 12,
      row: 5,
      required: esEmpresa,
      hidden: !esEmpresa,
    },
    {
      label: "Sector de la Empresa",
      formControlName: "sector",
      type: "combo",
      comboType: "SectorEmpresaV1",
      col: 12,
      row: 5,
      required: esEmpresa,
      hidden: !esEmpresa,
    },
  ];

  const onValueChanges = (changedValues, allValues) => {
    if(allValues.esEmpresa === true){
      setEsEmpresa(true);
    } else {
      setEsEmpresa(false);
    }
  }

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProConfigProvider hashed={false}>
          <div
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-color)",
              borderRadius: 50,
              alignItems: "center",
              margin: "auto",
            }}
          >
            <LoginForm
              logo="https://github.githubassets.com/favicons/favicon.png"
              title="Ayudame"
              onFinish={login}
              submitter={{
                searchConfig: {
                  submitText: "Iniciar Sesion",
                },
              }}
              actions={
                <Space>
                  Redes
                  <GithubOutlined
                    style={iconStyles}
                    onClick={() => window.open("https://github.com/santiLongo")}
                  />
                  <InstagramOutlined
                    style={iconStyles}
                    onClick={() =>
                      window.open("https://www.instagram.com/_longosantiago_")
                    }
                  />
                </Space>
              }
              style={{ borderRadius: 50 }}
            >
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Email"}
                rules={[
                  {
                    required: true,
                    message: "Email required",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                  strengthText:
                    "La contraseña debe contener números, letras y caracteres especiales, de al menos 8 caracteres de longitud.",
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return "ok";
                      }
                      if (value && value.length > 6) {
                        return "pass";
                      }
                      return "poor";
                    };
                    const status = getStatus();
                    if (status === "pass") {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          Fuerza: Media
                        </div>
                      );
                    }
                    if (status === "ok") {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          Fuerza: fuerte
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>
                        Fuerza: débil
                      </div>
                    );
                  },
                }}
                placeholder={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Password required",
                  },
                ]}
              />
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              >
                <a
                  style={{
                    float: "right",
                    marginBottom: 10,
                  }}
                  onClick={() => {
                    formRegistro.resetFields();
                    formRegistro.setFieldValue('esEmpresa', false);
                    setOpenRegistro(true);
                  }}
                >
                  Registrarse
                </a>
              </div>
            </LoginForm>
          </div>
        </ProConfigProvider>
      </div>

      <Modal
        title="Registro"
        open={openRegistro}
        destroyOnHidden={true}
        onCancel={() => {
          setOpenRegistro(false);
        }}
        onOk={ async () => {
          const form: SingUpForm = formRegistro.getFieldsValue()
          await singUp(form);
          alertService.success({title: "Registro con exito", descripcion: "Se ha registrado con exito"});
          setOpenRegistro(false);
        }}
        okText={'Registrarse'}
        cancelText={'Cancelar'}
      >
        <BasicForm form={formRegistro} config={configForm} onValueChanges={onValueChanges}></BasicForm>
      </Modal>
    </>
  );
};
