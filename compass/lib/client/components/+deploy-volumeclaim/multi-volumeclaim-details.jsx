var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observer } from "mobx-react";
import React from "react";
import { computed } from "mobx";
import { Icon } from "../icon";
import { volumeClaim } from "./common";
import { Grid, Paper } from "@material-ui/core";
import { SubTitle } from "../layout/sub-title";
import { Input } from "../input";
import { isNumber } from "../input/input.validators";
import { stopPropagation } from "../../utils";
let MultiVolumeClaimDetails = class MultiVolumeClaimDetails extends React.Component {
    constructor() {
        super(...arguments);
        this.add = () => {
            this.value.push(volumeClaim);
        };
        this.remove = (index) => {
            this.value.splice(index, 1);
        };
    }
    // @observable value: VolumeClaimTemplate[] = this.props.value || [volumeClaim]
    get value() {
        return this.props.value || [volumeClaim];
    }
    rVolumeClaim(index) {
        return (<>
        <br />
        <Paper elevation={3} style={{ padding: 25 }}>
          <Grid container spacing={5} alignItems="center" direction="row">
            <Grid item xs={11} zeroMinWidth>
              <SubTitle title={`Name`}/>
              <Input required={true} placeholder={`Name`} value={this.value[index].metadata.name} onChange={value => this.value[index].metadata.name = value}/>
              <SubTitle title={`Request Storage Size`}/>
              <Input required={true} placeholder={`Request Storage Size(MB)`} type="number" validators={isNumber} value={this.value[index].spec.resources.requests.storage} onChange={value => this.value[index].spec.resources.requests.storage = value}/>
            </Grid>
            <Grid item xs zeroMinWidth style={{ textAlign: "center" }}>
              <Icon style={{ margin: "0.8vw, 0.9vh" }} small tooltip={`Remove Environmen`} className="remove-icon" material="clear" onClick={(e) => {
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
        <SubTitle title={<>
              `VolumeClaim`
              &nbsp;&nbsp;
              <Icon material={"edit"} className={"editIcon"} onClick={event => {
            stopPropagation(event);
            this.add();
        }} small/>
            </>}>
        </SubTitle>
        {this.value.map((item, index) => {
            return (this.rVolumeClaim(index));
        })}
      </>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], MultiVolumeClaimDetails.prototype, "value", null);
MultiVolumeClaimDetails = __decorate([
    observer
], MultiVolumeClaimDetails);
export { MultiVolumeClaimDetails };
//# sourceMappingURL=multi-volumeclaim-details.jsx.map