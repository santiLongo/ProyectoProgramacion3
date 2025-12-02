import React from "react";
import { Button, Modal, Result } from "antd";

export interface SuccessAlertProps {
  title: string;
  descripcion?: string;
  okButton?: boolean;
  cancelButton?: boolean;
  onAceptar?: () => any;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
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
        status="success"
        title={title}
        subTitle={descripcion ?? ""}
        extra={[
          !okButton && (
            <Button
              type="primary"
              key="ok"
              onClick={() => {
                onAceptar;
                setOpen(false);
              }}
            >
              Aceptar
            </Button>
          ),
          !cancelButton && (
            <Button
              key="cancel"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
          ),
        ]}
      />
    </Modal>
  );
};
