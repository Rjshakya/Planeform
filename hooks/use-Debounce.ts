import { useCallback, useEffect, useRef, useState } from "react";

export const useDebounceCallBack = (
  fn: (params?: any) => void,
  delay: number
) => {
  const [params, setParams] = useState();
  const fnRef = useRef(fn);

  // Keep fn reference updated without triggering effect
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  useEffect(() => {
    const timer = setTimeout(() => {
      fn(params);
    }, delay);

    return () => clearTimeout(timer);
  }, [ delay, params]);

  return useCallback((params?: any) => {
    setParams(params);
  }, []);
};
