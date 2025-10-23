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
import React from "react";

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
    comboType: "ComboEstadoV1",
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
    type: "combo",
    comboType: "ComboEmprededorV1",
    row: 2,
    col: 12,
  },
];

const pagination: TablePaginationConfig = {
  pageSize: 10,
  position: ["bottomRight"],
};

const dataSource = [
  {
    titulo: "Propuesta",
    descripcion: "Descripcion",
    presupuesto: 10000,
    estado: "Activa",
    promVotos: 3.7,
    emprendedor: "Carlos Bala",
  },
  {
    titulo: "Propuesta",
    descripcion: "Descripcion",
    presupuesto: 9000,
    estado: "Activa",
    promVotos: 4.2,
    emprendedor: "Pedro Pascal",
  },
];

type Align = "Sin Votar" | "Votados" | "Ver Todos";

export const VerPropuesta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [alignValue, setAlignValue] = React.useState<Align>("Sin Votar");
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
      title: "Emprendedor",
      dataIndex: "emprendedor",
      key: "estado",
      render: (text) => <a onClick={() => setOpenEmprendedor(true)}>{text}</a>,
    },
    {
      render: () => <MessageOutlined onClick={() => setOpenMensaje(true)}/>,
    },
    {
      render: () => <FileOutlined onClick={() => setOpenPropuesta(true)}/>,
    },
  ];

  return (
    <>
      <CardView title={`Propuesta ${id}`}>
        <Collapse expandIconPosition="end" items={itemsCollapse}></Collapse>
        <Segmented
          value={alignValue}
          style={{ marginBottom: 15, marginTop: 15 }}
          onChange={setAlignValue}
          options={["Sin Votar", "Votados", "Ver Todos"]}
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
        onOk={() =>setOpenPropuesta(false)}
        onCancel={() =>setOpenPropuesta(false)}
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
