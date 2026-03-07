export class UserService {
  static soyEmpresa = (): boolean => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user.role === "empresa";
  };

  static soyEmprendedor = (): boolean => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user.role === "emprendedor";
  };

  static userId = (): string => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user?._id;
  };

  static role = (): string => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    return user?.role;
  };

  static token = (): string | null => {
    const token = localStorage.getItem("token") ?? "";
    return token ?? null;
  };

  static userName = (): string => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    return user?.userName;
  };
}
