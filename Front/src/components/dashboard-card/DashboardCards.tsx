import { Col, Row } from "antd";
import {
  CardPublicacion,
  type DashboardCardsProps,
} from "../card-publicacion/CardPublicacion";

export const DashboardCards: React.FC<DashboardCardsPropsList> = ({
  cards,
}) => {
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {cards.map((card, index) => (
          <Col
            key={index}
            className="gutter-row"
            span={6}
            style={{ marginTop: 10 }}
          >
            <CardPublicacion
              title={card.title}
              description={card.description}
              coorpName={card.coorpName}
              idCoorp={card.idCoorp}
              imageUrl={card.imageUrl}
              actions={card.actions}
              id={card.id}
            ></CardPublicacion>
          </Col>
        ))}
      </Row>
    </>
  );
};

export interface DashboardCardsPropsList {
  cards: Array<DashboardCardsProps>;
}
