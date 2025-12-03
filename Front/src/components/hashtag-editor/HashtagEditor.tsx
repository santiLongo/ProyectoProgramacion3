import React from "react";
import { Input, Typography } from "antd";
import "./HastagEditor.css";

const { TextArea } = Input;
const { Text } = Typography;

const hashtagRegex = /(#\w+)/g;

interface HashtagEditorProps {
  readonly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export const HashtagEditor: React.FC<HashtagEditorProps> = ({
  readonly,
  value,
  onChange,
  required
}) => {
  const safeValue = value ?? "";

  const renderWithTags = (text: string) => {
    const parts = (text ?? "").split(hashtagRegex);

    return parts.map((part, index) => {
      if (part.match(hashtagRegex)) {
        return (
          <span key={index} className="hashtag">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      <TextArea
        rows={4}
        placeholder="Escribí con #hashtags..."
        readOnly={readonly}
        value={safeValue}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      />

      <Text strong style={{ display: "block", marginTop: 8 }}>
        Vista previa:
      </Text>

      <div className="preview-box">{renderWithTags(safeValue)}</div>
    </div>
  );
};
