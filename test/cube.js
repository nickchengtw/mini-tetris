
const cvs = document.getElementById('cvs');
const ctx = cvs.getContext("2d");

const areaW = cvs.width
const areaH = cvs.height

var gameObjects = [new Wiper(), new cubeClass(Math.floor(gridW/2))];

function draw()
{
    for (i in gameObjects)
    {
        obj = gameObjects[i]
        if(obj.type == "cube")
        {
            obj.act()
            if (obj.lock && !obj.next)
            {
                obj.next = true
                
                gameObjects.push(new cubeClass(Math.floor(gridW/2)))
            }
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

function rndFrame()
{
    mainLoop()
}

const loopId = setInterval(function()
{
   mainLoop()
}, 1000/fps);
