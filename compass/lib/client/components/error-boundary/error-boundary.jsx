var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./error-boundary.scss";
import React from "react";
import { reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { Button } from "../button";
import { configStore } from "../../config.store";
import { navigation } from "../../navigation";
let ErrorBoundary = class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.resetOnNavigate = reaction(() => navigation.getPath(), () => this.setState({ error: null, errorInfo: null }));
        this.back = () => {
            navigation.goBack();
        };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }
    render() {
        const { error, errorInfo } = this.state;
        if (error) {
            const slackLink = <a href="https://github.com/yametech" target="_blank">Yametech GitHub</a>;
            const githubLink = <a href="https://github.com/yametech/issues" target="_blank">Yametech GitHub</a>;
            const pageUrl = location.href;
            return (<div className="ErrorBoundary flex column gaps">
          <h5>
            `App crash at <span className="contrast">{pageUrl}</span>`
            {configStore.buildVersion && <p>`Build version`: {configStore.buildVersion}</p>}
          </h5>
          <p>
            `
              To help us improve the product please report bugs to {slackLink} community or {githubLink} issues tracker.
            `
          </p>
          <div className="flex gaps">
            <code>
              <p className="contrast">`Component stack`:</p>
              {errorInfo.componentStack}
            </code>
            <code className="box grow">
              <p className="contrast">`Error stack`:</p> <br />
              {error.stack}
            </code>
          </div>
          <Button className="box self-flex-start" primary label={`Back`} onClick={this.back}/>
        </div>);
        }
        return this.props.children;
    }
};
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], ErrorBoundary.prototype, "resetOnNavigate", void 0);
ErrorBoundary = __decorate([
    observer
], ErrorBoundary);
export { ErrorBoundary };
//# sourceMappingURL=error-boundary.jsx.map