
function newRow()
{
    r = []
    for (let i = 0; i < gridW; i++) {
        r.push(false)
    }
    return r
}

function blankGrid()
{
    var g = []
    for (let i = 0; i < gridH; i++)
    {
        g.push(newRow())
    }
    return g
}

function g2px(v)
{
    return v*cubeSize
}

function writeGrid(x, y)
{
    try
    {
        grid[y][x] = true
    } catch(err) {
        //errorBox("can't write to grid, grid may broken")
        document.getElementById('game-over-cover').style.zIndex = 1
        document.getElementById('game-over-cover').style.animationName = 'game-over'
        record(document.getElementById('line-count').innerHTML)
    }
}

function getHorizon(y)
{
    return grid[y];
}

function getVertical(x)
{
    var v = [];
    for (i in grid)
    {
        var h = getHorizon(i)
        v.push(h[x])
    }
    return v
}

function getPosition(x, y) {
    let result = false

    try {
        result = grid[y][x]
    } catch {
        result = false
    }

    return result
}

var grid = blankGrid()
