import React from 'react';
import { DashboardCards } from '../../../components/dashboard-card/DashboardCards';
import { type DashboardCardsProps } from '../../../components/card-publicacion/CardPublicacion';
import { CardView } from '../../../components/card-view/CardView';
import { useNavigate } from 'react-router-dom';

export const GestionPublicaciones: React.FC = () => {
  const navigate = useNavigate();

    const cardsData: DashboardCardsProps[] = [
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: [
            { key: "edit", label: "Editar", onClick: () => undefined },
            { key: "delete", label: "Eliminar", onClick: () => undefined },
            { key: "view", label: "Ver Propuestas", onClick: () => { navigate("./ver-propuesta") } }
          ],
        },
        
      ];
    
    
      return (
        <>
        <CardView title="Mis Publicaciones">
          <DashboardCards cards={cardsData}></DashboardCards>
        </CardView>
        </>
      );
}