import React from "react";
import { Button, Modal, Result } from "antd";

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
}) => {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Modal open={open} footer={null} closable={false} centered>
      <Result
        status="error"
        title={title}
        subTitle={descripcion ?? ""}
        extra={[
          <Button
            hidden={okButton ?? false}
            type="primary"
            key="console"
            onClick={() => {
              onAceptar;
              setOpen(false);
            }}
          >
            Aceptar
          </Button>,
          <Button
            hidden={cancelButton ?? true}
            key="buy"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>,
        ]}
      />
    </Modal>
  );
};
