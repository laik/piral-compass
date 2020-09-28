var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./dialog.scss";
import * as React from "react";
import { createPortal, findDOMNode } from "react-dom";
import { disposeOnUnmount, observer } from "mobx-react";
import { reaction } from "mobx";
import { Animate } from "../animate";
import { cssNames, noop, stopPropagation } from "../../utils";
import { navigation } from "../../navigation";
// fixme: handle animation end props.onClose() (await props.close()?)
let Dialog = class Dialog extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.closeOnNavigate = reaction(() => navigation.getPath(), () => this.close());
        this.state = {
            isOpen: this.props.isOpen,
        };
        this.onOpen = () => {
            this.props.onOpen();
            if (!this.props.pinned) {
                if (this.elem)
                    this.elem.addEventListener('click', this.onClickOutside);
                window.addEventListener('keydown', this.onEscapeKey);
            }
        };
        this.onClose = () => {
            this.props.onClose();
            if (!this.props.pinned) {
                if (this.elem)
                    this.elem.removeEventListener('click', this.onClickOutside);
                window.removeEventListener('keydown', this.onEscapeKey);
            }
        };
        this.onEscapeKey = (evt) => {
            const escapeKey = evt.code === "Escape";
            if (escapeKey) {
                this.close();
                evt.stopPropagation();
            }
        };
        this.onClickOutside = (evt) => {
            const target = evt.target;
            if (!this.contentElem.contains(target)) {
                this.close();
                evt.stopPropagation();
            }
        };
    }
    get elem() {
        return findDOMNode(this);
    }
    get isOpen() {
        return this.state.isOpen;
    }
    componentDidMount() {
        if (this.isOpen)
            this.onOpen();
    }
    componentDidUpdate(prevProps) {
        const { isOpen } = this.props;
        if (isOpen !== prevProps.isOpen) {
            this.toggle(isOpen);
        }
    }
    componentWillUnmount() {
        if (this.isOpen)
            this.onClose();
    }
    toggle(isOpen) {
        if (isOpen)
            this.open();
        else
            this.close();
    }
    open() {
        requestAnimationFrame(this.onOpen); // wait for render(), bind close-event to this.elem
        this.setState({ isOpen: true });
        this.props.open();
    }
    close() {
        this.onClose(); // must be first to get access to dialog's content from outside
        this.setState({ isOpen: false });
        this.props.close();
    }
    render() {
        const { modal, animated, pinned } = this.props;
        let { className } = this.props;
        className = cssNames("Dialog flex center", className, { modal, pinned });
        let dialog = (<div className={className} onClick={stopPropagation}>
        <div className="box" ref={e => this.contentElem = e}>
          {this.props.children}
        </div>
      </div>);
        if (animated) {
            dialog = (<Animate enter={this.isOpen} name="opacity-scale">
          {dialog}
        </Animate>);
        }
        else if (!this.isOpen) {
            return null;
        }
        return createPortal(dialog, document.body);
    }
};
Dialog.defaultProps = {
    isOpen: false,
    open: noop,
    close: noop,
    onOpen: noop,
    onClose: noop,
    modal: true,
    animated: true,
    pinned: false,
};
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], Dialog.prototype, "closeOnNavigate", void 0);
Dialog = __decorate([
    observer
], Dialog);
export { Dialog };
//# sourceMappingURL=dialog.jsx.map