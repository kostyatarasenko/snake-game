import { useEffect, useLayoutEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const cbRef = useRef(callback);

  useLayoutEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => cbRef.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};
