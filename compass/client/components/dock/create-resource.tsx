import "./create-resource.scss";

import React from "react";
import jsYaml from "js-yaml"
import {observable} from "mobx";
import {observer} from "mobx-react";
import {cssNames} from "../../utils";
import {createResourceStore} from "./create-resource.store";
import {IDockTab} from "./dock.store";
import {EditorPanel} from "./editor-panel";
import {InfoPanel} from "./info-panel";
import {resourceApplierApi} from "../../api/endpoints/resource-applier.api";
import {JsonApiErrorParsed} from "../../api/json-api";
import {Notifications} from "../notifications";

interface Props {
    className?: string;
    tab: IDockTab;
}

@observer
export class CreateResource extends React.Component<Props> {
    @observable error = ""

    get tabId() {
        return this.props.tab.id;
    }

    get data() {
        return createResourceStore.getData(this.tabId);
    }

    onChange = (value: string, error?: string) => {
        createResourceStore.setData(this.tabId, value);
        this.error = error;
    }

    create = async () => {

        if (this.error) return;
        const resources = jsYaml.safeLoadAll(this.data)
            .filter(v => !!v) // skip empty documents if "---" pasted at the beginning or end

        const createdResources: string[] = [];
        const errors: string[] = [];
        await Promise.all(
            resources.map(data => {
                return resourceApplierApi.update(data)
                    .then(item => createdResources.push(item.getName()))
                    .catch((err: JsonApiErrorParsed) => errors.push(err.toString()))
            })
        );
        if (errors.length) {
            errors.forEach(Notifications.error);
            if (!createdResources.length) throw errors[0];
        }
        return (
            <p>
                `<b>{createdResources.join(", ")}</b> successfully created`
            </p>
        )
    }

    render() {
        const {tabId, data, error, create, onChange} = this;
        const {className} = this.props;
        return (
            <div className={cssNames("CreateResource flex column", className)}>
                <EditorPanel
                    tabId={tabId}
                    value={data}
                    onChange={onChange}
                />
                <InfoPanel
                    tabId={tabId}
                    error={error}
                    submit={create}
                    submitLabel={`Create`}
                    showNotifications={false}
                />
            </div>
        )
    }
}
