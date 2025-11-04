export class UserService {
  soyEmpresa = (): boolean => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user.role === "empresa";
  };

  soyEmprendedor = (): boolean => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user.role === "emprendedor";
  };
}
