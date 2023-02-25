import { checkedTrue } from "../js/main.js";
import { disableIndex } from "../js/selectIndexStep.js";

export const card_criteriaTotal = document.getElementById('card_criteriaTotal');
export const card_columnList = document.getElementById('card_columnList');
const criteria_wrapper = document.getElementById('criteria_wrapper');
export const criteria_rules = document.getElementById('criteria_rules');
export const criteria_total = document.getElementById('criteria_total');

export function showColumnList() {
  const list = document.createElement('div');
  list.setAttribute('class', 'list-group list-group-horizontal list-criteria lc-pt');
  list.setAttribute('id', 'list_of_column');
  list.addEventListener('drop', drop);
  list.addEventListener('dragover', allowDrop);

  for (var i = 0; i < checkedTrue.length; i++) {
    var addstr = "";
    if (checkedTrue[i].length > 25) addstr = "...";
    const listItem = document.createElement('p');
    listItem.setAttribute('class', 'list-group-item text-center bc pd');
    listItem.setAttribute('id', `list_${checkedTrue[i]}`);
    listItem.setAttribute('draggable', true);
    listItem.addEventListener('drop', unallowDrop);
    listItem.addEventListener('dragstart', dragStart);
    listItem.appendChild(document.createTextNode(checkedTrue[i].substr(0, 25) + addstr));

    list.appendChild(listItem);
  }
  card_columnList.lastElementChild.appendChild(list);
}

export function updateColumnList() {
  for (var b = 0; b < checkedTrue.length; b++) {
    const getli = document.querySelector("p#list_" + checkedTrue[b]);
    const getParentli = document.getElementById("list_of_column");
    if (getli === null) {
      var addstr = "";
      if (checkedTrue[b].length > 25) addstr = "...";
      const addlist = document.createElement('p');
      addlist.setAttribute('class', 'list-group-item text-center bc pd');
      addlist.setAttribute('id', `list_${checkedTrue[b]}`);
      addlist.setAttribute('draggable', true);
      addlist.addEventListener('drop', unallowDrop);
      addlist.addEventListener('dragstart', dragStart);
      addlist.appendChild(checkedTrue[b].substr(0, 25) + addstr);

      getParentli.appendChild(addlist);
    }
  }
}

var oldVal;
export function saveOldVal(e) {
  if (e.target.value === "") {
    oldVal = 0;
  }
  else {
    oldVal = parseInt(e.target.value);
  }
}

export function showCriteriaCard(e) {
  criteria_rules.style.display = 'block';
  if (oldVal > e.target.value) {
    for (var i = oldVal; i > e.target.value; i--) {
      var cancelList = document.querySelectorAll(`#list_group_criteria_${i - 1} > p`);
      for (var b = 0; b < cancelList.length; b++) {
        card_columnList.lastElementChild.firstChild.appendChild(cancelList[b]);
      }
      document.getElementById(`criteria_${i - 1}`).remove();
    }
  }
  for (var i = oldVal; i < e.target.value; i++) {
    const criteria = document.createElement("div");
    criteria.setAttribute("class", "card mb-4");
    criteria.setAttribute("id", `criteria_${i}`);
    criteria.innerHTML = `<div class="card-header criteria-ch" id="card_header_columnList">
                              <input class="form-control text-center criteria-ch-content" type="text" id="criteria_name${i}" name="criteria_name${i}" placeholder="Enter Criteria Name ${i + 1}"/>
                              <input class="form-control text-center criteria-ch-content" type="number" id="criteria_weights${i}" name="criteria_weights${i}" placeholder="Weights"/>
                          </div>`;

    const cbCriteria = document.createElement('div');
    cbCriteria.setAttribute('class', 'card-body cb-criteria');

    const criteriaItem = document.createElement('div');
    criteriaItem.setAttribute('class', 'list-group list-criteria');
    criteriaItem.setAttribute('id', `list_group_criteria_${i}`);
    criteriaItem.addEventListener('drop', listCriteria);
    criteriaItem.addEventListener('dragover', allowDrop);

    cbCriteria.appendChild(criteriaItem);
    criteria.appendChild(cbCriteria);
    criteria_wrapper.appendChild(criteria);
  }
  e.target.blur();
  $("#criteria_name0").focus();
}

function listCriteria(e) {
  const targetS_factor = document.createElement("div");
  targetS_factor.setAttribute('class', 'targetS-factor');
  targetS_factor.setAttribute('id', `${e.target.id}_${list_id}`);
  targetS_factor.addEventListener('drop', unallowDrop);

  const selectFactor = document.createElement('select');
  selectFactor.setAttribute('class', 'form-select form-select-sm bc');
  selectFactor.setAttribute('id', 'select_idx');
  selectFactor.addEventListener('change', disableIndex);
  selectFactor.addEventListener('drop', unallowDrop);

  let arrOption = ["Core Factor", "Secondary Factor"];
  for(let i = 0; i < arrOption.length; i++) {
    const listOption = document.createElement('option');
    listOption.setAttribute('value', arrOption[i]);
    listOption.appendChild(document.createTextNode(arrOption[i]));
    if (i === 0) listOption.setAttribute('selected', true);

    selectFactor.appendChild(listOption);
  }

  const inputTargetScore = document.createElement('input');
  inputTargetScore.setAttribute('type', 'number');
  inputTargetScore.setAttribute('class', 'form-control form-control-sm text-center bc');
  inputTargetScore.setAttribute('id', 'input_target_score');
  inputTargetScore.setAttribute('placeholder', 'Target Score');
  inputTargetScore.addEventListener('drop', unallowDrop)

  targetS_factor.appendChild(selectFactor);
  targetS_factor.appendChild(inputTargetScore);

  e.target.appendChild(targetS_factor);
  drop(e);
}

var list_id, prevSibling_id;
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
  var func, eve;
  if (e.target.parentNode.id.includes("list_group_criteria_")) {
    func = "listCriteria";
  } else func = "drop";

  if (e.target.id.includes("list_")) {
    eve = e.target.parentNode;
  } else eve = e.target.parentNode.parentNode;

  eve.addEventListener('click', eval(func));
  eve.click();
  eve.removeEventListener('click', eval(func));
}

function removeDiv() {
  if (prevSibling_id !== undefined) {
    if (prevSibling_id.includes("list_group_criteria_")) {
      document.getElementById(prevSibling_id).remove();
      prevSibling_id = undefined;
    }
  }
}