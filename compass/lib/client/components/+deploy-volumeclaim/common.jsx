export function annotations() {
    let map = new Map();
    map.set("volume.alpha.kubernetes.io/storage-class", "default");
    return map;
}
export const volumeClaim = {
    metadata: {
        isUseDefaultStorageClass: true,
        name: "",
        annotations: annotations()
    },
    spec: {
        accessModes: ["ReadWriteOnce"],
        storageClassName: "",
        resources: {
            requests: {
                storage: "",
            }
        }
    }
};
//# sourceMappingURL=common.jsx.map