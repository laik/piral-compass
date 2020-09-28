// Type guard for checking valid react node to use in render
import React from "react";
export function isReactNode(node) {
    return React.isValidElement(node)
        || Array.isArray(node) && node.every(isReactNode)
        || node == null
        || typeof node !== "object";
}
//# sourceMappingURL=isReactNode.js.map