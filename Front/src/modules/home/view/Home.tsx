import React, { useEffect, useState } from "react";
import { Form, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { type BasicFormConfig, BasicForm } from "../../../components/basic-form/BasicFom";
import type { DashboardCardsProps } from "../../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../../components/card-view/CardView";
import { DashboardCards } from "../../../components/dashboard-card/DashboardCards";
import { UserService } from "../../../services/user.service";
import type { FormPropuestasAltaModel } from "../models/form-propuestas-alta.model";
import { create, getAll } from "../services/home.service";


const formConfigs: Array<BasicFormConfig> = [
  {
    formControlName: "titulo",
    label: "Titulo",
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
  {
    formControlName: "idPublicacion",
    label: "Id Publicacion",
    type: "form-field",
    col: 24,
    row: 2,
    hidden: true,
  },
];

const Home: React.FC = () => {
  const userService = new UserService();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      const mappedData = data.map((item) => ({
        id: item.id,
        title: item.titulo,
        description: item.descripcion,
        coorpName: item.empresaName,
        imageUrl: item.empresaImg,
        actions: userService.soyEmprendedor()
          ? [
              {
                key: "view",
                label: "Hacer Propuestas",
                onClick: () => {
                  form.setFieldsValue({
                    titulo: "",
                    presupuesto: "",
                    descripcion: "",
                    idPublicacion: item.id,
                  });
                  setOpen(true);
                },
              },
            ]
          : [],
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
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  // const soyEmprendedor = false;
  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = async () => {
    console.log("Salio todo piola");
    const formValues: FormPropuestasAltaModel = form.getFieldsValue();
    await create(formValues);
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
        destroyOnHidden={true}
      >
        <BasicForm form={form} config={formConfigs}></BasicForm>
      </Modal>
    </>
  );
};

export default Home;
