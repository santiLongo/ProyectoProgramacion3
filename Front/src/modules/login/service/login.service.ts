import { environments } from "../../../configs/enviroments";
import { post } from "../../../services/http.service";
import type { LoginForm } from "../models/login-form";
import type { SingUpForm } from "../models/sign-up-form";

export const login = async (values: LoginForm) => {
  const fullUrl = environments.apiUrl + "auth";

  const data = await post(fullUrl, values);

  if (data.token == null) {
    return;
  }

  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("user", JSON.stringify(data.user));
  window.location.href = "/";
  return;
};

export const singUp = async (values: SingUpForm) => {
  const fullUrl = environments.apiUrl + "auth/sing-up";
  await post(fullUrl, values);
  return;
};
