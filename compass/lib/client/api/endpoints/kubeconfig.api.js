// Kubeconfig api
import { apiBase } from "../index";
export const kubeConfigApi = {
    getUserConfig() {
        return apiBase.get("/kubeconfig/user");
    },
    getServiceAccountConfig(account, namespace) {
        return apiBase.get(`/kubeconfig/service-account/${namespace}/${account}`);
    },
};
//# sourceMappingURL=kubeconfig.api.js.map