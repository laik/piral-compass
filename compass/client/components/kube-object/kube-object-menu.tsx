import React from "react";
import { autobind, cssNames } from "../../utils";
import { KubeObject } from "../../api/kube-object";
import { editResourceTab } from "../dock/edit-resource.store";
import { MenuActions, MenuActionsProps } from "../menu/menu-actions";
import { hideDetails } from "../../navigation";
import { apiManager } from "../../api/api-manager";

export interface KubeObjectMenuProps<T extends KubeObject = any> extends MenuActionsProps {
  object: T;
  editable?: boolean;
  removable?: boolean;
}

export class KubeObjectMenu extends React.Component<KubeObjectMenuProps> {
  get store() {
    const { object } = this.props;
    if (!object) return;
    return apiManager.getStore(object.selfLink);
  }

  get isEditable() {
    const { editable } = this.props;
    return editable !== undefined ? editable : !!(this.store && this.store.update);
  }

  get isRemovable() {
    const { removable } = this.props;
    return removable !== undefined ? removable : !!(this.store && this.store.remove);
  }

  @autobind()
  async update() {
    hideDetails();
    editResourceTab(this.props.object);
  }

  @autobind()
  async remove() {
    hideDetails();
    const { object, removeAction } = this.props;
    if (removeAction) await removeAction();
    else await this.store.remove(object);
  }

  @autobind()
  renderRemoveMessage() {
    const { object } = this.props;
    const resourceKind = object.kind;
    const resourceName = object.getName();
    return (
      <p>`Remove {resourceKind} <b>{resourceName}</b>?`</p>
    )
  }

  render() {
    const { remove, update, renderRemoveMessage, isEditable, isRemovable } = this;
    const { className, object, editable, removable, ...menuProps } = this.props;
    return (
      <MenuActions
        className={cssNames("KubeObjectMenu", className)}
        updateAction={isEditable ? update : undefined}
        removeAction={isRemovable ? remove : undefined}
        removeConfirmationMessage={renderRemoveMessage}
        {...menuProps}
      />
    )
  }
}
