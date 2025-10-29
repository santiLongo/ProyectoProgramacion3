import React, { useEffect, useState } from "react";
import { DashboardCards } from "../../../components/dashboard-card/DashboardCards";
import { type DashboardCardsProps } from "../../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../../components/card-view/CardView";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Row, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../components/basic-form/BasicFom";
import { create, getAll } from "../services/gestion-publicacion-http.service";
import type { PublicacionFormModel } from "../models/publicacion-form.model";

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
    formControlName: "sector",
    label: "Sector",
    type: "combo",
    comboType: 'SectorEmpresaV1',
    col: 12,
    row: 1,
    required: true,
  },
  {
    formControlName: "tags",
    label: "Tags",
    type: "textarea",
    col: 24,
    row: 2,
  },
  {
    formControlName: "descripcion",
    label: "Descripcion",
    type: "textarea",
    col: 24,
    row: 3,
    required: true,
  },
];

export const GestionPublicaciones: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [cardsData, setCardsData] = useState<DashboardCardsProps[]>([]);
  const navigate = useNavigate();

  // const cardsData: DashboardCardsProps[] = [
  //   {
  //     id: 1,
  //     title: "Ventas del mes",
  //     description:
  //       "Resumen general de operaciones dbashjkdb sahjkdbkjsa hbdjkashdjksadh jksa bdkjasbdkjasdbhksabdkjsabdksadbkasbdksabdkjsab",
  //     coorpName: "ACME Corp",
  //     imageUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
  //     actions: [
  //       { key: "edit", label: "Editar", onClick: () => setOpen(true) },
  //       { key: "delete", label: "Eliminar", onClick: () => undefined },
  //       {
  //         key: "view",
  //         label: "Ver Propuestas",
  //         onClick: () => {
  //           navigate(`./ver-propuesta/${1}`);
  //         },
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () =>{
      try{
        setLoading(true);
        const data = await getAll(1);
        const mappedData = data.map((item) => ({
              id: item.id,
              title: item.titulo,
              description: item.descripcion,
              coorpName: item.empresaName,
              imageUrl: item.empresaImg,
              actions: [
                { key: "edit", label: "Editar", onClick: () => setOpen(true) },
                { key: "delete", label: "Eliminar", onClick: () => undefined },
                {
                  key: "view",
                  label: "Ver Propuestas",
                  onClick: () => navigate(`./ver-propuesta/${item.id}`),
                },
              ],
            }));
        setCardsData(mappedData);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  const handleOk = async () => {
    // console.log("Salio todo piola");
    console.log(form.getFieldsValue());
    const req = form.getFieldsValue() as PublicacionFormModel;
    await create(req);
    setOpen(false);
    // TODO: Tiene que actualizar cada vez que cierra el dialog
  };
  const handleCancel = () => {
    setOpen(false);
    //Tiene que actualizar cada vez que cierra el dialog
  };

  return (
    <>
      <CardView title="Mis Publicaciones">
        <Row>
          <Button
            type="primary"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Crear Publicacion
          </Button>
        </Row>

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
        title={"Editar Publicacion"}
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
