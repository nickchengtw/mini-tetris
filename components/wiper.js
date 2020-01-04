
class Wiper
{
    constructor()
    {
        this.type = "wiper"
    }

    scanLine()
    {
        var lineNumber = -1;
        for (i in grid) {
            const row = grid[i]
            var success = true
            for (var n in row) {
                const el = row[n];
                if (!el)
                {
                    success = false
                }
            }
            if (success) {
                lineNumber = i
            }
        }
        return lineNumber
    }

    wipe(row)
    {
        document.getElementById("line-count").innerHTML = parseInt(document.getElementById("line-count").innerHTML) + 1
        var front = grid.slice(0, row)
        var end = grid.slice(parseInt(row)+parseInt(1), grid.length)
        grid = [newRow()].concat(front).concat(end)
        console.log(row, front, end, grid)

        for (i in gameObjects) {
            obj = gameObjects[i]
            if (obj.type == "cube") {
                if (obj.gridY == row) {
                    delete gameObjects[i]
                } else if (obj.gridY < row) {
                    obj.gridY += 1
                }
            }
        }
    }

    act()
    {
        const fulledLine = this.scanLine()
        if (fulledLine != -1) {
            this.wipe(fulledLine)
            //this.act()
        }
    }
}
