import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCombo, type ComboModel } from "./services/combo.service";

export interface ComboProps {
  comboName: string;
  readonly?: boolean;
  value?: number | string; // <-- Agregado
  onChange?: (value: any) => void; // <-- Agregado
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
      value={value}          // <-- conecta con el form
      onChange={onChange}    // <-- conecta con el form
      loading={loading}
      disabled={readonly}
      style={{ width: "100%" }}
    />
  );
};
