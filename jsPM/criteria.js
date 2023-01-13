const card_criteriaTotal = document.getElementById('card_criteriaTotal');
card_criteriaTotal.style.display = "none";
const card_columnList = document.getElementById('card_columnList');
card_columnList.style.display = "none";
const criteria_wrapper = document.getElementById('criteria_wrapper');
const criteria_rules = document.getElementById('criteria_rules');
criteria_rules.style.display = "none";

function showColumnList() {
  var list = "<div class='list-group list-group-horizontal' id='list_of_column' ondrop='drop(event)' ondragover='allowDrop(event)' style='min-height:2.2em'>";
  for (var i = 0; i < checkedTrue.length; i++) {
    list += "<p class='list-group-item'  id='list_"+checkedTrue[i]+"' ondrop='unallowDrop(event)' ondragstart='dragStart(event)' draggable='true'>" + checkedTrue[i] + "</p>";
  }
  list += "</div>";
  card_columnList.lastElementChild.innerHTML = list;
}

function updateColumnList() {
  for (var b = 0; b < checkedTrue.length; b++) {
    var getli = document.querySelector("p#list_"+checkedTrue[b]);
    var getParentli = document.getElementById("list_of_column");
    if (getli === null) {
      const addlist = document.createElement("div");
      addlist.innerHTML = "<p class='list-group-item' id='list_"+checkedTrue[b]+"' ondrop='unallowDrop(event)' ondragstart='dragStart(event)' draggable='true'>" + checkedTrue[b] + "</p>";
      getParentli.appendChild(addlist.firstChild);
    }
  }
}

var oldVal;
function saveOldVal(target) {
  if (target.value === "") {
    oldVal = 0;
  }
  else {
    oldVal = parseInt(target.value);
  }
}

function showCriteriaCard(target) {
  criteria_rules.style.display = 'block';
  if (oldVal > target.value) {
    for (var i = oldVal; i > target.value; i--) {
      var cancelList = document.querySelectorAll(`#list_group_criteria_${i - 1} > p`);
      for (var b = 0; b < cancelList.length; b++) {
        card_columnList.lastElementChild.firstChild.appendChild(cancelList[b]);
      }
      document.getElementById(`criteria_${i - 1}`).remove();
    }
  }
  for (var i = oldVal; i < target.value; i++) {
    var criteria = document.createElement("div");
    criteria.setAttribute("class", "criteria-item card mt-4");
    criteria.setAttribute("id", `criteria_${i}`);
    criteria.innerHTML = `<div class="card-header" id="card_header_columnList">
                              <input class="criteria-name form-control" type="text" id="criteria_name${i}" name="criteria_name" placeholder="Enter Criteria Name ${i + 1}"/>
                          </div>
                          <div class="card-body">
                            <div class="list-group" id="list_group_criteria_${i}" ondrop="listCriteria(this); drop(event)" ondragover="allowDrop(event)" style="min-height:8em">

                            </div>
                          </div>`;
    criteria_wrapper.appendChild(criteria);
  }
  target.blur();
  $("#criteria_name0").focus();
}

function listCriteria(target) {
  var targetS_factor = document.createElement("div");
  targetS_factor.setAttribute('class', 'targetS-factor');
  targetS_factor.setAttribute('id', `${target.id}_${list_id}`);
  targetS_factor.setAttribute('ondrop', 'unallowDrop(event)');
  targetS_factor.innerHTML = `<select class="form-select" id="select_idx" onchange="disableIndex(this)" ondrop='unallowDrop(event)'>
                              <option selected disabled value="">Choose Factor</option>
                              <option value="">Core Factor</option>
                              <option value="">Secondary Factor</option>
                              </select>
                              <input class='form-control' type='number' ondrop='unallowDrop(event)' placeholder='Target Score'/>`;
  target.appendChild(targetS_factor);
}

var list_id;
var prevSibling_id;
function dragStart(event) {
  event.dataTransfer.setData("list_id", event.target.id);
  list_id = event.dataTransfer.getData("list_id");
  if (event.target.previousElementSibling !== null) {
    event.dataTransfer.setData("prevSibling_id", event.target.previousElementSibling.id);
    prevSibling_id = event.dataTransfer.getData("prevSibling_id");
  }
  

}

function drop(event) {
  event.target.appendChild(document.getElementById(list_id));
  removeDiv();
}

function allowDrop(event) {
  event.preventDefault();
}

function unallowDrop(e) {
  e.stopPropagation();
}

function removeDiv() {
  if(prevSibling_id !== undefined) {
    if(prevSibling_id.includes("list_group_criteria_")) {
      document.getElementById(prevSibling_id).remove();
    }
  }
}