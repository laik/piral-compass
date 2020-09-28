import { useEffect } from "react";
export function useOnUnmount(callback) {
    useEffect(() => callback, []);
}
//# sourceMappingURL=useOnUnmount.js.map