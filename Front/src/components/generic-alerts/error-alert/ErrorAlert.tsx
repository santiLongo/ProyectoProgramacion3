import React from "react";
import { Button, Result } from "antd";

export interface ErrorAlertProps {
  title: string;
  descripcion?: string;
  okButton?: boolean;
  cancelButton?: boolean;
  onAceptar?: () => any;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  descripcion,
  okButton,
  cancelButton,
  onAceptar,
}) => (
  <Result
    status="error"
    title={title}
    subTitle={descripcion ?? ""}
    extra={[
      <Button hidden={okButton ?? false} type="primary" key="console" onClick={onAceptar}>
        Aceptar
      </Button>,
      <Button hidden={cancelButton ?? true} key="buy">Cancelar</Button>,
    ]}
  />
);