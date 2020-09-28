import * as React from "react";
import { createTerminalTab, terminalStore } from "../dock/terminal.store";
import { KubeObjectMenu } from "../kube-object";
import { MenuItem } from "../menu";
import { Icon } from "../icon";
import { hideDetails } from "../../navigation";
import { NodeAnnotationDialog } from "./node-annotation-dialog";
export function NodeMenu(props) {
    const { object: node, toolbar } = props;
    if (!node)
        return null;
    const nodeName = node.getName();
    const sendToTerminal = (command) => {
        terminalStore.sendCommand(command, {
            enter: true,
            newTab: true,
        });
        hideDetails();
    };
    const shell = () => {
        createTerminalTab({
            title: `Shell: ${nodeName}`,
            node: nodeName,
        });
        hideDetails();
    };
    return (<KubeObjectMenu {...props}>
      <MenuItem onClick={shell}>
        <Icon svg="ssh" interactive={toolbar} title={`Node shell`}/>
        <span className="title">`Shell`</span>
      </MenuItem>
      <MenuItem onClick={() => NodeAnnotationDialog.open(node)}>
        <Icon material="cloud_queue" interactive={toolbar} title={`Label Node GEO`}/>
        <span className="title">`LabelNodeGEO`</span>
      </MenuItem>

    </KubeObjectMenu>);
}
//# sourceMappingURL=node-menu.jsx.map