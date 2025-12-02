export interface SingUpForm {
  nombreUsuario: string;
  email: string;
  contraseña: string;
  confirmContraseña: string;
  esEmpresa: boolean;
  nombreEmpresa?: string;
  cuitEmpresa?: number;
  fechaFundacion?: Date;
  sector?: string;
}
