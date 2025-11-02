import React, { useEffect, useState } from "react";
import { DashboardCards } from "../../components/dashboard-card/DashboardCards";
import { type DashboardCardsProps } from "../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../components/card-view/CardView";
import { Form, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../components/basic-form/BasicFom";
import { useNavigate } from "react-router-dom";
import { getAll } from "../gestion-publicaciones/services/gestion-publicacion-http.service";

const formConfigs: Array<BasicFormConfig> = [
  {
    formControlName: "titulo",
    label: "TiTulo",
    type: "form-field",
    col: 12,
    row: 1,
    required: true,
  },
  {
    formControlName: "presupuesto",
    label: "Presupuesto",
    type: "form-number",
    col: 12,
    row: 1,
    required: true,
  },
  {
    formControlName: "descripcion",
    label: "Descripcion",
    type: "textarea",
    col: 24,
    row: 2,
    required: true,
  },
];

const Home: React.FC = () => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAll(false);
      const mappedData = data.map((item) => ({
        id: item.id,
        title: item.titulo,
        description: item.descripcion,
        coorpName: item.empresaName,
        imageUrl: item.empresaImg,
        actions: [
          {
            key: "view",
            label: "Hcer Propuestas",
            onClick: () => console.log('Hago una propuestas'),
          },
        ],
      }));
      setCardsData(mappedData);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState<DashboardCardsProps[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const soyEmprendedor = false;
  useEffect(() => {
    fetchData();
  }, [navigate]);
  const handleOk = () => {
    console.log("Salio todo piola");
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <CardView title="Publicaciones">
        {loading ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            style={{ display: "block", marginTop: 50, textAlign: "center" }}
          />
        ) : (
          <DashboardCards cards={cardsData} />
        )}
      </CardView>

      <Modal
        title={"Enviar Propuesta"}
        width={800}
        centered
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <BasicForm form={form} config={formConfigs}></BasicForm>
      </Modal>
    </>
  );
};

export default Home;
