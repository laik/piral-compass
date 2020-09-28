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
import "./logs-dialog.scss";
import * as React from "react";
import { Dialog } from "../dialog";
import { Wizard, WizardStep } from "../wizard";
import { copyToClipboard } from "../../utils";
import { Notifications } from "../notifications";
import { Button } from "../button";
import { Icon } from "../icon";
export class LogsDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.copyToClipboard = () => {
            if (copyToClipboard(this.logsElem)) {
                Notifications.ok(`Logs copied to clipboard.`);
            }
        };
    }
    render() {
        const _a = this.props, { title, logs } = _a, dialogProps = __rest(_a, ["title", "logs"]);
        const header = <h5>{title}</h5>;
        const customButtons = (<div className="buttons flex gaps align-center justify-space-between">
        <Button plain onClick={this.copyToClipboard}>
          <Icon material="assignment"/> `Copy to clipboard`
        </Button>
        <Button plain onClick={dialogProps.close}>
          `Close`
        </Button>
      </div>);
        return (<Dialog {...dialogProps} className="LogsDialog">
        <Wizard header={header} done={dialogProps.close}>
          <WizardStep scrollable={false} customButtons={customButtons}>
            <code ref={e => this.logsElem = e}>
              {logs || `There are no logs available.`}
            </code>
          </WizardStep>
        </Wizard>
      </Dialog>);
    }
}
//# sourceMappingURL=logs-dialog.jsx.map