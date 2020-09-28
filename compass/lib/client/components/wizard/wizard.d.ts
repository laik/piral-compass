import "./wizard.scss";
import * as React from "react";
interface WizardCommonProps<D = any> {
    data?: Partial<D>;
    save?: (data: Partial<D>, callback?: () => void) => void;
    reset?: () => void;
    done?: () => void;
    hideSteps?: boolean;
}
export interface WizardProps extends WizardCommonProps {
    className?: string;
    step?: number;
    title?: string;
    header?: React.ReactNode;
    onChange?: (step: number) => void;
}
interface State {
    step?: number;
}
export declare class Wizard extends React.Component<WizardProps, State> {
    state: State;
    get steps(): React.ReactElement<WizardStepProps<any>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    get step(): number;
    set step(step: number);
    protected getValidStep(step: number): number;
    isFirstStep: () => boolean;
    isLastStep: () => boolean;
    firstStep: () => any;
    nextStep: () => any;
    prevStep: () => any;
    lastStep: () => any;
    render(): JSX.Element;
}
export interface WizardStepProps<D = any> extends WizardCommonProps<D> {
    wizard?: Wizard;
    title?: string;
    className?: string | object;
    contentClass?: string | object;
    customButtons?: React.ReactNode;
    moreButtons?: React.ReactNode;
    loading?: boolean;
    waiting?: boolean;
    disabledNext?: boolean;
    hideNextBtn?: boolean;
    hideBackBtn?: boolean;
    step?: number;
    prevLabel?: React.ReactNode;
    nextLabel?: React.ReactNode;
    next?: () => void | boolean | Promise<any>;
    prev?: () => void;
    first?: () => void;
    last?: () => void;
    isFirst?: () => boolean;
    isLast?: () => boolean;
    beforeContent?: React.ReactNode;
    afterContent?: React.ReactNode;
    noValidate?: boolean;
    skip?: boolean;
    scrollable?: boolean;
}
interface WizardStepState {
    waiting?: boolean;
}
export declare class WizardStep extends React.Component<WizardStepProps, WizardStepState> {
    private form;
    state: WizardStepState;
    private unmounting;
    static defaultProps: WizardStepProps;
    componentWillUnmount(): void;
    prev: () => void;
    next: () => void;
    submit: () => void;
    renderLoading(): JSX.Element;
    render(): JSX.Element;
}
export {};
