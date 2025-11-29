import React, { useEffect, useState } from "react";
import { DashboardCards } from "../../../components/dashboard-card/DashboardCards";
import { type DashboardCardsProps } from "../../../components/card-publicacion/CardPublicacion";
import { CardView } from "../../../components/card-view/CardView";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../components/basic-form/BasicFom";
import {
  activar,
  create,
  eliminar,
  getAll,
  update,
} from "../services/gestion-publicacion-http.service";
import type { PublicacionFormModel } from "../models/publicacion-form.model";

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
    formControlName: "sector",
    label: "Sector",
    type: "combo",
    comboType: "SectorEmpresaV1",
    col: 12,
    row: 1,
    required: true,
  },
  {
    formControlName: "tags",
    label: "Tags",
    type: "tags",
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
  {
    formControlName: "id",
    label: "Id",
    type: "form-field",
    col: 24,
    row: 4,
    hidden: true,
  },
];

export const GestionPublicaciones: React.FC = () => {
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
        actions: [
          {
            key: "edit",
            label: "Editar",
            onClick: () => {
              form.setFieldsValue({
                titulo: item.titulo,
                sector: item.idSector,
                tags: item.tags,
                descripcion: item.descripcion,
                id: item.id,
              });
              setEsUpdate(true);
              setOpen(true);
            },
          },
          {
            key: "delete",
            hidden: item.estado === "Suspendida" || item.estado === "Finalizada",
            label: "Suspender",
            onClick: async () => {
              await eliminar(item.id);
              fetchData();
            },
          },
          {
            key: "activar",
            hidden: item.estado === "Activa" || item.estado === "Finalizada",
            label: "Activar",
            onClick: async () => {
              await activar(item.id);
              fetchData();
            },
          },
          {
            key: "view",
            label: "Ver Propuestas",
            onClick: () => navigate(`./ver-propuesta/${item.id}/${item.titulo}`),
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
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [cardsData, setCardsData] = useState<DashboardCardsProps[]>([]);
  const [esUpdate, setEsUpdate] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleOk = async () => {
    const req = form.getFieldsValue() as PublicacionFormModel;
    let res: any;
    if (esUpdate) {
      res = await update(req);
    } else {
      res = await create(req);
    }
    if (res.errores) {
      return;
    }
    setEsUpdate(false);
    setOpen(false);
    fetchData();
    // TODO: Tiene que actualizar cada vez que cierra el dialog
  };
  const handleCancel = () => {
    setEsUpdate(false);
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
              form.setFieldsValue({
                titulo: undefined,
                sector: undefined,
                tags: undefined,
                descripcion: undefined,
                id: undefined,
              });
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
