import "./draggable.scss";
import * as React from "react";
import { cssNames, noop } from "../../utils";
import throttle from "lodash/throttle";
const initState = {
    inited: false,
    changed: false,
    offsetX: 0,
    offsetY: 0,
};
export class Draggable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = initState;
        this.onDragInit = (evt) => {
            document.body.classList.add(Draggable.IS_DRAGGING);
            const { pageX, pageY } = evt;
            this.setState({
                inited: true,
                initX: pageX,
                initY: pageY,
                pageX: pageX,
                pageY: pageY,
            });
        };
        this.onDrag = throttle((evt) => {
            const { vertical, horizontal, onEnter, onStart } = this.props;
            const { inited, pageX, pageY } = this.state;
            const offsetX = pageX - evt.pageX;
            const offsetY = pageY - evt.pageY;
            let changed = false;
            if (horizontal && offsetX !== 0)
                changed = true;
            if (vertical && offsetY !== 0)
                changed = true;
            if (inited && changed) {
                const start = !this.state.changed;
                const state = Object.assign({}, this.state, {
                    changed: true,
                    pageX: evt.pageX,
                    pageY: evt.pageY,
                    offsetX: offsetX,
                    offsetY: offsetY,
                });
                if (start)
                    onStart(state);
                this.setState(state, () => onEnter(state));
            }
        }, 100);
        this.onDragEnd = (evt) => {
            const { pageX, pageY } = evt;
            const { inited, changed, initX, initY } = this.state;
            if (inited) {
                document.body.classList.remove(Draggable.IS_DRAGGING);
                this.setState(initState, () => {
                    if (!changed)
                        return;
                    const state = Object.assign({}, this.state, {
                        offsetX: initX - pageX,
                        offsetY: initY - pageY,
                    });
                    this.props.onEnd(state);
                });
            }
        };
        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("mouseup", this.onDragEnd);
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.onDragEnd);
    }
    render() {
        const { className, children } = this.props;
        return (<div className={cssNames("Draggable", className)} onMouseDown={this.onDragInit}>
        {children}
      </div>);
    }
}
Draggable.IS_DRAGGING = "dragging";
Draggable.defaultProps = {
    vertical: true,
    horizontal: true,
    onStart: noop,
    onEnter: noop,
    onEnd: noop,
};
//# sourceMappingURL=draggable.jsx.map