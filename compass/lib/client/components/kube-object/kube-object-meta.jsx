import React from "react";
import { DrawerItem, DrawerItemLabels } from "../drawer";
export class KubeObjectMeta extends React.Component {
    isHidden(field) {
        const { hideFields = KubeObjectMeta.defaultHiddenFields } = this.props;
        return hideFields.includes(field);
    }
    render() {
        const { getName, getNs, getLabels, getResourceVersion, selfLink, getAnnotations, getFinalizers, getId, getAge, metadata: { creationTimestamp }, } = this.props.object;
        return (<>
        <DrawerItem name={`Created`} hidden={this.isHidden("creationTimestamp")}>
          {getAge(true, false)} `ago` ({creationTimestamp})
        </DrawerItem>
        <DrawerItem name={`Name`} hidden={this.isHidden("name")}>
          {getName()}
        </DrawerItem>
        <DrawerItem name={`Namespace`} hidden={this.isHidden("namespace") || !getNs()}>
          {getNs()}
        </DrawerItem>
        <DrawerItem name={`UID`} hidden={this.isHidden("uid")}>
          {getId()}
        </DrawerItem>
        <DrawerItem name={`Link`} hidden={this.isHidden("selfLink")}>
          {selfLink}
        </DrawerItem>
        <DrawerItem name={`Resource Version`} hidden={this.isHidden("resourceVersion")}>
          {getResourceVersion()}
        </DrawerItem>
        <DrawerItemLabels name={`Labels`} labels={getLabels()} hidden={this.isHidden("labels")}/>
        <DrawerItemLabels name={`Annotations`} labels={getAnnotations()} hidden={this.isHidden("annotations")}/>
        <DrawerItemLabels name={`Finalizers`} labels={getFinalizers()} hidden={this.isHidden("finalizers")}/>
      </>);
    }
}
KubeObjectMeta.defaultHiddenFields = [
    "uid", "resourceVersion", "selfLink"
];
//# sourceMappingURL=kube-object-meta.jsx.map