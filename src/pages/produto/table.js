import { formatCurrency } from "src/utils/format";

const colunasProduto = [
  {
    name: "id",
    field: "id",
    label: "#",
    align: "left",
    sortable: true,
    style: "width: 100px",
  },

  {
    name: "description",
    field: "description",
    label: "Nome",
    align: "left",
    sortable: true,
  },
  {
    name: "price",
    field: "price",
    label: "Valor",
    align: "right",
    sortable: true,
    format: (val) => formatCurrency(val),
  },
  {
    name: "type",
    field: "type",
    label: "Tipo",
    align: "center",
    sortable: false,
  },
  { name: "actions", field: "actions", label: "Actions", align: "right" },
];

export { colunasProduto };
