var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Animate_1;
import "./animate.scss";
import * as React from "react";
import { observable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { autobind, cssNames, noop } from "../../utils";
let Animate = Animate_1 = class Animate extends React.Component {
    constructor() {
        super(...arguments);
        this.isVisible = !!this.props.enter;
        this.statusClassName = {
            enter: false,
            leave: false
        };
    }
    get contentElem() {
        return React.Children.only(this.props.children);
    }
    componentDidMount() {
        disposeOnUnmount(this, [
            reaction(() => this.props.enter, enter => {
                if (enter)
                    this.enter();
                else
                    this.leave();
            }, {
                delay: Animate_1.VISIBILITY_DELAY_MS,
                fireImmediately: true,
            })
        ]);
    }
    enter() {
        this.isVisible = true; // triggers render() to apply css-animation in existing dom
        requestAnimationFrame(() => {
            this.statusClassName.enter = true;
            this.props.onEnter();
        });
    }
    leave() {
        if (!this.isVisible)
            return;
        this.statusClassName.leave = true;
        this.props.onLeave();
    }
    reset() {
        this.isVisible = false;
        this.statusClassName.enter = false;
        this.statusClassName.leave = false;
    }
    onTransitionEnd(evt) {
        const { enter, leave } = this.statusClassName;
        const { onTransitionEnd } = this.contentElem.props;
        if (onTransitionEnd)
            onTransitionEnd(evt);
        // todo: check evt.propertyName and make sure all animating props has finished their transition
        if (enter && leave) {
            this.reset();
        }
    }
    render() {
        const { name, enabled, children } = this.props;
        if (!enabled) {
            return children;
        }
        const contentElem = this.contentElem;
        return React.cloneElement(contentElem, {
            className: cssNames("Animate", name, contentElem.props.className, this.statusClassName),
            children: this.isVisible ? contentElem.props.children : null,
            onTransitionEnd: this.onTransitionEnd,
        });
    }
};
Animate.VISIBILITY_DELAY_MS = 100;
Animate.defaultProps = {
    name: "opacity",
    enter: true,
    enabled: true,
    onEnter: noop,
    onLeave: noop,
};
__decorate([
    observable,
    __metadata("design:type", Object)
], Animate.prototype, "isVisible", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], Animate.prototype, "statusClassName", void 0);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Animate.prototype, "onTransitionEnd", null);
Animate = Animate_1 = __decorate([
    observer
], Animate);
export { Animate };
//# sourceMappingURL=animate.jsx.map