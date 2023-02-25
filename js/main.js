import { dirtyDataTable } from "./dirtyDataTable.js";
import { createScoreWrapper } from "./convertDataStep.js";
import { transpose, pickDataOnce } from "./preprocessSupport.js";

export const excel_file = document.getElementById('excel_file');
export const restart_project = document.getElementById('restart_project');
export const selectIdx = document.getElementById('select_idx');
export const card_index = document.getElementById('card_index');
export const card_active = document.getElementById('card_active');
export const container_checkbox = document.getElementById('container_checkbox');
export const card_score = document.getElementById("card_score");
export const container_score = document.getElementById("container_score");
export const btnShowCleanData = document.getElementById('btnShowCleanData');

export var columnsName = new Array();
export var newData = new Array();
export var checkedTrue = new Array();
var actual_sheet_data = new Array();
export var arrScore;
export var sheet_data;

function readFile(target) {
    console.log(target.files[0]);

    var reader = new FileReader();

    reader.readAsArrayBuffer(target.files[0]);

    reader.onload = async function () {

        var data = new Uint8Array(reader.result);

        var work_book = XLSX.read(data, { type: 'array' });

        var sheet_name = work_book.SheetNames;

        actual_sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });

        sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });


        if (sheet_data.length > 0) {
            controlHeader(sheet_data);

            var dataSort = transpose(sheet_data);
            newData = pickDataOnce(dataSort);
            console.log(newData);

            arrScore = new Array(newData.length).fill(null);
            for (var row = 0; row < newData.length; row++) {
                arrScore[row] = new Array(newData[row].length).fill(null);
            }

            dirtyDataTable(sheet_data);
            createScoreWrapper();

            card_index.style.display = "block";
            card_active.style.display = "block";
            card_score.style.display = "block";
            btnShowCleanData.style.display = "block";
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your data is empty!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        }
    }
}

function controlHeader(sheet_data) {
    for (var i = sheet_data[0].length; i < sheet_data[0].length + 1; i++) {
        var lastcol = sheet_data.map(d => d[i]);
        if (!lastcol.every(value => value === undefined)) {
            sheet_data[0].push("Column_" + (i + 1));
        }
    }
    for (var i = 0; i < sheet_data[0].length; i++) {
        if (sheet_data[0][i] === undefined) {
            sheet_data[0][i] = "Column_" + (i + 1);
        }
    }
    for (var h = 0; h < sheet_data[0].length; h++) {
        var addVal = 1;
        for (var a = h + 1; a < sheet_data[0].length; a++) {
            if (sheet_data[0][h] === sheet_data[0][a]) {
                sheet_data[0][a] = sheet_data[0][a] + "_" + addVal;
                addVal++;
            }
        }
    }
}

export function controlFile(e) {
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(e.target.files[0].type)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Only .xlsx or .xls file format are allowed',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    }
    else {
        e.target.setAttribute('disabled', true);
        readFile(e.target);
    }
}
