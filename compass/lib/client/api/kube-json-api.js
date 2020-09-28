import { JsonApi } from "./json-api";
export class KubeJsonApi extends JsonApi {
    parseError(error, res) {
        const { status, reason, message } = error;
        if (status && reason) {
            return [message || `${status}: ${reason}`];
        }
        return super.parseError(error, res);
    }
}
//# sourceMappingURL=kube-json-api.js.map