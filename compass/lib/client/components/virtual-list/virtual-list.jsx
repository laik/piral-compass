// Wrapper for "react-window" component
// API docs: https://react-window.now.sh
import "./virtual-list.scss";
import React, { Component } from "react";
import { observer } from "mobx-react";
import { VariableSizeList } from "react-window";
import { cssNames } from "../../utils";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import ResizeSensor from "css-element-queries/src/ResizeSensor";
const defaultProps = {
    width: "100%",
    initialOffset: 1,
    readyOffset: 10,
};
export class VirtualList extends Component {
    constructor() {
        super(...arguments);
        this.listRef = React.createRef();
        this.parentRef = React.createRef();
        this.state = {
            overscanCount: this.props.initialOffset,
            height: 0,
        };
        this.setListHeight = throttle(() => {
            const { parentRef, state: { height } } = this;
            if (!parentRef.current)
                return;
            const parentHeight = parentRef.current.clientHeight;
            if (parentHeight === height)
                return;
            this.setState({
                height: parentHeight,
            });
        }, 250);
        this.getItemSize = (index) => this.props.rowHeights[index];
        this.scrollToSelectedItem = debounce(() => {
            const { items, selectedItemId } = this.props;
            const index = items.findIndex(item => item.getId() == selectedItemId);
            if (index === -1)
                return;
            this.listRef.current.scrollToItem(index, "start");
        });
    }
    componentDidMount() {
        this.setListHeight();
        this.scrollToSelectedItem();
        new ResizeSensor(this.parentRef.current, this.setListHeight);
        this.setState({ overscanCount: this.props.readyOffset });
    }
    componentDidUpdate(prevProps) {
        const { items, rowHeights } = this.props;
        if (prevProps.items.length !== items.length || !isEqual(prevProps.rowHeights, rowHeights)) {
            this.listRef.current.resetAfterIndex(0, true);
        }
    }
    render() {
        const { width, className, items, getTableRow } = this.props;
        const { height, overscanCount } = this.state;
        const rowData = {
            items,
            getTableRow
        };
        return (<div className={cssNames("VirtualList", className)} ref={this.parentRef}>
        <VariableSizeList className="list" width={width} height={height} itemSize={this.getItemSize} itemCount={items.length} itemData={rowData} overscanCount={overscanCount} ref={this.listRef} children={Row}/>
      </div>);
    }
}
VirtualList.defaultProps = defaultProps;
const Row = observer((props) => {
    const { index, style, data } = props;
    const { items, getTableRow } = data;
    const uid = items[index].getId();
    const row = getTableRow(uid);
    if (!row)
        return null;
    return React.cloneElement(row, {
        style: Object.assign({}, row.props.style, style)
    });
});
//# sourceMappingURL=virtual-list.jsx.map