import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCombo, type ComboModel } from "./services/combo.service";

interface ComboProps {
  comboName: string;
  readonly?: boolean;
}

export const BasicCombo: React.FC<ComboProps> = ({ comboName, readonly = false }) => {
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
      loading={loading}
      disabled={readonly}
      style={{ width: "100%" }}
      placeholder={`Seleccione ${comboName}`}
    />
  );
};
