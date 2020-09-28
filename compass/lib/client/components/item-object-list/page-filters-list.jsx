var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./page-filters-list.scss";
import React from "react";
import { observer } from "mobx-react";
import { Badge } from "../badge";
import { cssNames } from "../../utils";
import { pageFilters } from "./page-filters.store";
import { FilterIcon } from "./filter-icon";
import { Icon } from "../icon";
let PageFiltersList = class PageFiltersList extends React.Component {
    constructor() {
        super(...arguments);
        this.reset = () => pageFilters.reset();
        this.remove = (filter) => pageFilters.removeFilter(filter);
    }
    renderContent() {
        const { filters } = this.props;
        if (!filters.length) {
            return null;
        }
        return (<>
        <div className="header flex gaps">
          <span>`Currently applied filters:`</span>
          <a onClick={this.reset} className="reset">
            `Reset`
          </a>
        </div>
        <div className="labels">
          {filters.map(filter => {
            const { value, type } = filter;
            return (<Badge key={`${type}-${value}`} title={type} className={cssNames("flex gaps filter align-center", type)} label={(<>
                    <FilterIcon type={type}/>
                    <span className="value">{value}</span>
                    <Icon small material="close" onClick={() => this.remove(filter)}/>
                  </>)}/>);
        })}
        </div>
      </>);
    }
    render() {
        return (<div className="PageFiltersList">
        {this.renderContent()}
      </div>);
    }
};
PageFiltersList.defaultProps = {
    get filters() {
        return pageFilters.activeFilters;
    }
};
PageFiltersList = __decorate([
    observer
], PageFiltersList);
export { PageFiltersList };
//# sourceMappingURL=page-filters-list.jsx.map