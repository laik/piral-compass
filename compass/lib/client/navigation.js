// Navigation helpers
import pathToRegexp from "path-to-regexp";
import { createBrowserHistory } from "history";
import { createObservableHistory } from "mobx-observable-history";
export const browserHistory = createBrowserHistory();
export const navigation = createObservableHistory(browserHistory);
export function navigate(location) {
    navigation.location = location;
}
export function buildURL(path) {
    const pathBuilder = pathToRegexp.compile(path.toString());
    return function ({ params, query } = {}) {
        return pathBuilder(params) + (query ? getQueryString(query, false) : "");
    };
}
export function getQueryString(params, merge = true) {
    const searchParams = navigation.searchParams.copyWith(params);
    if (!merge) {
        Array.from(searchParams.keys()).forEach(key => {
            if (!(key in params))
                searchParams.delete(key);
        });
    }
    return searchParams.toString({ withPrefix: true });
}
export function setQueryParams(params, { merge = true, replace = false } = {}) {
    const newSearch = getQueryString(params, merge);
    navigation.merge({ search: newSearch }, replace);
}
export function getDetails() {
    return navigation.searchParams.get("details");
}
export function getSelectedDetails() {
    return navigation.searchParams.get("selected") || getDetails();
}
export function getDetailsUrl(details) {
    return getQueryString({
        details: details,
        selected: getSelectedDetails(),
    });
}
export function showDetails(path, resetSelected = true) {
    navigation.searchParams.merge({
        details: path,
        selected: resetSelected ? null : getSelectedDetails(),
    });
}
export function hideDetails() {
    showDetails(null);
}
export function setSearch(text) {
    navigation.replace({
        search: getQueryString({ search: text })
    });
}
export function getSearch() {
    return navigation.searchParams.get("search") || "";
}
//# sourceMappingURL=navigation.js.map