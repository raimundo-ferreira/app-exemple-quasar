import { setCssVar, getCssVar } from "quasar";
import { useQuasar } from "quasar";

export default function useBrand() {
  const $q = useQuasar();

  const setBrand = (primary, secondary) => {
    if (primary) {
      setCssVar("primary", primary);
      $q.localStorage.set("primary", primary);
    }

    if (secondary) {
      setCssVar("secondary", secondary);
      $q.localStorage.set("secondary", secondary);
    }
  };

  const getBrandPrimary = () => {
    return getCssVar("primary");
  };

  const getBrandSecondary = () => {
    return getCssVar("secondary");
  };

  return {
    setBrand,
    getBrandPrimary,
    getBrandSecondary,
  };
}
