var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "./app-init.scss";
import React from "react";
import { render } from "react-dom";
import { CubeSpinner } from "../spinner";
import { apiBase } from "../../api";
export class AppInit extends React.Component {
    static start(rootElem) {
        return __awaiter(this, void 0, void 0, function* () {
            render(<AppInit />, rootElem); // show loading indicator asap
            yield AppInit.readyStateCheck(rootElem); // wait while all good to run
        });
    }
    static readyStateCheck(rootElem) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitingList = yield apiBase.get("/ready");
            if (waitingList.length > 0) {
                // update waiting state
                render(<AppInit serviceWaitingList={waitingList}/>, rootElem);
                // check again in 1-5 seconds
                return new Promise(resolve => {
                    const timeoutDelay = 1000 + Math.random() * 4000;
                    setTimeout(() => resolve(AppInit.readyStateCheck(rootElem)), timeoutDelay);
                });
            }
        });
    }
    render() {
        const { serviceWaitingList = [] } = this.props;
        const serviceNames = serviceWaitingList.join(", ");
        return (<div className="AppInit flex column center">
        <div className="box flex column gaps">
          <h5>Kontena Lens - {`Loading`}..</h5>
          {serviceWaitingList.length > 0 && (<p className="waiting-services">
              {`Waiting services to be running`}: <em className="text-secondary">{serviceNames}</em>
            </p>)}
          <CubeSpinner />
        </div>
      </div>);
    }
}
//# sourceMappingURL=app-init.jsx.map