var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import './menu.scss';
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { autobind, cssNames, noop } from "../../utils";
import { Animate } from "../animate";
import { Icon } from "../icon";
import debounce from "lodash/debounce";
export const MenuContext = React.createContext(null);
const defaultPropsMenu = {
    position: { right: true, bottom: true },
    autoFocus: false,
    usePortal: false,
    closeOnClickItem: true,
    closeOnClickOutside: true,
    closeOnScroll: false,
};
let Menu = class Menu extends React.Component {
    constructor() {
        super(...arguments);
        this.items = {};
        this.state = {};
        this.refreshPosition = debounce(() => {
            if (!this.props.usePortal || !this.opener)
                return;
            const { width, height } = this.opener.getBoundingClientRect();
            let { left, top, bottom, right } = this.opener.getBoundingClientRect();
            const withScroll = window.getComputedStyle(this.elem).position !== "fixed";
            // window global scroll corrections
            if (withScroll) {
                left += window.pageXOffset;
                top += window.pageYOffset;
                right = left + width;
                bottom = top + height;
            }
            // setup initial position
            const position = { left: true, bottom: true };
            this.elem.style.left = left + "px";
            this.elem.style.top = bottom + "px";
            // correct position if menu doesn't fit to viewport
            const menuPos = this.elem.getBoundingClientRect();
            if (menuPos.right > window.innerWidth) {
                this.elem.style.left = (right - this.elem.offsetWidth) + "px";
                position.right = true;
                delete position.left;
            }
            if (menuPos.bottom > window.innerHeight) {
                this.elem.style.top = (top - this.elem.offsetHeight) + "px";
                position.top = true;
                delete position.bottom;
            }
            this.setState({ position });
        }, Animate.VISIBILITY_DELAY_MS);
    }
    get isOpen() {
        return !!this.props.isOpen;
    }
    componentDidMount() {
        if (!this.props.usePortal) {
            const parent = this.elem.parentElement;
            const position = window.getComputedStyle(parent).position;
            if (position === 'static')
                parent.style.position = 'relative';
        }
        else if (this.isOpen) {
            this.refreshPosition();
        }
        this.opener = document.getElementById(this.props.htmlFor); // might not exist in sub-menus
        if (this.opener) {
            this.opener.addEventListener('click', this.toggle);
            this.opener.addEventListener('keydown', this.onKeyDown);
        }
        this.elem.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('click', this.onClickOutside, true);
        window.addEventListener('scroll', this.onScrollOutside, true);
    }
    componentWillUnmount() {
        if (this.opener) {
            this.opener.removeEventListener('click', this.toggle);
            this.opener.removeEventListener('keydown', this.onKeyDown);
        }
        this.elem.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('click', this.onClickOutside, true);
        window.removeEventListener('scroll', this.onScrollOutside, true);
    }
    get focusableItems() {
        return Object.values(this.items).filter(item => item.isFocusable);
    }
    get focusedItem() {
        return this.focusableItems.find(item => item.elem === document.activeElement);
    }
    focusNextItem(reverse = false) {
        const items = this.focusableItems;
        const activeIndex = items.findIndex(item => item === this.focusedItem);
        if (!items.length) {
            return;
        }
        if (activeIndex > -1) {
            let nextItem = reverse ? items[activeIndex - 1] : items[activeIndex + 1];
            if (!nextItem)
                nextItem = items[activeIndex];
            nextItem.elem.focus();
        }
        else {
            items[0].elem.focus();
        }
    }
    open() {
        if (this.isOpen)
            return;
        this.props.open();
        this.refreshPosition();
        if (this.props.autoFocus)
            this.focusNextItem();
    }
    close() {
        if (!this.isOpen)
            return;
        this.props.close();
    }
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    onKeyDown(evt) {
        if (!this.isOpen)
            return;
        switch (evt.code) {
            case "Escape":
                this.close();
                break;
            case "Space":
            case "Enter":
                const focusedItem = this.focusedItem;
                if (focusedItem) {
                    focusedItem.elem.click();
                    evt.preventDefault();
                }
                break;
            case "ArrowUp":
                this.focusNextItem(true);
                break;
            case "ArrowDown":
                this.focusNextItem();
                break;
        }
    }
    onWindowResize(evt) {
        if (!this.isOpen)
            return;
        this.refreshPosition();
    }
    onScrollOutside(evt) {
        if (!this.isOpen)
            return;
        const target = evt.target;
        const { usePortal, closeOnScroll } = this.props;
        if (usePortal && closeOnScroll && !target.contains(this.elem)) {
            this.close();
        }
    }
    onClickOutside(evt) {
        if (!this.props.closeOnClickOutside)
            return;
        if (!this.isOpen || evt.target === document.body)
            return;
        const target = evt.target;
        const clickInsideMenu = this.elem.contains(target);
        const clickOnOpener = this.opener && this.opener.contains(target);
        if (!clickInsideMenu && !clickOnOpener) {
            this.close();
        }
    }
    bindRef(elem) {
        this.elem = elem;
    }
    bindItemRef(item, index) {
        this.items[index] = item;
    }
    render() {
        const { position } = this.props;
        let { className, usePortal } = this.props;
        className = cssNames('Menu', className, this.state.position || position, {
            portal: usePortal,
        });
        let children = this.props.children;
        if (children.type === Fragment) {
            children = children.props.children;
        }
        const menuItems = React.Children.toArray(children).map((item, index) => {
            if (item.type === MenuItem) {
                return React.cloneElement(item, {
                    ref: (item) => this.bindItemRef(item, index)
                });
            }
            return item;
        });
        const menu = (<MenuContext.Provider value={this}>
        <Animate enter={this.isOpen}>
          <ul className={className} ref={this.bindRef}>
            {menuItems}
          </ul>
        </Animate>
      </MenuContext.Provider>);
        if (usePortal === true)
            usePortal = document.body;
        return usePortal instanceof HTMLElement ? createPortal(menu, usePortal) : menu;
    }
};
Menu.defaultProps = defaultPropsMenu;
Menu = __decorate([
    autobind()
], Menu);
export { Menu };
export function SubMenu(props) {
    const { className } = props, menuProps = __rest(props, ["className"]);
    return (<Menu className={cssNames("SubMenu", className)} isOpen open={noop} close={noop} position={{}} // reset position, must be handled in css
     closeOnClickOutside={false} closeOnClickItem={false} {...menuProps}/>);
}
const defaultPropsMenuItem = {
    onClick: noop,
};
let MenuItem = class MenuItem extends React.Component {
    get isFocusable() {
        const { disabled, spacer } = this.props;
        return !(disabled || spacer);
    }
    get isLink() {
        return !!this.props.href;
    }
    onClick(evt) {
        const menu = this.context;
        const { spacer, onClick } = this.props;
        if (spacer)
            return;
        onClick(evt);
        if (menu.props.closeOnClickItem && !evt.defaultPrevented) {
            menu.close();
        }
    }
    bindRef(elem) {
        this.elem = elem;
    }
    render() {
        const _a = this.props, { className, disabled, active, spacer, icon, children } = _a, props = __rest(_a, ["className", "disabled", "active", "spacer", "icon", "children"]);
        let iconProps;
        if (icon) {
            iconProps = {};
            if (typeof icon === "string")
                iconProps.material = icon;
            else
                Object.assign(iconProps, icon);
        }
        const elemProps = Object.assign(Object.assign({ tabIndex: this.isFocusable ? 0 : -1 }, props), { className: cssNames("MenuItem", className, { disabled, active, spacer }), onClick: this.onClick, children: icon ? <><Icon {...iconProps}/> {children}</> : children, ref: this.bindRef });
        if (this.isLink) {
            return <a {...elemProps}/>;
        }
        return <li {...elemProps}/>;
    }
};
MenuItem.defaultProps = defaultPropsMenuItem;
MenuItem.contextType = MenuContext;
MenuItem = __decorate([
    autobind()
], MenuItem);
export { MenuItem };
//# sourceMappingURL=menu.jsx.map