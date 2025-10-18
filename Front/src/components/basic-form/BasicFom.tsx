// import React from 'react';
// import type { FormProps } from 'antd';
// import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

// export const BasicForm : React.FC = (formulario: Form.useForm(), config: BasicFormConfig[]) => {
//     let groupedRows: { row: number; items: BasicFormConfig[]}[] = [];
    
//     const map = new Map<number, BasicFormConfig[]>();
//     for (const item of config) {
//       if (!map.has(item.row)) map.set(item.row, []);
//       map.get(item.row)!.push(item);
//     }

//     groupedRows = Array.from(map.entries())
//       .map(([row, items]) => ({ row, items }))
//       .sort((a, b) => a.row - b.row);
    
//     return (
//         <>
//             <Form
//             form={formulario}
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     autoComplete="off"
//   >

//     {{groupedRows.forEach(group => {
//         <Row>
//             {{group.items.forEach(item => {
//                 <Col span={item.col}>
//                     <Form.Item<>
//                         label={item.label}
//                         name={item.formControlName}
//                         rules={[{ required: item.required === undefined? false : item.required, message: 'Este campo es requerido' }]}
//                         hidden={item.hidden === undefined? false : item.hidden}
//                         >
//                             {{if(item.type === 'form-field'){
//                                 <Input readOnly={item.readonly=== undefined? false : item.readonly}/>
//                             }}}
                        
//                     </Form.Item>
//                 </Col>
//             });}}
//         </Row>
        
//     });}}
    
//   </Form>
//         </>
//     )
// } 

// export interface BasicFormConfig{
//     formControlName: string,
//     type: 'form-date' | 'form-field' | 'form-number' | 'textarea' | 'checkbox' | 'combo',
//     comboType?: string,
//     label: string,
//     col: 2 | 4 | 6 | 8 | 12 | 24,
//     row: number
//     readonly?: boolean,
//     required?: boolean,
//     hidden?: boolean
// }

import React from "react";
import { Form, Input, Checkbox, Row, Col, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";

export interface BasicFormConfig {
  formControlName: string;
  type: "form-date" | "form-field" | "form-number" | "textarea" | "checkbox" | "combo";
  comboType?: string;
  label: string;
  col: 2 | 4 | 6 | 8 | 12 | 24;
  row: number;
  readonly?: boolean;
  required?: boolean;
  hidden?: boolean;
}

interface BasicFormProps {
  form: FormInstance;
  config: BasicFormConfig[];
  onSubmit?: (values: any) => void;
}

export const BasicForm: React.FC<BasicFormProps> = ({ form, config, onSubmit }) => {
  // Agrupar por filas
  const groupedRows = Array.from(
    config.reduce((acc, item) => {
      if (!acc.has(item.row)) acc.set(item.row, []);
      acc.get(item.row)!.push(item);
      return acc;
    }, new Map<number, BasicFormConfig[]>())
  )
    .map(([row, items]) => ({ row, items }))
    .sort((a, b) => a.row - b.row);

  // Renderizador de campos
  const renderField = (item: BasicFormConfig) => {
    switch (item.type) {
      case "form-field":
        return <Input style={{width: '100%',}} readOnly={item.readonly ?? false} />;
      case "form-number":
        return <Input style={{width: '100%',}} type="number" readOnly={item.readonly ?? false} />;
      case "textarea":
        return <Input.TextArea style={{width: '100%',}} readOnly={item.readonly ?? false} />;
      case "checkbox":
        return <Checkbox style={{width: '100%',}} disabled={item.readonly ?? false} />;
      case "form-date":
        return <DatePicker style={{width: '100%',}}  disabled={item.readonly ?? false} />;
      default:
        return <Input style={{width: '100%',}} readOnly={item.readonly ?? false} />;
    }
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: 800 }}
      autoComplete="off"
      onFinish={onSubmit}
    >
      {groupedRows.map((group) => (
        <Row key={group.row} gutter={16}>
          {group.items.map((item) => (
            <Col key={item.formControlName} span={item.col}>
              <Form.Item
                layout="vertical" 
                label={item.label}
                name={item.formControlName}
                rules={[
                  {
                    required: item.required ?? false,
                    message: "Este campo es requerido",
                  },
                ]}
                hidden={item.hidden ?? false}
              >
                {renderField(item)}
              </Form.Item>
            </Col>
          ))}
        </Row>
      ))}
    </Form>
  );
};
