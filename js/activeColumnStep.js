import { errorDecor_text } from "./validationCleanDataTable.js";
import { wrongConvertString, wrongConvertNumber } from "./validationCleanDataTable.js";
import { columnsName, arrScore, container_checkbox, checkedTrue } from "./main.js";
import { card_header_activeC } from "./validationCleanDataTable.js";


export function unclickLabel(target) {
    if (target.checked) {
        $(target).next().attr("onclick", "getColumnIndex(this); changeScoring(this)");
        target.setAttribute("checked", true);
    }
    else {
        $(target).next().removeAttr("onclick");
        target.removeAttribute("checked");
    }

    var idx = columnsName.indexOf(target.id);
    if (wrongConvertString.includes(target.id)) {
        if (!target.checked) {
            $(target).next().removeAttr("style");
        }
        else if (arrScore[idx].includes(null)) {
            errorDecor_text(target.nextSibling);
        }
    }
    else if (wrongConvertNumber.includes(target.id)) {
        if (!target.checked) {
            $(target).next().removeAttr("style");
        }
        else if (arrScore[idx].includes(null)) {
            if (arrScore[idx].some((value) => typeof value === "number")) {
                errorDecor_text(target.nextSibling);
            }
        }
    }
}

export function getActiveColumn() {
    var checkboxParent = [].slice.call(container_checkbox.children);
    checkboxParent.shift();

    checkedTrue.length = 0;
    for (let i = 0; i < checkboxParent.length; i++) {
        if (checkboxParent[i].firstChild.checked === true) {
            checkedTrue.push(checkboxParent[i].textContent);
        }
    }

    if (checkedTrue.length === 2) {
        card_header_activeC.removeAttribute("onclick");
        card_header_activeC.removeAttribute("style");
    }
    else if (checkedTrue.length < 2) {
        card_header_activeC.setAttribute('onclick', 'errorDecor_header(this)');
        card_header_activeC.click();
    }
    console.log(checkedTrue);

}
