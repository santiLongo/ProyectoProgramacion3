import { createRoot } from "react-dom/client";
import {
  SuccessAlert,
  type SuccessAlertProps,
} from "../components/generic-alerts/success-alert/SuccessAlert";
import { ErrorAlert, type ErrorAlertProps } from "../components/generic-alerts/error-alert/ErrorAlert";

class AlertService {

  

  async success(config: SuccessAlertProps) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleAceptar = () => {
      config.onAceptar?.();
      root.unmount();
      container.remove();
    };

    root.render(<SuccessAlert {...config} onAceptar={handleAceptar} />);
  }

  async error(config: ErrorAlertProps) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleAceptar = () => {
      config.onAceptar?.();
      root.unmount();
      container.remove();
    };

    root.render(<ErrorAlert {...config} onAceptar={handleAceptar} />);
  }
}

export const alertService = new AlertService();
