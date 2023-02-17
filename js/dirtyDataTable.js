function dirtyDataTable(sheet_data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const createClass = document.createAttribute('class');
    const createId = document.createAttribute('id');
    createClass.value = "table table-striped table-bordered";
    createId.value = 'myTable';
    table.setAttributeNode(createId);

    table.setAttributeNode(createClass);

    for (var row = 0; row < sheet_data.length; row++) {
        const tr = document.createElement('tr');

        for (var cell = 0; cell < sheet_data[0].length; cell++) {
            if (row == 0) {
                var i = 0, strLength = sheet_data[row][cell].length;
                if (strLength > 1) {
                    for (i; i < strLength; i++) {
                        sheet_data[row][cell] = sheet_data[row][cell].replace(" ", "_");
                    }
                }

                const th = document.createElement('th');
                const thText = document.createTextNode(sheet_data[row][cell]);
                th.appendChild(thText);
                tr.appendChild(th);

                const optionTag = document.createElement('option');
                optionTag.setAttribute('value', sheet_data[row][cell]);
                const optionText = document.createTextNode(sheet_data[row][cell]);
                optionTag.appendChild(optionText);
                selectIdx.appendChild(optionTag);

                const cbDiv = document.createElement('div');
                const cbDivClass = document.createAttribute('class');
                const cbDivId = document.createAttribute('id');
                cbDivClass.value = "form-check my-3";
                cbDivId.value = "form_check";
                cbDiv.setAttributeNode(cbDivClass);
                cbDiv.setAttributeNode(cbDivId);

                const cbInput = document.createElement('input');
                cbInput.setAttribute('class', 'form-check-input');
                cbInput.setAttribute('type', 'checkbox');
                cbInput.setAttribute('value', sheet_data[row][cell]);
                cbInput.setAttribute('id', sheet_data[row][cell]);
                cbInput.setAttribute('onchange', 'unclickLabel(this); getActiveColumn()');
                cbInput.setAttribute('checked', true);
                cbDiv.appendChild(cbInput);

                const cbLabel = document.createElement('label');
                cbLabel.setAttribute('class', 'form-check-label');
                cbLabel.setAttribute('id', sheet_data[row][cell]);
                cbLabel.setAttribute("onclick", "getColumnIndex(this); changeScoring(this)");
                const cbTextNode = document.createTextNode(sheet_data[row][cell]);
                cbLabel.appendChild(cbTextNode);
                cbDiv.appendChild(cbLabel);

                container_checkbox.appendChild(cbDiv);

                columnsName.push(sheet_data[row][cell]);
            }
            else {
                const td = document.createElement('td');
                const thText = document.createTextNode(sheet_data[row][cell]);
                td.appendChild(thText);
                tr.appendChild(td);
            }
        }
        if (row === 0) {
            thead.appendChild(tr);
        } else {
            tbody.appendChild(tr);
        }
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('excel_data').appendChild(table);

    var dataTable = $('#myTable').DataTable({
        "order": []
    });

    const myTable_wrapper = document.getElementById("myTable");
    const parent = myTable_wrapper.parentNode;
    const newWrapper = document.createElement('div');
    newWrapper.setAttribute('class', 'newWrapperClass table dataTable');
    parent.replaceChild(newWrapper, myTable_wrapper);
    newWrapper.appendChild(myTable_wrapper);

    $(document).ready(function () {
        $('#myTable').on('click', 'td', function () {
            alert(dataTable.cell(this).index().column);
        });
    });

    autoDisableCheckbox(newData, columnsName);
    getActiveColumn();
}