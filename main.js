
const cvs = document.getElementById('cvs');
const ctx = cvs.getContext("2d");

const areaW = cvs.width
const areaH = cvs.height

let loopId = null
var gameObjects = [new Wiper(), new tetrisBlock(Math.floor(gridW/2))];

var lineCount = 0
document.getElementById('diff-box').innerHTML = difficulty

function draw()
{
    for (i in gameObjects)
    {
        obj = gameObjects[i]
        if(obj.type == "block")
        {
            obj.act()
            if (obj.lock && !obj.next)
            {
                obj.next = true
                gameObjects.push(new tetrisBlock(Math.floor(gridW/2)-1))
            }
        }

        if(obj.type == "cube") {
            obj.draw()
        }

        if(obj.type == "wiper")
        {
            obj.act()
        }
    }
}

function mainLoop() {
    ctx.clearRect(0, 0, areaW, areaH);
    draw();
}

function startGame() {
    loopId = setInterval(function() {
        mainLoop()
    }, 1000/fps);
}

startGame()
