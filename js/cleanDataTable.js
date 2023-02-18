import { checkedTrue, selectIdx, columnsName, arrScore, newData } from "./main.js";

export function cleanDataTable(sheet_data) {
    var cleanData = document.getElementById('clean_data');
    cleanData.innerHTML = "";
    const tableClean = document.createElement('table');
    const theadClean = document.createElement('thead');
    const tbodyClean = document.createElement('tbody');
    const createClassClean = document.createAttribute('class');
    const createIdClean = document.createAttribute('id');
    createClassClean.value = "table table-striped table-bordered";
    createIdClean.value = 'myCleanTable';
    tableClean.setAttributeNode(createIdClean);
    tableClean.setAttributeNode(createClassClean);
    checkedTrue.splice(0, 0, selectIdx.value);

    for (var row = 0; row < sheet_data.length; row++) {
        const trClean = document.createElement('tr');

        for (var cell = 0; cell < checkedTrue.length; cell++) {
            var idxCol = columnsName.indexOf(checkedTrue[cell]);
            if (row == 0) {
                const thClean = document.createElement('th');
                const thTextClean = document.createTextNode(sheet_data[row][idxCol]);
                thClean.appendChild(thTextClean);
                trClean.appendChild(thClean);
            }
            else {
                var backup = sheet_data[row][idxCol];
                if (!arrScore[idxCol].includes(null)) {
                    var idx = newData[idxCol].indexOf(sheet_data[row][idxCol]);
                    sheet_data[row][idxCol] = arrScore[idxCol][idx];
                }
                const tdClean = document.createElement('td');
                const thTextClean = document.createTextNode(sheet_data[row][idxCol]);
                tdClean.appendChild(thTextClean);
                trClean.appendChild(tdClean);
                sheet_data[row][idxCol] = backup;
            }
        }
        if (row === 0) {
            theadClean.appendChild(trClean);
        } else {
            tbodyClean.appendChild(trClean);
        }
    }

    tableClean.appendChild(theadClean);
    tableClean.appendChild(tbodyClean);
    cleanData.appendChild(tableClean);

    var dataTable = $('#myCleanTable').DataTable({
        "order": []
    });

    const myCleanTable_wrapper = document.getElementById("myCleanTable");
    const parent_cleanTable = myCleanTable_wrapper.parentNode;
    const clean_newWrapper = document.createElement('div');
    clean_newWrapper.setAttribute('class', 'newWrapperClass table dataTable no-footer');
    parent_cleanTable.replaceChild(clean_newWrapper, myCleanTable_wrapper);
    clean_newWrapper.appendChild(myCleanTable_wrapper);

    $(document).ready(function () {
        $('#myCleanTable').on('click', 'td', function () {
            alert(dataTable.cell(this).index().column);
        });
    });
    
    checkedTrue.splice(0, 1);
    // card_criteriaTotal.scrollIntoView(true);
}
