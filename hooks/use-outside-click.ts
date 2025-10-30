import { useEffect, type RefObject } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    callBack: () => void
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callBack();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
};
