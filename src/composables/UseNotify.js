import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySucess = (message) => {
    $q.notify({
      type: "positive",
      message: message || "Sucesso!...",
    });
  };

  const notifyWarning = (message) => {
    $q.notify({
      type: "warning",
      message: message || "Atenção!...",
    });
  };

  const notifyInfo = (message) => {
    $q.notify({
      type: "info",
      message: message || "Informação!...",
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || "Falhou!...",
    });
  };

  return {
    notifySucess,
    notifyInfo,
    notifyWarning,
    notifyError,
  };
}
