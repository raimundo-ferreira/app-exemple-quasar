import { exportFile } from "quasar";
import useNotify from "src/composables/UseNotify";

export default function useGridExport() {
  const { notifyWarning } = useNotify();

  const wrapCsvValue = function (val, formatFn, row) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? "" : String(formatted);

    formatted = formatted.split('"').join('""');
    formatted = formatted.split("\n").join("\\n");
    formatted = formatted.split("\r").join("\\r");

    return `"${formatted}"`;
  };

  const exportToCsv = (fileName, columns, data) => {
    const content = [columns.map((col) => wrapCsvValue(col.label))]
      .concat(
        data.map((row) =>
          columns
            .map((col) =>
              wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format,
                row
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile(fileName + ".csv", content, "text/csv");

    if (status !== true) {
      notifyWarning("Browser denied file download...");
    }
  };

  return {
    exportToCsv,
  };
}
