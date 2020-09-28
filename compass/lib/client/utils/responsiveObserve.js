export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
};
let subscribers = [];
let subUid = -1;
let screens = {};
const responsiveObserve = {
    matchHandlers: {},
    dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach(item => {
            item.func(screens);
        });
        return subscribers.length >= 1;
    },
    subscribe(func) {
        if (subscribers.length === 0) {
            this.register();
        }
        const token = (++subUid).toString();
        subscribers.push({
            token,
            func,
        });
        func(screens);
        return token;
    },
    unsubscribe(token) {
        subscribers = subscribers.filter(item => item.token !== token);
        if (subscribers.length === 0) {
            this.unregister();
        }
    },
    unregister() {
        Object.keys(responsiveMap).forEach((screen) => {
            const matchMediaQuery = responsiveMap[screen];
            const handler = this.matchHandlers[matchMediaQuery];
            if (handler && handler.mql && handler.listener) {
                handler.mql.removeListener(handler.listener);
            }
        });
    },
    register() {
        Object.keys(responsiveMap).forEach((screen) => {
            const matchMediaQuery = responsiveMap[screen];
            const listener = ({ matches }) => {
                this.dispatch(Object.assign(Object.assign({}, screens), { [screen]: matches }));
            };
            const mql = window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery] = {
                mql,
                listener,
            };
            listener(mql);
        });
    },
};
export default responsiveObserve;
//# sourceMappingURL=responsiveObserve.js.map