import { useParams } from "react-router-dom";
import { CardView } from "../../../../components/card-view/CardView";
import { SearchOutlined } from '@ant-design/icons';
import { Collapse, Form, type CollapseProps } from "antd";
import { BasicForm, type BasicFormConfig } from "../../../../components/basic-form/BasicFom";

const config: BasicFormConfig[] = [
    {
        formControlName: 'titulo',
        label: 'Titulo',
        type: "form-field",
        row: 1,
        col: 12,
    },
    {
        formControlName: 'estado',
        label: 'Estado',
        type: "combo",
        comboType: "ComboEstadoV1",
        row: 1,
        col: 12,
    },
    {
        formControlName: 'presupuestoMin',
        label: 'Presupuesto Min.',
        type: "form-number",
        row: 2,
        col: 6,
    },
    {
        formControlName: 'presupuestoMax',
        label: 'Presupuesto Max.',
        type: "form-number",
        row: 2,
        col: 6,
    },
    {
        formControlName: 'emprededor',
        label: 'Emprededor',
        type: "combo",
        comboType: "ComboEmprededorV1",
        row: 2,
        col: 12,
    },
]

export const VerPropuesta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Filtros',

    children: <BasicForm form={form} config={config}></BasicForm>,
  },
];
  return (
    <>
      <CardView title={`Propuesta ${id}`}>
        <Collapse expandIcon={() => (<SearchOutlined/>)} items={items}>
        </Collapse>
      </CardView>
    </>
  );
};
