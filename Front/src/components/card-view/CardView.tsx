import React from "react";

export const CardView: React.FC<CardViewProps> = ({ title, children }) => {
  return (
    <>
      <div
        style={{
          marginTop: 15,
          marginBottom: 30,
          padding: 20,
          minHeight: "100%", 
          background: "var(--text-color)",
          borderRadius: "var(--secundary-color)",
          overflowY: "auto",
        }}
      >
        <h1>{title}</h1>
        <div className="card-body">
            {children}
        </div>
      </div>
    </>
  );
};

export interface CardViewProps {
  title: string;
  children?: React.ReactNode;
}