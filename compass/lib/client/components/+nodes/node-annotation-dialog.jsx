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
var NodeAnnotationDialog_1;
import { observer } from "mobx-react";
import React from "react";
import { observable } from "mobx";
import { Dialog } from "../dialog";
import { Wizard, WizardStep } from "../wizard";
import { Notifications } from "../notifications";
import { SubTitle } from "../layout/sub-title";
import { Input } from "../input";
import { Node } from "../../api/endpoints";
import { apiBase } from "../../api";
let NodeAnnotationDialog = NodeAnnotationDialog_1 = class NodeAnnotationDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.host = "";
        this.rack = "";
        this.zone = "";
        this.close = () => {
            NodeAnnotationDialog_1.close();
        };
        this.onOpen = () => {
            try {
                this.host = this.node.metadata.labels["nuwa.kubernetes.io/host"];
            }
            catch (e) {
                this.host = "";
            }
            try {
                this.rack = this.node.metadata.labels["nuwa.kubernetes.io/rack"];
            }
            catch (e) {
                this.rack = "";
            }
            try {
                this.zone = this.node.metadata.labels["nuwa.kubernetes.io/zone"];
            }
            catch (e) {
                this.zone = "";
            }
        };
        this.reset = () => {
            this.host = "";
            this.rack = "";
            this.zone = "";
        };
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    "node": NodeAnnotationDialog_1.data.getName(),
                    "host": this.host,
                    "rack": this.rack,
                    "zone": this.zone,
                };
                let newObj = yield apiBase.post("/node/annotation/geo", { data }).
                    then((data) => {
                    this.reset();
                    this.close();
                });
                Notifications.ok(<>
          Node annotation geo succeeded
        </>);
            }
            catch (err) {
                Notifications.error(err);
            }
        });
    }
    static open(object) {
        NodeAnnotationDialog_1.isOpen = true;
        NodeAnnotationDialog_1.data = object;
    }
    static close() {
        NodeAnnotationDialog_1.isOpen = false;
    }
    get node() {
        return NodeAnnotationDialog_1.data;
    }
    render() {
        const header = <h5>`Node Annotation`</h5>;
        return (<Dialog isOpen={NodeAnnotationDialog_1.isOpen} close={this.close} onOpen={this.onOpen}>
        <Wizard className="NodeAnnotationDialog" header={header} done={this.close}>
          <WizardStep contentClass="flex gaps column" next={this.submit}>
            <SubTitle title={`nuwa.kubernetes.io/host`}/>
            <Input autoFocus required value={this.host} onChange={v => this.host = v}/>
            <SubTitle title={`nuwa.kubernetes.io/rack`}/>
            <Input autoFocus required value={this.rack} onChange={v => this.rack = v}/>
            <SubTitle title={`nuwa.kubernetes.io/zone`}/>
            <Input autoFocus required value={this.zone} onChange={v => this.zone = v}/>
          </WizardStep>
        </Wizard>
      </Dialog>);
    }
};
NodeAnnotationDialog.isOpen = false;
__decorate([
    observable,
    __metadata("design:type", String)
], NodeAnnotationDialog.prototype, "host", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], NodeAnnotationDialog.prototype, "rack", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], NodeAnnotationDialog.prototype, "zone", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], NodeAnnotationDialog, "isOpen", void 0);
__decorate([
    observable,
    __metadata("design:type", Node)
], NodeAnnotationDialog, "data", void 0);
NodeAnnotationDialog = NodeAnnotationDialog_1 = __decorate([
    observer
], NodeAnnotationDialog);
export { NodeAnnotationDialog };
//# sourceMappingURL=node-annotation-dialog.jsx.map