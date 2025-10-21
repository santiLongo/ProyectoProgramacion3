import React, { useState } from "react";
import { DashboardCards } from "../../components/dashboard-card/DashboardCards";
import { type DashboardCardsProps } from "../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../components/card-view/CardView";
import { Form, Modal } from "antd";
import { BasicForm, type BasicFormConfig } from "../../components/basic-form/BasicFom";

const formConfigs: Array<BasicFormConfig> = [
  {
    formControlName: 'titulo',
    label: 'TiTulo',
    type: 'form-field',
    col: 12,
    row: 1,
    required: true
  },
  {
    formControlName: 'presupuesto',
    label: 'Presupuesto',
    type: 'form-number',
    col: 12,
    row: 1,
    required: true
  },
  {
    formControlName: 'descripcion',
    label: 'Descripcion',
    type: 'textarea',
    col: 24,
    row: 2,
    required: true
  },
];

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  // const soyEmprendedor = false;
  const cardsData: DashboardCardsProps[] = [
    {
      title: "Ventas del mes",
      description:
        "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
      coorpName: "ACME Corp",
      imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      actions: [
        {
          key: "hacerPropuesta",
          label: "Hacer Propuesta",
          onClick: () => setOpen(true),
        },
      ],
    },
  ];

  const handleOk = () => {
    console.log("Salio todo piola");
    setOpen(false);
  }
  const handleCancel = () => {
    setOpen(false);
  }

  return (
    <>
      <CardView title="Publicaciones">
        <DashboardCards cards={cardsData}></DashboardCards>
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
        <BasicForm
          form={form}
          config={formConfigs}
        >
        </BasicForm>
      </Modal>
    </>
  );
};

export default Home;
