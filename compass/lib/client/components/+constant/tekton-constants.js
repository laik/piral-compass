export const taskName = "taskName";
export const defaultTaskName = "node-1-1";
export const defaultNodeId = "1-1";
export var NodeStatus;
(function (NodeStatus) {
    NodeStatus["Pending"] = "Pending";
    NodeStatus["Failed"] = "Failed";
    NodeStatus["Running"] = "Running";
    NodeStatus["Progress"] = "Progress";
    NodeStatus["Succeeded"] = "Succeeded";
    NodeStatus["Cancel"] = "TaskRunCancelled";
    NodeStatus["Timeout"] = "TaskRunTimeout";
})(NodeStatus || (NodeStatus = {}));
export var NodeStatusColor;
(function (NodeStatusColor) {
    NodeStatusColor["Pending"] = "#ffc12f";
    NodeStatusColor["Failed"] = "red";
    NodeStatusColor["Running"] = "#3296fa";
    NodeStatusColor["Progress"] = "#3296fa";
    NodeStatusColor["Succeeded"] = "#20d867";
    NodeStatusColor["Cancel"] = "#3296fa";
    NodeStatusColor["Timeout"] = "#f02b2b";
})(NodeStatusColor || (NodeStatusColor = {}));
export var PipelineStatus;
(function (PipelineStatus) {
    PipelineStatus["Succeeded"] = "Succeeded";
    PipelineStatus["Completed"] = "Completed";
    PipelineStatus["Running"] = "Running";
    PipelineStatus["Started"] = "Started";
    PipelineStatus["PipelineRunCancelled"] = "PipelineRunCancelled";
})(PipelineStatus || (PipelineStatus = {}));
export const tektonStoreNamespace = "tekton-store";
export const graphAnnotationKey = "fuxi.nip.io/tektongraphs";
export const runGraphAnnotationKey = "fuxi.nip.io/run-tektongraphs";
//# sourceMappingURL=tekton-constants.js.map