import { errorDecor_text } from "./validationCleanDataTable.js";
import { wrongConvertString, wrongConvertNumber } from "./validationCleanDataTable.js";
import { columnsName, arrScore, container_checkbox, checkedTrue } from "./main.js";
import { card_header_activeC } from "./validationCleanDataTable.js";
import { getColumnIndex } from "./preprocessSupport.js";
import { changeScoring } from "./convertDataStep.js";
import { errorDecor_header } from "./validationCleanDataTable.js";


export function unclickLabel(e) {
    if (e.target.checked) {
        // $(e.target).next().attr("onclick", "changeScoring(event)");
        $(e.target).next().on('click', changeScoring);
        e.target.setAttribute("checked", true);
    }
    else {
        // $(e.target).next().unbind();
        // $(e.target).next().off('click', changeScoring);
        const tar = e.target.nextElementSibling;
        tar.removeEventListener('click', changeScoring);
        console.log(tar);
        e.target.removeAttribute("checked");
    }

    var idx = columnsName.indexOf(e.target.id);
    if (wrongConvertString.includes(e.target.id)) {
        if (!e.target.checked) {
            $(e.target).next().removeAttr("style");
        }
        else if (arrScore[idx].includes(null)) {
            errorDecor_text(e.target.nextSibling);
        }
    }
    else if (wrongConvertNumber.includes(e.target.id)) {
        if (!e.target.checked) {
            $(e.target).next().removeAttr("style");
        }
        else if (arrScore[idx].includes(null)) {
            if (arrScore[idx].some((value) => typeof value === "number")) {
                errorDecor_text(e.target.nextSibling);
            }
        }
    }
    getActiveColumn();
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
        card_header_activeC.removeEventListener('click', errorDecor_header);
        card_header_activeC.removeAttribute("style");
    }
    else if (checkedTrue.length < 2) {
        card_header_activeC.addEventListener('click', errorDecor_header);
        card_header_activeC.click();
    }
    console.log(checkedTrue);

}
