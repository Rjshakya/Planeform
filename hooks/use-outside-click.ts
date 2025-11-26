import { useEffect, type RefObject } from "react";

export const useOutsideClick = <
  T extends HTMLDivElement | null = HTMLDivElement | null
>(
  ref: RefObject<T>,
  callBack: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref?.current && !ref?.current.contains(event.target as Node)) {
        callBack();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};
