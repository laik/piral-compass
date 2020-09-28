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
import "./input.scss";
import React from "react";
import { autobind, cssNames, debouncePromise } from "../../utils";
import { Icon } from "../icon";
import { conditionalValidators } from "./input.validators";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";
import isBoolean from "lodash/isBoolean";
import uniqueId from "lodash/uniqueId";
const defaultProps = {
    rows: 1,
    maxRows: 10000,
    showValidationLine: true,
    validators: [],
};
export class Input extends React.Component {
    constructor() {
        super(...arguments);
        this.validators = [];
        this.state = {
            dirty: !!this.props.dirty,
            valid: true,
            errors: [],
        };
    }
    setValue(value) {
        if (value !== this.getValue()) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(this.input.constructor.prototype, "value").set;
            nativeInputValueSetter.call(this.input, value);
            const evt = new Event("input", { bubbles: true });
            this.input.dispatchEvent(evt);
        }
    }
    getValue() {
        const { value, defaultValue = "" } = this.props;
        if (value !== undefined)
            return value; // controlled input
        if (this.input)
            return this.input.value; // uncontrolled input
        return defaultValue;
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    select() {
        this.input.select();
    }
    autoFitHeight() {
        const { multiLine, rows, maxRows } = this.props;
        if (!multiLine) {
            return;
        }
        const textArea = this.input;
        const lineHeight = parseFloat(window.getComputedStyle(textArea).lineHeight);
        const rowsCount = (this.getValue().match(/\n/g) || []).length + 1;
        const height = lineHeight * Math.min(Math.max(rowsCount, rows), maxRows);
        textArea.style.height = height + "px";
    }
    validate(value = this.getValue()) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationId = (this.validationId = ""); // reset every time for async validators
            const asyncValidators = [];
            let errors = [];
            // run validators
            for (const validator of this.validators) {
                if (errors.length) {
                    // stop validation check if there is an error already
                    break;
                }
                const result = validator.validate(value, this.props);
                if (isBoolean(result) && !result) {
                    errors.push(this.getValidatorError(value, validator));
                }
                else if (result instanceof Promise) {
                    if (!validationId) {
                        this.validationId = validationId = uniqueId("validation_id_");
                    }
                    asyncValidators.push(result.then(() => null, // don't consider any valid result from promise since we interested in errors only
                    // don't consider any valid result from promise since we interested in errors only
                    error => this.getValidatorError(value, validator) || error));
                }
            }
            // save sync validators result first
            this.setValidation(errors);
            // handle async validators result
            if (asyncValidators.length > 0) {
                this.setState({ validating: true, valid: false, });
                const asyncErrors = yield Promise.all(asyncValidators);
                const isLastValidationCheck = this.validationId === validationId;
                if (isLastValidationCheck) {
                    errors = this.state.errors.concat(asyncErrors.filter(err => err));
                    this.setValidation(errors);
                }
            }
            this.input.setCustomValidity(errors.length ? errors[0].toString() : "");
        });
    }
    setValidation(errors) {
        this.setState({
            validating: false,
            valid: !errors.length,
            errors: errors,
        });
    }
    getValidatorError(value, { message }) {
        if (isFunction(message))
            return message(value, this.props);
        return message || "";
    }
    setupValidators() {
        this.validators = conditionalValidators
            // add conditional validators if matches input props
            .filter(validator => validator.condition(this.props))
            // add custom validators
            .concat(this.props.validators)
            // debounce async validators
            .map((_a) => {
            var { debounce } = _a, validator = __rest(_a, ["debounce"]);
            if (debounce)
                validator.validate = debouncePromise(validator.validate, debounce);
            return validator;
        });
        // run validation
        this.validate();
    }
    setDirty(dirty = true) {
        if (this.state.dirty === dirty)
            return;
        this.setState({ dirty });
    }
    onFocus(evt) {
        const { onFocus } = this.props;
        if (onFocus)
            onFocus(evt);
        this.setState({ focused: true });
    }
    onBlur(evt) {
        const { onBlur } = this.props;
        if (onBlur)
            onBlur(evt);
        if (this.state.dirtyOnBlur)
            this.setState({ dirty: true, dirtyOnBlur: false });
        this.setState({ focused: false });
    }
    onChange(evt) {
        if (this.props.onChange) {
            this.props.onChange(evt.currentTarget.value, evt);
        }
        this.validate();
        this.autoFitHeight();
        // mark input as dirty for the first time only onBlur() to avoid immediate error-state show when start typing
        if (!this.state.dirty)
            this.setState({ dirtyOnBlur: true });
        // re-render component when used as uncontrolled input
        // when used @defaultValue instead of @value changing real input.value doesn't call render()
        if (this.isUncontrolled && this.showMaxLenIndicator) {
            this.forceUpdate();
        }
    }
    get showMaxLenIndicator() {
        const { maxLength, multiLine } = this.props;
        return maxLength && multiLine;
    }
    get isUncontrolled() {
        return this.props.value === undefined;
    }
    componentDidMount() {
        this.setupValidators();
        this.autoFitHeight();
    }
    componentDidUpdate(prevProps) {
        const { defaultValue, value, dirty, validators } = this.props;
        if (prevProps.value !== value || defaultValue !== prevProps.defaultValue) {
            this.validate();
            this.autoFitHeight();
        }
        if (prevProps.dirty !== dirty) {
            this.setDirty(dirty);
        }
        if (prevProps.validators !== validators) {
            this.setupValidators();
        }
    }
    bindRef(elem) {
        this.input = elem;
    }
    render() {
        const _a = this.props, { multiLine, showValidationLine, validators, theme, maxRows, children } = _a, inputProps = __rest(_a, ["multiLine", "showValidationLine", "validators", "theme", "maxRows", "children"]);
        let { className, iconLeft, iconRight } = this.props;
        const { maxLength, rows, disabled } = this.props;
        const { focused, dirty, valid, validating, errors } = this.state;
        className = cssNames("Input", className, {
            [`theme ${theme}`]: theme,
            focused: focused,
            disabled: disabled,
            invalid: !valid,
            dirty: dirty,
            validating: validating,
            validatingLine: validating && showValidationLine,
        });
        // normalize icons
        if (isString(iconLeft))
            iconLeft = <Icon material={iconLeft}/>;
        if (isString(iconRight))
            iconRight = <Icon material={iconRight}/>;
        // prepare input props
        Object.assign(inputProps, {
            className: "input box grow",
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
            rows: multiLine ? (rows || 1) : null,
            ref: this.bindRef,
        });
        return (<div className={className}>
        <label className="input-area flex gaps align-center">
          {iconLeft}
          {multiLine ? <textarea {...inputProps}/> : <input {...inputProps}/>}
          {iconRight}
        </label>
        <div className="input-info flex gaps">
          {!valid && dirty && (<div className="errors box grow">
              {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>)}
          {this.showMaxLenIndicator && (<div className="maxLengthIndicator box right">
              {this.getValue().length} / {maxLength}
            </div>)}
        </div>
      </div>);
    }
}
Input.defaultProps = defaultProps;
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Input.prototype, "onFocus", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Input.prototype, "onBlur", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Input.prototype, "onChange", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Input.prototype, "bindRef", null);
//# sourceMappingURL=input.jsx.map