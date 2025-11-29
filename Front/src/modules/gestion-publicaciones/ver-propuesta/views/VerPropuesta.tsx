import { useParams } from "react-router-dom";
import { CardView } from "../../../../components/card-view/CardView";
import {
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  Divider,
  Flex,
  Form,
  Modal,
  Table,
  Tag,
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
import {
  getAll,
  getEmprendedorById,
  getPubliById,
  updateEstadoPublicacion,
} from "../services/ver-propuestas-http.service";
import dayjs from "dayjs";
import type { PropuestasFilterModel } from "../models/propuestas-filter.model";
import { BasicCombo } from "../../../../components/combo/Combo";

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
    type: "combo",
    comboType: "EmprendedorV1",
    row: 2,
    col: 12,
  },
];

const configPubli: BasicFormConfig[] = [
  {
    formControlName: "titulo",
    label: "Titulo",
    type: "form-field",
    row: 1,
    col: 12,
    readonly: true,
  },
  {
    formControlName: "categoria",
    label: "Categoria",
    type: "form-field",
    row: 1,
    col: 12,
    readonly: true,
  },
  {
    formControlName: "descripcion",
    label: "Descripcion",
    type: "textarea",
    row: 2,
    col: 24,
    readonly: true,
  },
];

const pagination: TablePaginationConfig = {
  pageSize: 10,
  position: ["bottomRight"],
};

export const VerPropuesta: React.FC = () => {
  const fetchData = async () => {
    const command: PropuestasFilterModel = {
      idPublicacion: id!,
      titulo: form.getFieldValue("titulo"),
      estado: form.getFieldValue("estado"),
      presupuestoMin: form.getFieldValue("presupuestoMin"),
      presupuestoMax: form.getFieldValue("presupuestoMax"),
      emprendedor: form.getFieldValue("emprededor"),
    };
    const data = await getAll(command);
    setDataSource(data);
  };
  const cargarPubli = async () => {
    const data = await getPubliById(id!);
    const tags = data.tags.split(" ");
    setTags(tags);
    formPubli.setFieldsValue(data);
  };
  const { id, title } = useParams<{ id: string; title: string }>();
  const [formPubli] = Form.useForm();
  const [form] = Form.useForm();
  const itemsCollapse: CollapseProps["items"] = [
    {
      key: "1",
      label: "Filtros",
      extra: <SearchOutlined />,
      children: (
        <>
          <BasicForm form={form} config={config}></BasicForm>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            iconPosition={"start"}
            onClick={async () => {
              await fetchData();
            }}
          >
            Buscar
          </Button>
        </>
      ),
    },
  ];
  const [openMensaje, setOpenMensaje] = React.useState<boolean>(false);
  const [openEmprendedor, setOpenEmprendedor] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<PropuestaGridModel[]>();
  const [tags, setTags] = React.useState<string[]>([]);

  useEffect(() => {
    fetchData();
    cargarPubli();
  }, []);

  const handleMesajeOk = () => {
    console.log("Salio todo piola");
    setOpenMensaje(false);
  };

  const columns: TableProps<PropuestaGridModel>["columns"] = [
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
      render: (text, record) => (
        <>
          <BasicCombo
            comboName="EstadoPublicacionV1"
            value={text}
            onChange={(value) => {
              if (value === undefined) return;

              setDataSource((prev) =>
                prev?.map((row) =>
                  row.idPropuesta === record.idPropuesta
                    ? { ...row, estado: value }
                    : row
                )
              );

              updateEstadoPublicacion(record.idPropuesta, value);

              if(value === "ACEPTADA"){
                fetchData();
              }
            }}
          ></BasicCombo>
        </>
      ),
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
      title: "Id Propuesta",
      dataIndex: "idPropuesta",
      key: "idPropuesta",
      hidden: true,
    },
    {
      title: "Emprendedor",
      dataIndex: "emprendedor",
      key: "estado",
      render: (text, record) => (
        <a
          onClick={async () => {
            const data = await getEmprendedorById(record.idUser);
            console.log(data);
            form.setFieldsValue({
              nombre: data.nombre,
              apellido: data.apellido,
              email: data.email,
              dni: data.dni,
              fechaNacimiento: dayjs(data.fechaNacimiento),
              pais: data.pais,
            });
            setOpenEmprendedor(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      render: () => <MessageOutlined onClick={() => setOpenMensaje(true)} />,
    },
  ];

  return (
    <>
      <CardView title={title ?? "Publicacion"}>
        <BasicForm form={formPubli} config={configPubli}></BasicForm>
        <Flex gap="small" align="baseline" wrap>
          {tags!.map((tag) => (
            <Tag key={tag} color={"blue"}>
              {tag}
            </Tag>
          ))}
        </Flex>
        <Divider orientation="start">Propuestas</Divider>
        <Collapse expandIconPosition="end" items={itemsCollapse}></Collapse>
        <Table
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 20 }}
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
      >
        {/* <BasicForm form={form} config={formConfigs}></BasicForm> */}
      </Modal>
      <Modal
        title={"Ver Emprendedor"}
        width={800}
        centered
        open={openEmprendedor}
        onOk={() => {
          form.resetFields();
          setOpenEmprendedor(false);
        }}
        onCancel={() => {
          form.resetFields();
          setOpenEmprendedor(false);
        }}
      >
        <BasicForm form={form} config={formEmpConfig()}></BasicForm>
      </Modal>
    </>
  );
};

const formEmpConfig = (): BasicFormConfig[] => {
  return [
    {
      formControlName: "nombre",
      label: "Nombre",
      type: "form-field",
      row: 1,
      col: 12,
      readonly: true,
    },
    {
      formControlName: "apellido",
      label: "Apellido",
      type: "form-field",
      row: 1,
      col: 12,
      readonly: true,
    },
    {
      formControlName: "email",
      label: "Email",
      type: "form-field",
      row: 2,
      col: 12,
      readonly: true,
    },
    {
      formControlName: "dni",
      label: "DNI",
      type: "form-field",
      row: 2,
      col: 12,
      readonly: true,
    },
    {
      formControlName: "fechaNacimiento",
      label: "Fecha de Nacimiento",
      type: "form-date",
      row: 3,
      col: 12,
      readonly: true,
    },
    {
      formControlName: "pais",
      label: "Pais",
      type: "form-field",
      row: 3,
      col: 12,
      readonly: true,
    },
  ];
};
