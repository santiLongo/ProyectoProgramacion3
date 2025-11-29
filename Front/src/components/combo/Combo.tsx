import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCombo, type ComboModel } from "./services/combo.service";

export interface ComboProps {
  comboName: string;
  readonly?: boolean;
  value?: number | string;
  onChange?: (value: any) => void;
}

export const BasicCombo: React.FC<ComboProps> = ({ comboName, readonly = false, value, onChange  }) => {
  const [options, setOptions] = useState<ComboModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombo = async () => {
      setLoading(true);
      const data = await getCombo(comboName);
      setOptions(data);
      setLoading(false);
    };
    fetchCombo();
  }, [comboName]);

  return (
    <Select
      options={options.map(opt => ({
        value: opt.numero,
        label: opt.descripcion
      }))}
      value={value}
      onChange={onChange}
      loading={loading}
      disabled={readonly}
      style={{ width: "100%" }}
      allowClear
      placeholder="Seleccione un valor"
    />
  );
};
