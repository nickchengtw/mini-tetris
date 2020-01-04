
const areaW = cubeSize*gridW
const areaH = cubeSize*gridH

function setSimpleGrid() {
    grid = blankGrid()
    writeGrid(5, 9)
}

function setEmptyGrid() {
    grid = blankGrid()
}

function setComplexGrid() {
    grid = blankGrid()
    writeGrid(5, 9)
    writeGrid(6, 9)
    writeGrid(6, 8)
    writeGrid(6, 7)
    writeGrid(6, 6)
}
