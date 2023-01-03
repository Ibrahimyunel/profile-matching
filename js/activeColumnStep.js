// function unclickLabel(target) {
//     var xmlhttp5 = new XMLHttpRequest();
//     xmlhttp5.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById(target.id).parentNode.innerHTML = this.responseText;
//         }
//     }
//     xmlhttp5.open("GET", "activeColumnStep.php?resId=" + target.id + "&resChecked=" + target.checked, false);
//     xmlhttp5.send();

//     uncl(target);
// }
// function uncl(target) {
//     var idx = columnsName.indexOf(target.id);
//     var getLabel = document.querySelector("label#"+target.id);
//     if (wrongConvertString.includes(target.id)) {
//         if (!target.checked) {
//             getLabel.removeAttribute("style");
//         }
//         else if (arrScore[idx].includes(null)) {
//             errorDecor_text(getLabel);
//         }
//     }
//     else if (wrongConvertNumber.includes(target.id)) {
//         if (!target.checked) {
//             $(target).next().removeAttr("style");
//         }
//         else if (arrScore[idx].includes(null)) {
//             if (arrScore[idx].some((value) => typeof value === "number")) {
//                 errorDecor_text(getLabel);
//             }
//         }
//     }
// }

function unclickLabel(target) {
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

function getActiveColumn() {
    var checkboxParent = [].slice.call(container_checkbox.children);
    checkboxParent.shift();

    checkedTrue.length = 0;
    for (i = 0; i < checkboxParent.length; i++) {
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
