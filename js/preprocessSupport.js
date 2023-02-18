// import 
export function autoDisableCheckbox(nData, cName) {
    var arrDisabled = [];
    for (let i = 0; i < nData.length; i++) {
        if (nData[i].length > 50) {
            arrDisabled.push(i);
        }
    }
    for (let b = 0; b <= arrDisabled.length; b++) {
        for (let i = 0; i <= cName.length; i++) {
            if (cName.indexOf(cName[i]) === arrDisabled[b]) {
                $(".form-check-input#" + cName[i]).prop("disabled", true).removeAttr("checked");
                $(".form-check-input#" + cName[i]).next().removeAttr("onclick");
                console.log(arrDisabled);
            }
        }
    }
}

export const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

export function pickDataOnce(arr) {
    try {
        // let res = new Array(arr.length).fill(null).map(() => new Array(arr[0].length).fill(null));
        let res = [];
        for (var row = 0; row < arr.length; row++) {
            res[row] = [];

            // delete arr[row][0];
            arr[row].splice(0, 1);
            arr[row].sort();

            let col = 0;
            let resCol = 0;
            while (col < arr[0].length) {
                // if (arr[row][col] === undefined) break;
                if (!res[row].includes(arr[row][col])) {
                    res[row][resCol] = arr[row][col];
                    resCol++;
                }
                if (arr.indexOf(arr[row][col]) !== arr.lastIndexOf(arr[row][col])) {
                    col = arr.lastIndexOf(arr[row][col]);
                }
                col++;
            }
        }
        return res;
    }
    catch (error) {
        console.error(`Could not get product: ${error}`);
    }
}

export function getColumnIndex(target) {
    indexChoice = [].slice.call(target.parentNode.parentNode.children).indexOf(target.parentNode) - 1;
    return indexChoice;
}