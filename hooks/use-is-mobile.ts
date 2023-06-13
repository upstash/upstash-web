import { useLayoutEffect, useState } from "react";
import { debounce } from "lodash";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    updateSize();

    window.addEventListener("resize", debounce(updateSize, 250));

    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
