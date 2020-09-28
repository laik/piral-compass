// Helper for preventing default event action and performing custom callback
// 1)
// <form onSubmit={prevDefault(() => console.log('do some action'))}>
//    <input name="text"/>
//    <button type="submit">Action</button>
// </form>
// 2)
// <a href="/some-page-url">
//  <span>Link text</span>
//  <Icon onClick={prevDefault(() => console.log('stay on the page and open dialog'))}/>
// </a>
export function prevDefault(callback) {
    return function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        return callback(evt);
    };
}
export function stopPropagation(evt) {
    evt.stopPropagation();
}
//# sourceMappingURL=prevDefault.js.map