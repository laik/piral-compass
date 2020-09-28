import { buildURL } from "../../navigation";
export const crdRoute = {
    path: "/crd"
};
export const crdDefinitionsRoute = {
    path: crdRoute.path + "/definitions"
};
export const crdResourcesRoute = {
    path: crdRoute.path + "/:group/:name"
};
export const crdURL = buildURL(crdDefinitionsRoute.path);
export const crdResourcesURL = buildURL(crdResourcesRoute.path);
//# sourceMappingURL=crd.route.js.map