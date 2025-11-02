import { useEffect, useState } from "react";
import { Modal, Result, Button } from "antd";
import { setGlobalErrorHandler } from "../../utils/error-handler";

export const GlobalErrorModal = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGlobalErrorHandler((msg) => setError(msg));
  }, []);

  return (
    <Modal
      open={!!error}
      onCancel={() => setError(null)}
      footer={[
        <Button key="ok" type="primary" onClick={() => setError(null)}>
          Ok
        </Button>,
      ]}
    >
      <Result
        status="error"
        title="Error en la solicitud"
        subTitle={error}
      />
    </Modal>
  );
};