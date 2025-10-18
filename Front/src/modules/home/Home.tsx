import React from "react";
import { DashboardCards } from "../../components/dashboard-card/DashboardCards";
import { type DashboardCardsProps } from "../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../components/card-view/CardView";

const Home: React.FC = () => {
  const soyEmprendedor = false;
  const cardsData: DashboardCardsProps[] = [
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Ventas del mes",
      description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    {
      title: "Usuarios activos",
      description: "Cantidad de logins diarios",
      coorpName: "Beta Labs",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      actions: [{ key: "hacerPropuesta", label: "Hacer Propuesta", onClick: () => undefined },],
    },
    
  ];


  return (
    <>
      <CardView title="Publicaciones">
        <DashboardCards cards={cardsData}></DashboardCards>
      </CardView>
    </>
  );
};

export default Home;
