
function changeScoring(getElement) {
    var arrScoreWrapper = [].slice.call(container_score.children);
    for (var i = 0; i < arrScoreWrapper.length; i++) {
        if (arrScoreWrapper[i].style.display === 'block') {
            arrScoreWrapper[i].style.display = 'none';
        }
    }

    var wrapSelected = document.getElementById('wrapper_for_' + getElement.id);
    wrapSelected.style.display = 'block';
}

function getScore(target) {
    var arrInput = [].slice.call(target.parentNode.parentNode.children);
    var arrInputChoice = arrInput.indexOf(target.parentNode) - 1;

    if (target.value === "") {
        arrScore[indexChoice][arrInputChoice] = null;
    }
    else {
        arrScore[indexChoice][arrInputChoice] = parseFloat(target.value);
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

function removeScoreWraper(idxChoice) {
    var button_id = document.querySelector('#button_' + columnsName[idxChoice]);
    var scoreWrapper = document.querySelectorAll('#score_wrapper_' + columnsName[idxChoice]);
    button_id.firstChild.textContent = "Open";
    button_id.classList.remove("btn-outline-secondary");
    button_id.classList.add("btn-lg", "btn-outline-primary");
    scoreWrapper.forEach((item) => {
        item.remove();
    });
    arrScore[idxChoice].fill(null);
}
function showListValue(target) {
    if (target.firstChild.textContent === "Open") {
        target.firstChild.textContent = "Cancel";
        target.classList.remove("btn-lg", "btn-outline-primary");
        target.classList.add("btn-outline-secondary");
        for (var col = 0; col < newData[indexChoice].length; col++) {
            if (newData[indexChoice][col] === null) continue;
            const listValue = document.createElement('div');
            listValue.setAttribute('class', 'convert-wrapper');
            listValue.setAttribute('id', 'score_wrapper_' + columnsName[indexChoice]);
            listValue.innerHTML += "<input  type='number' class='form-control convert-input' id='" + newData[indexChoice][col] + "' onchange='getScore(this)' placeholder='Score' value='" + arrScore[indexChoice][col] + "'/>";
            listValue.innerHTML += "<label class='col-form-label' for='" + newData[indexChoice][col] + "'>" + newData[indexChoice][col] + "</label>";
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

function createScoreWrapper() {
    for (var i = 0; i < columnsName.length; i++) {
        var wrap = document.createElement('div');
        wrap.setAttribute('class', 'wrapper-for-' + columnsName[i]);
        wrap.setAttribute('id', 'wrapper_for_' + columnsName[i]);
        wrap.setAttribute('style', 'display: none;');
        var addstr = "";
        if (columnsName[i].length > 25) addstr = "...";
        wrap.innerHTML += "<button class='btn btn-outline-primary btn-lg d-block mx-auto my-4' id='button_" + columnsName[i] + "' onclick='showListValue(this)'><span>Open</span> Convert Data of " + columnsName[i].substr(0, 25) + addstr + " Column</button>";
        container_score.appendChild(wrap);
    }
}
