var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./service-details.scss";
import React from "react";
import { observer } from "mobx-react";
import { SubTitle } from "../layout/sub-title";
import { Select } from "../select";
import { Icon } from "../icon";
import { Input } from "../input";
import { isNumber } from "../input/input.validators";
import { computed, observable } from "mobx";
import { deployPort, deployService } from "./common";
import { Paper, Grid } from "@material-ui/core";
import { stopPropagation } from "../../utils";
let DeployServiceDetails = class DeployServiceDetails extends React.Component {
    constructor() {
        super(...arguments);
        // @observable value: Service = this.props.value || deployService;
        this.Index = 0;
    }
    get value() {
        return this.props.value || deployService;
    }
    get typeOptions() {
        return [
            "ClusterIP",
            "NodePort",
            "LoadBalancer",
        ];
    }
    get protocolOptions() {
        return [
            "TCP",
            "UDP"
        ];
    }
    add() {
        this.value.ports.push(deployPort);
    }
    remove(index) {
        this.value.ports.splice(index, 1);
    }
    rPorts(index) {
        return (<>
        <br />
        <Paper elevation={3} style={{ padding: 25 }}>
          <Grid container spacing={5} alignItems="center" direction="row">
            <Grid item xs={11} zeroMinWidth>
              <Grid>
                <SubTitle title={`Name`}/>
                <Input className="item" required={true} placeholder={`Name`} value={this.value.ports[index].name} onChange={(value) => {
            this.value.ports[index].name = value;
        }}/>
                <SubTitle title={`Protocol`}/>
                <Select options={this.protocolOptions} value={this.value.ports[index].protocol} onChange={v => {
            this.value.ports[index].protocol = v.value;
        }}/>
              </Grid>
              <br />
              <Grid container spacing={5} alignItems="center" direction="row">
                <Grid item xs zeroMinWidth>
                  <SubTitle title={`Port`}/>
                  <Input required={true} placeholder={`Port`} type="number" validators={isNumber} value={this.value.ports[index].port} onChange={value => this.value.ports[index].port = value}/>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <SubTitle title={`TargetPort`}/>
                  <Input required={true} placeholder={`TargetPort`} type="number" validators={isNumber} value={this.value.ports[index].targetPort} onChange={value => this.value.ports[index].targetPort = value}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth style={{ textAlign: "center" }}>
              <Icon small tooltip={`Remove Ports`} style={{ margin: "0.8vw, 0.9vh" }} className="remove-icon" material="clear" onClick={(e) => {
            this.remove(index);
            e.stopPropagation();
        }}/>
            </Grid>
          </Grid>
        </Paper>
      </>);
    }
    render() {
        return (<>
        <SubTitle title={`Service Type`}/>
        <Select options={this.typeOptions} value={this.value.type} onChange={v => {
            this.value.type = v.value;
        }}/>
        <SubTitle title={<>
              Ports
              &nbsp;&nbsp;
              <Icon material={"edit"} className={"editIcon"} onClick={event => {
            stopPropagation(event);
            this.add();
        }} small/>
            </>}>
        </SubTitle>
        {this.value.ports.map((item, index) => {
            return this.rPorts(index);
        })}
      </>);
    }
};
__decorate([
    observable,
    __metadata("design:type", Number)
], DeployServiceDetails.prototype, "Index", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DeployServiceDetails.prototype, "value", null);
DeployServiceDetails = __decorate([
    observer
], DeployServiceDetails);
export { DeployServiceDetails };
//# sourceMappingURL=service-details.jsx.map