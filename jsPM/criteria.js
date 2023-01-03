const card_criteriaTotal = document.getElementById('card_criteriaTotal');
card_criteriaTotal.style.display = "none";
const card_columnList = document.getElementById('card_columnList');
card_columnList.style.display = "none";
const criteria_wrapper = document.getElementById('criteria_wrapper');


function showColumnList() {
    var list = "<ul class='list-group list-group-horizontal'>";
    for (var i = 0; i < checkedTrue.length; i++) {
        list += "<li class='list-group-item'>" + checkedTrue[i] + "</li>"
    }
    list += "</ul>";
    card_columnList.lastElementChild.innerHTML = list;
}

function showCriteriaCard(target) {
    var criteria = "";
    for (var i = 0; i < target.value; i++) {
        criteria += `<div class="card my-4" id="criteria_${i}">
                            <div class="card-header" id="card_header_columnList"><b>List of Column ${i}</b></div>
                            <div class="card-body">
                            </div>
                        </div>`;
    }
    criteria_wrapper.innerHTML = criteria;
}







// var buttonsData = {};

// document.querySelector(".Weekly").addEventListener("click", () => {
    
//     var button = event.target;
//     // check to verify if any key with the button name already exists
//     if (buttonsData[button.innerHTML] === undefined)
//     {
//        // If undefined initialize to an empty array
//          buttonsData[button.innerHTML] = [];
//     }
    
//     buttonsData[button.innerHTML].push("push your data here to array");

//     console.log(`${button.innerHTML} clicked....`);
//     // displayData()
//     displayData(button.innerHTML);       

// });