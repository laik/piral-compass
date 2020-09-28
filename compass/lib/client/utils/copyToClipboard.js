// Helper for selecting element's text content and copy in clipboard
export function copyToClipboard(elem, resetSelection = true) {
    let clearSelection;
    if (isSelectable(elem)) {
        elem.select();
        clearSelection = () => elem.setSelectionRange(0, 0);
    }
    else {
        const selection = window.getSelection();
        selection.selectAllChildren(elem);
        clearSelection = () => selection.removeAllRanges();
    }
    const copyResult = document.execCommand("copy");
    if (resetSelection)
        clearSelection();
    return copyResult;
}
function isSelectable(elem) {
    return !!elem.select;
}
//# sourceMappingURL=copyToClipboard.js.map