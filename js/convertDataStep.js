import { container_score, arrScore, columnsName, newData } from "./main.js";
import { wrongConvertString, wrongConvertNumber } from "./validationCleanDataTable.js";
import { errorDecor_text } from "./validationCleanDataTable.js";
import { indexChoice } from "./preprocessSupport.js";
import { getColumnIndex } from "./preprocessSupport.js";

export function changeScoring(e) {
    getColumnIndex(e);
    var arrScoreWrapper = [].slice.call(container_score.children);
    for (var i = 0; i < arrScoreWrapper.length; i++) {
        if (arrScoreWrapper[i].style.display === 'block') {
            arrScoreWrapper[i].style.display = 'none';
        }
    }

    var wrapSelected = document.getElementById('wrapper_for_' + e.target.id);
    wrapSelected.style.display = 'block';
}

export function getScore(e) {
    var arrInput = [].slice.call(e.target.parentNode.parentNode.children);
    var arrInputChoice = arrInput.indexOf(e.target.parentNode) - 1;

    if (e.target.value === "") {
        arrScore[indexChoice][arrInputChoice] = null;
    }
    else {
        arrScore[indexChoice][arrInputChoice] = parseFloat(e.target.value);
    }

    var errorElement = document.querySelector(".form-check-label#" + columnsName[indexChoice]);
    if (wrongConvertString.includes(columnsName[indexChoice])) {
        if (!arrScore[indexChoice].includes(null)) {
            errorElement.removeAttribute("style");
        }
        else {
            errorDecor_text(errorElement);
        }
    }
    else if (wrongConvertNumber.includes(columnsName[indexChoice])) {
        if (arrScore[indexChoice].every((value) => value === null) || arrScore[indexChoice].every((value) => typeof value === "number")) {
            errorElement.removeAttribute("style");
        }
        else {
            errorDecor_text(errorElement);
        }
    }

    console.log(arrScore);
}

export function removeScoreWraper(idxChoice) {
    var button_id = document.querySelector('#button_' + columnsName[idxChoice]);
    var scoreWrapper = document.querySelectorAll('#score_wrapper_' + columnsName[idxChoice]);
    let getText = button_id.textContent;
    button_id.textContent = getText.replace("Cancel Convert Data", "Open Convert Data");
    button_id.classList.remove("btn-outline-secondary");
    button_id.classList.add("btn-lg", "btn-outline-primary");
    scoreWrapper.forEach((item) => {
        item.remove();
    });
    arrScore[idxChoice].fill(null);
}

export function showListValue(e) {
    if (e.target.textContent.includes("Open Convert Data")) {
        let getText = e.target.textContent;
        e.target.textContent = getText.replace("Open Convert Data", "Cancel Convert Data");
        e.target.classList.remove("btn-lg", "btn-outline-primary");
        e.target.classList.add("btn-outline-secondary");
        for (var col = 0; col < newData[indexChoice].length; col++) {
            if (newData[indexChoice][col] === null) continue;

            const listValue = document.createElement('div');
            listValue.setAttribute('class', 'convert-wrapper');
            listValue.setAttribute('id', 'score_wrapper_' + columnsName[indexChoice]);

            const convertInput = document.createElement('input');
            convertInput.setAttribute('type', 'number');
            convertInput.setAttribute('class', 'form-control convert-input');
            convertInput.setAttribute('id', newData[indexChoice][col]);
            convertInput.setAttribute('placeholder', 'Score');
            convertInput.setAttribute('value', arrScore[indexChoice][col]);
            convertInput.addEventListener("change", getScore);
            
            const convertLabel = document.createElement('label');
            convertLabel.setAttribute('class', 'col-form-label');
            convertLabel.setAttribute('for', newData[indexChoice][col]);
            convertLabel.appendChild(document.createTextNode(newData[indexChoice][col]));

            listValue.appendChild(convertInput);
            listValue.appendChild(convertLabel);

            document.getElementById('wrapper_for_' + columnsName[indexChoice]).appendChild(listValue);
        }
    }
    else {
        removeScoreWraper(indexChoice);

        var errorElement = document.querySelector(".form-check-label#" + columnsName[indexChoice]);
        if (wrongConvertString.includes(columnsName[indexChoice])) {
            errorDecor_text(errorElement);
        }
        else if (wrongConvertNumber.includes(columnsName[indexChoice])) {
            errorElement.removeAttribute("style");
        }
    }
}

export function createScoreWrapper() {
    for (var i = 0; i < columnsName.length; i++) {
        const wrap = document.createElement('div');
        wrap.setAttribute('class', 'wrapper-for-' + columnsName[i]);
        wrap.setAttribute('id', 'wrapper_for_' + columnsName[i]);
        wrap.setAttribute('style', 'display: none;');

        var addstr = "";
        if (columnsName[i].length > 25) addstr = "...";

        const buttonChange = document.createElement('button');
        buttonChange.setAttribute('class', 'btn btn-outline-primary btn-lg d-block mx-auto my-4');
        buttonChange.setAttribute('id', 'button_' + columnsName[i]);
        buttonChange.addEventListener('click', showListValue);
        buttonChange.innerHTML = "Open Convert Data of " + columnsName[i].substr(0, 25) + addstr + " Column";

        wrap.appendChild(buttonChange);
        container_score.appendChild(wrap);
    }
}
