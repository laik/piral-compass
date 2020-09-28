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
import "./wizard.scss";
import * as React from "react";
import { cssNames, prevDefault } from "../../utils";
import { Button } from "../button";
import { Stepper } from "../stepper";
import { SubTitle } from "../layout/sub-title";
import { Spinner } from "../spinner";
export class Wizard extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            step: this.getValidStep(this.props.step)
        };
        this.isFirstStep = () => this.step === 1;
        this.isLastStep = () => this.step === this.steps.length;
        this.firstStep = () => this.step = 1;
        this.nextStep = () => this.step++;
        this.prevStep = () => this.step--;
        this.lastStep = () => this.step = this.steps.length;
    }
    get steps() {
        const _a = this.props, { className, title, step, header, onChange, children } = _a, commonProps = __rest(_a, ["className", "title", "step", "header", "onChange", "children"]);
        const steps = React.Children.toArray(children);
        return steps.filter(step => !step.props.skip).map((stepElem, i) => {
            const stepProps = stepElem.props;
            return React.cloneElement(stepElem, Object.assign(Object.assign({ step: i + 1, wizard: this, next: this.nextStep, prev: this.prevStep, first: this.firstStep, last: this.lastStep, isFirst: this.isFirstStep, isLast: this.isLastStep }, commonProps), stepProps));
        });
    }
    get step() {
        return this.state.step;
    }
    set step(step) {
        step = this.getValidStep(step);
        if (step === this.step)
            return;
        this.setState({ step }, () => {
            if (this.props.onChange) {
                this.props.onChange(step);
            }
        });
    }
    getValidStep(step) {
        return Math.min(Math.max(1, step), this.steps.length) || 1;
    }
    render() {
        const { className, title, header, hideSteps } = this.props;
        const steps = this.steps.map(stepElem => ({ title: stepElem.props.title }));
        const step = React.cloneElement(this.steps[this.step - 1]);
        return (<div className={cssNames("Wizard", className)}>
        <div className="header">
          {header}
          {title ? <SubTitle title={title}/> : null}
          {!hideSteps && steps.length > 1 ? <Stepper steps={steps} step={this.step}/> : null}
        </div>
        {step}
      </div>);
    }
}
export class WizardStep extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.unmounting = false;
        this.prev = () => {
            const { isFirst, prev, done } = this.props;
            if (isFirst() && done)
                done();
            else
                prev();
        };
        this.next = () => {
            const next = this.props.next;
            const nextStep = this.props.wizard.nextStep;
            if (nextStep !== next) {
                const result = next();
                if (result instanceof Promise) {
                    this.setState({ waiting: true });
                    result.then(nextStep).finally(() => {
                        if (this.unmounting)
                            return;
                        this.setState({ waiting: false });
                    });
                }
                else if (typeof result === "boolean" && result) {
                    nextStep();
                }
            }
            else {
                nextStep();
            }
        };
        this.submit = () => {
            if (!this.form.noValidate) {
                const valid = this.form.checkValidity();
                if (!valid)
                    return;
            }
            this.next();
        };
    }
    componentWillUnmount() {
        this.unmounting = true;
    }
    renderLoading() {
        return (<div className="step-loading flex center">
        <Spinner />
      </div>);
    }
    render() {
        const { step, isFirst, isLast, children, loading, customButtons, disabledNext, scrollable, hideNextBtn, hideBackBtn, beforeContent, afterContent, noValidate, skip, moreButtons, } = this.props;
        let { className, contentClass, nextLabel, prevLabel, waiting } = this.props;
        if (skip) {
            return;
        }
        waiting = (waiting !== undefined) ? waiting : this.state.waiting;
        className = cssNames(`WizardStep step${step}`, className);
        contentClass = cssNames("step-content", { scrollable }, contentClass);
        prevLabel = prevLabel || (isFirst() ? `Cancel` : `Back`);
        nextLabel = nextLabel || (isLast() ? `Submit` : `Next`);
        return (<form className={className} onSubmit={prevDefault(this.submit)} noValidate={noValidate} ref={e => this.form = e}>
        {beforeContent}
        <div className={contentClass}>
          {loading ? this.renderLoading() : children}
        </div>
        {customButtons !== undefined ? customButtons : (<div className="buttons flex gaps align-center">
            {moreButtons}
            <Button className="back-btn" plain label={prevLabel} hidden={hideBackBtn} onClick={this.prev}/>
            <Button primary type="submit" label={nextLabel} hidden={hideNextBtn} waiting={waiting} disabled={disabledNext}/>
          </div>)}
        {afterContent}
      </form>);
    }
}
WizardStep.defaultProps = {
    scrollable: true,
};
//# sourceMappingURL=wizard.jsx.map