import { useParams } from "react-router-dom";
import { CardView } from "../../../../components/card-view/CardView";
import {
  FileOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  Form,
  Modal,
  Segmented,
  Table,
  type CollapseProps,
  type TablePaginationConfig,
  type TableProps,
} from "antd";
import {
  BasicForm,
  type BasicFormConfig,
} from "../../../../components/basic-form/BasicFom";
import "./VerPropuesta.css";
import React, { useEffect } from "react";
import type { PropuestaGridModel } from "../models/propuestas-grid.model";
import { getAll } from "../services/ver-propuestas-http.service";

const config: BasicFormConfig[] = [
  {
    formControlName: "titulo",
    label: "Titulo",
    type: "form-field",
    row: 1,
    col: 12,
  },
  {
    formControlName: "estado",
    label: "Estado",
    type: "combo",
    comboType: "EstadoPublicacionV1",
    row: 1,
    col: 12,
  },
  {
    formControlName: "presupuestoMin",
    label: "Presupuesto Min.",
    type: "form-number",
    row: 2,
    col: 6,
  },
  {
    formControlName: "presupuestoMax",
    label: "Presupuesto Max.",
    type: "form-number",
    row: 2,
    col: 6,
  },
  {
    formControlName: "emprededor",
    label: "Emprededor",
    type: "form-field",
    row: 2,
    col: 12,
  },
];

const pagination: TablePaginationConfig = {
  pageSize: 10,
  position: ["bottomRight"],
};

// const dataSource = [
//   {
//     titulo: "Propuesta",
//     descripcion: "Descripcion",
//     presupuesto: 10000,
//     estado: "Activa",
//     promVotos: 3.7,
//     emprendedor: "Carlos Bala",
//   },
//   {
//     titulo: "Propuesta",
//     descripcion: "Descripcion",
//     presupuesto: 9000,
//     estado: "Activa",
//     promVotos: 4.2,
//     emprendedor: "Pedro Pascal",
//   },
// ];

type Align = "Pendientes" | "Aceptadas" | "Rechazadas" | "Ver Todos";

export const VerPropuesta: React.FC = () => {
  const fetchData = async () => {
    const data = await getAll(id!, alignValue);
    setDataSource(data);
  }
  const { id, title } = useParams<{ id: string; title: string }>();
  const [form] = Form.useForm();
  const [alignValue, setAlignValue] = React.useState<Align>("Pendientes");
  const itemsCollapse: CollapseProps["items"] = [
    {
      key: "1",
      label: "Filtros",
      extra: <SearchOutlined />,
      children: <BasicForm form={form} config={config}></BasicForm>,
    },
  ];
  const [openMensaje, setOpenMensaje] = React.useState<boolean>(false);
  const [openPropuesta, setOpenPropuesta] = React.useState<boolean>(false);
  const [openEmprendedor, setOpenEmprendedor] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<PropuestaGridModel[]>();

  useEffect( () => {
    fetchData();
  }, [alignValue]);

  const handleMesajeOk = () => {
    console.log("Salio todo piola");
    setOpenMensaje(false);
  };

  const columns: TableProps<DataPromp>["columns"] = [
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Presupuesto",
      dataIndex: "presupuesto",
      key: "presupuesto",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.presupuesto - b.presupuesto,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Promedio de Votos",
      dataIndex: "promVotos",
      key: "promVotos",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.promVotos - b.promVotos,
    },
    {
      title: "Cantidad de Votos",
      dataIndex: "cantidadVotos",
      key: "cantidadVotos",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.promVotos - b.promVotos,
    },
    {
      title: "Id Usuario",
      dataIndex: "idUser",
      key: "idUser",
      hidden: true,
    },
    {
      title: "Emprendedor",
      dataIndex: "emprendedor",
      key: "estado",
      render: (text) => <a onClick={() => setOpenEmprendedor(true)}>{text}</a>,
    },
    {
      render: () => <MessageOutlined onClick={() => setOpenMensaje(true)} />,
    },
    {
      render: () => <FileOutlined onClick={() => setOpenPropuesta(true)} />,
    },
  ];

  return (
    <>
      <CardView title={`Propuesta ${title}`}>
        <Collapse expandIconPosition="end" items={itemsCollapse}></Collapse>
        <Segmented
          value={alignValue}
          style={{ marginBottom: 15, marginTop: 15 }}
          onChange={setAlignValue}
          options={["Pendientes", "Aceptadas", "Rechazadas", "Ver Todos"]}
        />
        <Table
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
        />
        ;
      </CardView>

      <Modal
        title={"Enviar Mensaje"}
        width={800}
        centered
        open={openMensaje}
        onOk={handleMesajeOk}
        onCancel={() => setOpenMensaje(false)}
        destroyOnClose
      >
        {/* <BasicForm form={form} config={formConfigs}></BasicForm> */}
      </Modal>
      <Modal
        title={"Ver Propuesta"}
        width={800}
        centered
        open={openPropuesta}
        onOk={() => setOpenPropuesta(false)}
        onCancel={() => setOpenPropuesta(false)}
        destroyOnClose
      >
        {/* <BasicForm form={form} config={formConfigs}></BasicForm> */}
      </Modal>
      <Modal
        title={"Ver Emprendedor"}
        width={800}
        centered
        open={openEmprendedor}
        onOk={() => setOpenEmprendedor(false)}
        onCancel={() => setOpenEmprendedor(false)}
        destroyOnClose
      >
        {/* <BasicForm form={form} config={formConfigs}></BasicForm> */}
      </Modal>
    </>
  );
};

interface DataPromp {
  titulo: string;
  descripcion: string;
  presupuesto: number;
  estado: string;
  promVotos: number;
  emprendedor: string;
}
