var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var NamespaceNodeRangeLimitDialog_1;
import React from "react";
import { observer } from "mobx-react";
import { Dialog } from "../dialog";
import { observable } from "mobx";
import { Wizard, WizardStep } from "../wizard";
import { SubTitle } from "../layout/sub-title";
import { NodeSelect } from "../+nodes";
import { apiBase } from "../../api";
import { Notifications } from "../notifications";
import { Namespace } from "../../api/endpoints";
let NamespaceNodeRangeLimitDialog = NamespaceNodeRangeLimitDialog_1 = class NamespaceNodeRangeLimitDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.nodes = observable.array([], { deep: false });
        this.close = () => {
            NamespaceNodeRangeLimitDialog_1.close();
        };
        this.reset = () => {
            this.nodes = observable.array([], { deep: false });
        };
        this.onOpen = () => {
            let nodeResourceLimitTemps = [];
            NamespaceNodeRangeLimitDialog_1.namespace.getAnnotations().map(annotation => {
                const annotationKeyValue = annotation.split("=");
                if (annotationKeyValue[0] == "nuwa.kubernetes.io/default_resource_limit") {
                    nodeResourceLimitTemps = JSON.parse(annotationKeyValue[1]);
                }
            });
            nodeResourceLimitTemps.map(node => {
                if (this.nodes === null) {
                    this.nodes = observable.array([], { deep: false });
                }
                ;
                this.nodes.push(node.host);
            });
        };
        this.updateAnnotate = () => __awaiter(this, void 0, void 0, function* () {
            const data = {
                namespace: NamespaceNodeRangeLimitDialog_1.namespace.getName(),
                nodes: new Array()
            };
            this.nodes.map(node => {
                data.nodes.push(node);
            });
            try {
                yield apiBase.post("/namespaces/annotation/node", { data }).
                    then((data) => {
                    this.close();
                });
                Notifications.ok(<>{NamespaceNodeRangeLimitDialog_1.namespace.getName()} annotation succeeded</>);
            }
            catch (err) {
                Notifications.error(err);
            }
        });
    }
    static open(namespace) {
        NamespaceNodeRangeLimitDialog_1.isOpen = true;
        NamespaceNodeRangeLimitDialog_1.namespace = namespace;
    }
    static close() {
        NamespaceNodeRangeLimitDialog_1.isOpen = false;
    }
    render() {
        const dialogProps = __rest(this.props, []);
        const unwrapNodes = (options) => options.map(option => option.value);
        const header = <h5>`Annotate Node`</h5>;
        return (<Dialog {...dialogProps} className="NamespaceNodeRangeLimitDialog" isOpen={NamespaceNodeRangeLimitDialog_1.isOpen} onOpen={this.onOpen} close={this.close}>
                <Wizard header={header} done={this.close}>
                    <WizardStep contentClass="flow column" nextLabel={`Annotate`} next={this.updateAnnotate}>
                        <div className="node">
                            <SubTitle title={`Annotate Node`}/>
                            <NodeSelect isMulti value={this.nodes} placeholder={`Node`} themeName="light" className="box grow" onChange={(opts) => {
            if (!opts)
                opts = [];
            this.nodes.replace(unwrapNodes(opts));
        }}/>
                        </div>
                    </WizardStep>
                </Wizard>
            </Dialog>);
    }
};
NamespaceNodeRangeLimitDialog.isOpen = false;
__decorate([
    observable,
    __metadata("design:type", Object)
], NamespaceNodeRangeLimitDialog.prototype, "nodes", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], NamespaceNodeRangeLimitDialog, "isOpen", void 0);
__decorate([
    observable,
    __metadata("design:type", Namespace)
], NamespaceNodeRangeLimitDialog, "namespace", void 0);
NamespaceNodeRangeLimitDialog = NamespaceNodeRangeLimitDialog_1 = __decorate([
    observer
], NamespaceNodeRangeLimitDialog);
export { NamespaceNodeRangeLimitDialog };
//# sourceMappingURL=namespace-nodelimit-dialog.jsx.map