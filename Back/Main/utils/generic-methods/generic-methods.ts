declare global {
  interface Number {
    ToCuitConGuiones(): string;
  }
}

Number.prototype.ToCuitConGuiones = function (): string {
  const limpio = this?.toString();

  if (limpio.length !== 11) {
    throw new Error("El CUIT debe tener exactamente 11 dígitos");
  }

  const parte1 = limpio.slice(0, 2);
  const parte2 = limpio.slice(2, 10);
  const parte3 = limpio.slice(10);

  return `${parte1}-${parte2}-${parte3}`;
};
