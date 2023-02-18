import { autoDisableCheckbox } from "./preprocessSupport.js";
import { getActiveColumn } from "./activeColumnStep.js";
import { removeScoreWraper } from "./convertDataStep.js";
import { newData, columnsName } from "./main.js";

export function disableIndex(e) {
    const cancelIndex = document.querySelector("#form_check > input[aria-disabled]");
    if (cancelIndex !== null) {
        cancelIndex.nextElementSibling.setAttribute("onclick", "getColumnIndex(this); changeScoring(this)");
        cancelIndex.checked = true;
        cancelIndex.setAttribute("checked", true);
        cancelIndex.removeAttribute("disabled");
        cancelIndex.removeAttribute("aria-disabled");
    }

    const selectIndex = document.querySelector("#form_check > input#" + e.target.value);
    selectIndex.checked = false;
    selectIndex.removeAttribute("checked");
    selectIndex.setAttribute("disabled", true);
    selectIndex.setAttribute("aria-disabled", true);
    selectIndex.nextElementSibling.removeAttribute("onclick");

    autoDisableCheckbox(newData, columnsName);
    getActiveColumn();

    removeScoreWraper(e.target.selectedIndex - 1);
    var wrapSelected = document.getElementById('wrapper_for_' + e.target.value);
    wrapSelected.style.display = 'none';

}