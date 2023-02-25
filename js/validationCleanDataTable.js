import { columnsName, checkedTrue, newData, arrScore, } from "./main.js";
import { selectIdx, btnShowCleanData } from "./main.js";
import { sheet_data } from "./main.js";
import { cleanDataTable } from "./cleanDataTable.js";
import { showColumnList, updateColumnList } from "../jsPM/criteria.js";
import { card_criteriaTotal, card_columnList } from "../jsPM/criteria.js";

const card_header_index = document.getElementById("card_header_index");
const card_header_score = document.getElementById("card_header_score");
export const card_header_activeC = document.getElementById("card_header_activeC");

export var wrongConvertString = [];
export var wrongConvertNumber = [];

export function makeCleanDataValidation() {
    if (selectIdx.selectedIndex === 0) {
        card_header_index.addEventListener('click', errorDecor_header);
        selectIdx.addEventListener('focus', errorDecor_index);

        selectIdx.onchange = () => {
            selectIdx.removeEventListener('focus', errorDecor_index);
            selectIdx.removeAttribute("style");
            card_header_index.removeEventListener('click', errorDecor_header);
            card_header_index.removeAttribute("style");
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You forgot to choose index",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    card_header_index.click();
                    selectIdx.focus();
                }, 290)
            }
        });
    }
    else if (checkedTrue.length < 2) {
        // const inputCheckFirsh = document.querySelectorAll("input[type='checkbox']:not(:checked):not(:disabled)")[0];
        card_header_activeC.addEventListener('click', errorDecor_header);

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "There are at least 2 checked in Active Columns list",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                card_header_activeC.click();
            }
        });
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
                errorText += "You must convert data in the columns named " + wrongConvertString;
            }
            if (wrongConvertNumber.length > 0) {
                errorText += "\nYou must complete the conversion data in the columns named " + wrongConvertNumber;
            }
            card_header_score.addEventListener('click', errorDecor_header);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorText,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    card_header_score.click();
                    errorScoreController();
                }
            });
        }
        else {
            card_header_score.removeEventListener('click', errorDecor_header);
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

export function errorDecor_index(e) {
    e.target.setAttribute("style", "border-color: #dc3545; box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);");
}

export function errorDecor_header(e) {
    e.target.setAttribute("style", "background-color: #dc3545;");
}
export function errorDecor_text(target) {
    target.setAttribute("style", "color: #dc3545;");
}

export function errorScoreController() {
    for (var i = 0; i < wrongConvertString.length; i++) {
        var errorElement = document.querySelector(".form-check-label#" + wrongConvertString[i]);
        errorElement.addEventListener('click', (event) => errorDecor_text(event.target));
        errorElement.click();
        errorElement.removeEventListener('click', (event) => errorDecor_text(event.target));
    }
    for (var i = 0; i < wrongConvertNumber.length; i++) {
        var errorElement = document.querySelector(".form-check-label#" + wrongConvertNumber[i]);
        errorElement.addEventListener('click', (event) => errorDecor_text(event.target));
        errorElement.click();
        errorElement.removeEventListener('click', (event) => errorDecor_text(event.target));
    }
}