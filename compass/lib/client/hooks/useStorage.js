import { useState } from "react";
import { createStorage } from "../utils";
export function useStorage(key, initialValue, options) {
    const storage = createStorage(key, initialValue, options);
    const [storageValue, setStorageValue] = useState(storage.get());
    const setValue = (value) => {
        setStorageValue(value);
        storage.set(value);
    };
    return [storageValue, setValue];
}
//# sourceMappingURL=useStorage.js.map