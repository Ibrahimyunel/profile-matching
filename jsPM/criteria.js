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
                            <div class="list-group" id="list_group_criteria_${i}" ondrop="listCriteria(event)" ondragover="allowDrop(event)" style="min-height:8em">

                            </div>
                          </div>`;
    criteria_wrapper.appendChild(criteria);
  }
  target.blur();
  $("#criteria_name0").focus();
}

function listCriteria(e) {
  var targetS_factor = document.createElement("div");
  targetS_factor.setAttribute('class', 'targetS-factor');
  targetS_factor.setAttribute('id', `${e.target.id}_${list_id}`);
  targetS_factor.setAttribute('ondrop', 'unallowDrop(event)');
  targetS_factor.innerHTML = `<select class="form-select" id="select_idx" onchange="disableIndex(this)" ondrop='unallowDrop(event)'>
                              <option selected disabled value="">Choose Factor</option>
                              <option value="">Core Factor</option>
                              <option value="">Secondary Factor</option>
                              </select>
                              <input class='form-control' type='number' ondrop='unallowDrop(event)' placeholder='Target Score'/>`;
  e.target.appendChild(targetS_factor);
  drop(e);
}

var list_id;
var prevSibling_id;
function dragStart(e) {
  e.dataTransfer.setData("list_id", e.target.id);
  list_id = e.dataTransfer.getData("list_id");
  if (e.target.previousElementSibling !== null) {
    e.dataTransfer.setData("prevSibling_id", e.target.previousElementSibling.id);
    prevSibling_id = e.dataTransfer.getData("prevSibling_id");
  }
}

function drop(e) {
  e.target.appendChild(document.getElementById(list_id));
  removeDiv();
}

function allowDrop(e) {
  e.preventDefault();
}

function unallowDrop(e) {
  e.stopPropagation();
}

function removeDiv() {
  if(prevSibling_id !== undefined) {
    if(prevSibling_id.includes("list_group_criteria_")) {
      document.getElementById(prevSibling_id).remove();
      prevSibling_id = undefined;
    }
  }
}