import React from 'react';
import { DashboardCards } from '../../../components/dashboard-card/DashboardCards';
import { GestionActions, type DashboardCardsProps } from '../../../components/card-publicacion/CardPublicacion';
import { CardView } from '../../../components/card-view/CardView';

export const GestionPropuestas: React.FC = () => {
    const cardsData: DashboardCardsProps[] = [
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
        },
        {
          title: "Ventas del mes",
          description: "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
          coorpName: "ACME Corp",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          actions: GestionActions,
        },
        {
          title: "Usuarios activos",
          description: "Cantidad de logins diarios",
          coorpName: "Beta Labs",
          imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
          actions: GestionActions,
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