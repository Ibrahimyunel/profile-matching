
function disableIndex(target) {
    const cancelIndex = document.querySelector("#form_check > input[aria-disabled]");
    if (cancelIndex !== null) {
        cancelIndex.nextElementSibling.setAttribute("onclick", "getColumnIndex(this); changeScoring(this)");
        cancelIndex.checked = true;
        cancelIndex.setAttribute("checked", true);
        cancelIndex.removeAttribute("disabled");
        cancelIndex.removeAttribute("aria-disabled");
    }

    const selectIndex = document.querySelector("#form_check > input#" + target.value);
    selectIndex.checked = false;
    selectIndex.removeAttribute("checked");
    selectIndex.setAttribute("disabled", true);
    selectIndex.setAttribute("aria-disabled", true);
    selectIndex.nextElementSibling.removeAttribute("onclick");

    autoDisableCheckbox(newData, columnsName);
    getActiveColumn();

    removeScoreWraper(target.selectedIndex - 1);
    var wrapSelected = document.getElementById('wrapper_for_' + target.value);
    wrapSelected.style.display = 'none';

}