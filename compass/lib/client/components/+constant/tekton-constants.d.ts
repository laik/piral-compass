export declare const taskName = "taskName";
export declare const defaultTaskName = "node-1-1";
export declare const defaultNodeId = "1-1";
export declare enum NodeStatus {
    Pending = "Pending",
    Failed = "Failed",
    Running = "Running",
    Progress = "Progress",
    Succeeded = "Succeeded",
    Cancel = "TaskRunCancelled",
    Timeout = "TaskRunTimeout"
}
export declare enum NodeStatusColor {
    Pending = "#ffc12f",
    Failed = "red",
    Running = "#3296fa",
    Progress = "#3296fa",
    Succeeded = "#20d867",
    Cancel = "#3296fa",
    Timeout = "#f02b2b"
}
export declare enum PipelineStatus {
    Succeeded = "Succeeded",
    Completed = "Completed",
    Running = "Running",
    Started = "Started",
    PipelineRunCancelled = "PipelineRunCancelled"
}
export declare const tektonStoreNamespace = "tekton-store";
export declare const graphAnnotationKey = "fuxi.nip.io/tektongraphs";
export declare const runGraphAnnotationKey = "fuxi.nip.io/run-tektongraphs";
