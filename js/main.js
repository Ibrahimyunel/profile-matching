const excel_file = document.getElementById('excel_file');
const selectIdx = document.getElementById('select_idx');

const card_index = document.getElementById('card_index');
card_index.style.display = "none";

const card_active = document.getElementById('card_active');
card_active.style.display = "none";
const container_checkbox = document.getElementById('container_checkbox');

const card_score = document.getElementById("card_score");
card_score.style.display = "none";

const container_score = document.getElementById("container_score");

const btnShowCleanData = document.getElementById('btnShowCleanData');
btnShowCleanData.style.display = "none";

var columnsName = new Array();

var newData = new Array();

var actual_sheet_data = new Array();

var indexChoice = 0;

var arrScore = new Array();

var checkedTrue = new Array();

var sheet_data;
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
            for (row = 0; row < newData.length; row++) {
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
            var errorText = "Your data is empty!";
            var selfReload = "location.reload()";
            var respond = [errorText, selfReload];
            errorValidation(respond);
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

function controlFile(target) {
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(target.files[0].type)) {
        var errorText = "Only .xlsx or .xls file format are allowed";
        excel_file.value = '';
        var respond = [errorText];
        errorValidation(respond);
        // return false;
    }
    else {
        target.setAttribute('disabled', true);
        readFile(target);
    }
}
