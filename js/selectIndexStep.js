// function disableIndex(target) {
//     const cancelIndex = document.querySelector("#form_check > input[disabled]");
//     if (cancelIndex !== null) {
//         cancelIndex.nextElementSibling.setAttribute("onclick", "getColumnIndex(this); changeScoring(this)");
//         cancelIndex.setAttribute("checked", true);
//         cancelIndex.removeAttribute("disabled");
//     }

//     autoDisableCheckbox(newData, columnsName);

//     getActiveColumn();
//     if (checkedTrue.includes(target.value)) {
//         idx = checkedTrue.indexOf(target.value);
//         checkedTrue.splice(idx, 1);
//     }

//     console.log("yoi : " + checkedTrue);

//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.querySelector("#form_check > #" + target.value).parentNode.innerHTML = this.responseText;
//         }
//     }
//     xmlhttp.open("GET", "selectIndexStep.php?key=" + target.value, true);
//     xmlhttp.send();

// }

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