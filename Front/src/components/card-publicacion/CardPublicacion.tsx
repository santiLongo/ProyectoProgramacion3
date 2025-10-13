import { Avatar, Card } from "antd";
import React from "react";
import "./CardPublicacion.css";

export const CardPublicacion: React.FC<DashboardCardsProps> = ({
  title,
  description,
  coorpName,
  imageUrl,
  actions,
}) => {
  return (
    <>
      <Card
        style={{
          minWidth: 300,
          border: "1px solid var(--secondary-color)",
          height: "100%",
        }}
        actions={actions.items.map(action => (
            <a key={action.key}>{action.label}</a>
        ))}
      >
        <div className="card-content">
          <div className="card-header">
            <Avatar src={imageUrl} />
            <h4>{title}</h4>
          </div>
          <div className="card-description">
            <p>{description}</p>
          </div>
          <div className="coorp-name">
            <strong>{coorpName}</strong>
          </div>
        </div>
      </Card>
    </>
  );
};
export interface DashboardCardsProps {
  title: string;
  description: string;
  coorpName: string;
  imageUrl: string;
  actions: TypeGestionActions | TypePublicacionActions;
}

type TypeGestionActions = {
  type: "gestion";
  items: [
    { key: "edit"; label: "Editar" },
    { key: "delete"; label: "Eliminar" },
    { key: "view"; label: "Ver Propuestas" }
  ];
};

type TypePublicacionActions = {
  type: "publicacion";
  items: [
    { key: "view"; label: "Hacer Propuesta" }
  ];
};

export const GestionActions: TypeGestionActions = {
  type: "gestion",
  items: [
    { key: "edit", label: "Editar" },
    { key: "delete", label: "Eliminar" },
    { key: "view", label: "Ver Propuestas" }
  ]
} as const; 

export const PublicacionActions: TypePublicacionActions = {
  type: "publicacion",
  items: [
    { key: "view", label: "Hacer Propuesta" }
  ]
} as const;
