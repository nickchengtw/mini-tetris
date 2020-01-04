
function errorBox(content)
{
    document.getElementById("error-box").style = "display: block"
    document.getElementById("error-box").innerHTML = "FATAL ERROR : " + content
}

function debugBox(content)
{
    document.getElementById("debug-box").style = "display: block"
    document.getElementById("debug-box").innerHTML = content
}

function clog(content) {
    if (debugMode == true) {
        console.log(content)
    }
}

function rndFrame()
{
    mainLoop()
}

function rndDrop(params)
{
    for (let i = 0; i < Math.ceil(60/speed)+1; i++) {
        mainLoop()
    }
}

function continueRnd()
{
    loopId = setInterval(function() {
        mainLoop()
    }, 1000/fps);
}

if (debugMode) {
    document.getElementById('debug-tool').style.display = 'block'
}
