const formatCurrency = (currency) => {
  const valor = typeof currency == "number" ? currency : Number(currency);

  const formatted = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatted;
};

const formatData = (dataStr) => {
  const valor = new Date(dataStr);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Fortaleza",
  }).format(valor);
};

const formatCnpjCpf = (cnpjCpf) => {
  let formatado = cnpjCpf.replace(/[^0-9]/g, "");
  if (formatado.length == 14) {
    return formatado.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else if (formatado.length == 11) {
    return formatado.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return formatado;
};

export { formatCurrency, formatData, formatCnpjCpf };
