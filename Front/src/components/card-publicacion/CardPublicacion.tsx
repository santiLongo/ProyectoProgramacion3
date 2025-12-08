import { Avatar, Card } from "antd";
import React from "react";
import "./CardPublicacion.css";
import { useNavigate } from "react-router-dom";

export const CardPublicacion: React.FC<DashboardCardsProps> = ({
  id,
  title,
  description,
  coorpName,
  idCoorp,
  imageUrl,
  actions,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        style={{
          minWidth: 300,
          border: "1px solid var(--secondary-color)",
          height: "100%",
        }}
        actions={actions
          .filter((action) => !action.hidden)
          .map((action) => (
            <a key={action.key} onClick={action.onClick}>
              {action.label}
            </a>
          ))}
      >
        <div className="card-content">
          <div className="card-header">
            <Avatar src={imageUrl} />
            <h4
              onClick={() => navigate("./publicacion/" + id)}
              style={{ cursor: "pointer" }}
            >
              {title}
            </h4>
          </div>
          <div className="card-description">
            <p>{description}</p>
          </div>
          <div className="coorp-name">
            <strong
              onClick={() => navigate("./perfil/" + idCoorp)}
              style={{ cursor: "pointer" }}
            >
              {coorpName}
            </strong>
          </div>
        </div>
      </Card>
    </>
  );
};
export interface DashboardCardsProps {
  id: string;
  title: string;
  description: string;
  coorpName: string;
  idCoorp: string;
  imageUrl?: string;
  actions: TypeActions[];
}

type TypeActions = {
  key: string;
  label: string;
  onClick?: () => void;
  hidden?: boolean;
};
