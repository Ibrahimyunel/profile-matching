import { excel_file, selectIdx, restart_project } from "./js/main.js";
import { btnShowCleanData, card_index, card_active, card_score } from "./js/main.js";
import { controlFile } from "./js/main.js";
import { restartProject } from "./js/sweetAlertController.js";
import { makeCleanDataValidation } from "./js/validationCleanDataTable.js";
import { disableIndex } from "./js/selectIndexStep.js";
import { saveOldVal, showCriteriaCard } from "./jsPM/criteria.js";
import { criteria_total, card_criteriaTotal, card_columnList, criteria_rules } from "./jsPM/criteria.js";

btnShowCleanData.style.display = "none";
card_index.style.display = "none";
card_active.style.display = "none";
card_score.style.display = "none";

card_criteriaTotal.style.display = "none";
card_columnList.style.display = "none";
criteria_rules.style.display = "none";


excel_file.addEventListener('change', controlFile); 
restart_project.addEventListener('click', restartProject); //without this
selectIdx.addEventListener('change', disableIndex);
btnShowCleanData.addEventListener('click', makeCleanDataValidation); //without this
criteria_total.addEventListener('focus', saveOldVal);
criteria_total.addEventListener('change', showCriteriaCard);

