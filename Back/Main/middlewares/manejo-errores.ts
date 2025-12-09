import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("❌ Error capturado:", err);
  res
    .status(400)
    .json({ error: err.message || "Error desconocido en el servidor." });
};