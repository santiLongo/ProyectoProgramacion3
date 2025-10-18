import React, { useState, useEffect } from "react";
import { Modal } from "antd";

interface BasicDialogProps {
  title: string;
  open: boolean;
  onClose?: () => void;  
  onOk?: () => void;      
  children?: React.ReactNode;
}

const BasicDialog: React.FC<BasicDialogProps> = ({ title, open, onClose, onOk, children }) => {
  const [visible, setVisible] = useState(open);

  
  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleOk = () => {
    setVisible(false);
    onOk?.();
  };

  return (
    <Modal
      title={title}
      centered
      open={visible}
      onOk={handleOk}
      onCancel={handleClose}
      destroyOnClose
    >
      {children} 
    </Modal>
  );
};

export default BasicDialog;
