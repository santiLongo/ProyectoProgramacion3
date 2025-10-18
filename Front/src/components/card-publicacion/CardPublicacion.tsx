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
        actions={actions.map(action => (
            <a key={action.key} onClick={action.onClick}>{action.label}</a>
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
  actions: TypeActions[];
}

type TypeActions = {
  key: string;
  label: string;
  onClick?: () => undefined;
};
