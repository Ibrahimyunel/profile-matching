import { columnsName, checkedTrue, newData, arrScore, } from "./main.js";
import { selectIdx, btnShowCleanData } from "./main.js";
import { sheet_data } from "./main.js";
import { cleanDataTable } from "./cleanDataTable.js";
import { errorValidation } from "./sweetAlertController.js";
import { showColumnList, updateColumnList } from "../jsPM/criteria.js";
import { disableIndex } from "./selectIndexStep.js";
import { card_criteriaTotal, card_columnList } from "../jsPM/criteria.js";

const card_header_index = document.getElementById("card_header_index");
const card_header_score = document.getElementById("card_header_score");
export const card_header_activeC = document.getElementById("card_header_activeC");


export var wrongConvertString = [];
export var wrongConvertNumber = [];

export function makeCleanDataValidation() {
    if (selectIdx.selectedIndex === 0) {
        card_header_index.setAttribute('onclick', 'errorDecor_header(this)');
        selectIdx.setAttribute('onfocus', 'errorDecor_index(this)');
        var errorText = "You forgot to choose index";
        var selfClick = "card_header_index.click()";
        var selfFocus = "selectIdx.focus()";

        selectIdx.onchange = () => {
            selectIdx.removeAttribute("onfocus");
            selectIdx.removeAttribute("style");
            disableIndex(selectIdx);
            card_header_index.removeAttribute("onclick");
            card_header_index.removeAttribute("style");
        }
        var respond = [errorText, selfClick, selfFocus];
        errorValidation(respond);
    }
    else if (checkedTrue.length < 2) {
        // const inputCheckFirsh = document.querySelectorAll("input[type='checkbox']:not(:checked):not(:disabled)")[0];
        card_header_activeC.addEventListener('click', errorDecor_header);

        var errorText = "There are at least 2 checked in Active Columns list";
        var selfClick = "card_header_activeC.click()";
        var respond = [errorText, selfClick];
        errorValidation(respond);
    }
    else {
        wrongConvertString = [];
        wrongConvertNumber = [];
        for (var i = 0; i < checkedTrue.length; i++) {
            var idx = columnsName.indexOf(checkedTrue[i]);
            const typeData = newData[idx].every((value) => {
                return typeof value === "number";
            });
            if (!typeData) {
                if (arrScore[idx].includes(null)) {
                    wrongConvertString.push(checkedTrue[i]);
                }
            }
            else {
                if (arrScore[idx].includes(null)) {
                    if (arrScore[idx].some((value) => typeof value === "number")) {
                        wrongConvertNumber.push(checkedTrue[i]);
                    }
                }
            }
        }
        var errorText = "";
        if (wrongConvertString.length > 0 || wrongConvertNumber.length > 0) {
            if (wrongConvertString.length > 0) {
                errorText += "You must convert data in the columns named <span class='text-danger'>" + wrongConvertString + "</span>";
            }
            if (wrongConvertNumber.length > 0) {
                errorText += "<br><br> You must complete the conversion data in the columns named <span class='text-danger'>" + wrongConvertNumber + "</span>";
            }
            card_header_score.setAttribute('onclick', 'errorDecor_header(this)');
            var selfClick = "card_header_score.click()";
            var redText = "errorScoreController()";
            var respond = [errorText, selfClick, redText];
            errorValidation(respond);

        }
        else {
            card_header_score.removeAttribute("onclick");
            card_header_score.removeAttribute("style");
            cleanDataTable(sheet_data);

            card_criteriaTotal.style.display = 'block';
            card_columnList.style.display = 'block';
            card_criteriaTotal.lastElementChild.children[0].focus();
            if (btnShowCleanData.firstChild.textContent === "Show") {
                btnShowCleanData.firstChild.textContent = "Update";
                showColumnList();
            } else {
                console.log(btnShowCleanData.firstChild.textContent);
                updateColumnList();
            }
        }
    }
}

export function errorDecor_index(target) {
    target.setAttribute("style", "border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);");
}

export function errorDecor_header(target) {
    target.setAttribute("style", "background-color: #dc3545;");
}
export function errorDecor_text(target) {
    target.setAttribute("style", "color: #dc3545;");
}

export function errorScoreController() {
    for (var i = 0; i < wrongConvertString.length; i++) {
        var errorElement = document.querySelector(".form-check-label#" + wrongConvertString[i]);
        var onclickVal = errorElement.getAttributeNode("onclick");
        onclickVal.value += "; errorDecor_text(this)";
        errorElement.click();
        onclickVal.value = "getColumnIndex(this); changeScoring(this)";
    }
    for (var i = 0; i < wrongConvertNumber.length; i++) {
        var errorElement = document.querySelector(".form-check-label#" + wrongConvertNumber[i]);
        var onclickVal = errorElement.getAttributeNode("onclick");
        onclickVal.value += "; errorDecor_text(this)";
        errorElement.click();
        onclickVal.value = "getColumnIndex(this); changeScoring(this)";
    }
}