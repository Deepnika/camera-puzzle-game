export function setDifficulty() {
    let selectElement = <HTMLSelectElement> document.getElementById("difficulty");
    let diff = selectElement.value;
    let rows = 0;
    let columns = 0
    switch (diff) {
        case "easy":
            rows = 3;
            columns = 3;
            break;
        case "normal":
            rows = 5;
            columns = 5;
            break;
        case "hard":
            rows = 10;
            columns = 10;
            break;
        case "insane":
            rows = 40;
            columns = 25;
            break;
    }
    let grid = { rowNumber: rows, columnNumber: columns}
    return grid
}