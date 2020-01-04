
const cvsHld = document.getElementById('cvs-hld')
const ctxHld = cvsHld.getContext('2d')

function hold(gridX, gridY, color, shape) {
    console.log(shape)
    ctxHld.clearRect(0, 0, areaW, areaH);
    for (let idxR in shape) {
        const row = shape[idxR]
        for (let idxC in row) {
            console.log(idxR,idxC)
            if (shape[idxR][idxC]) {
                ctxHld.fillStyle = color
                ctxHld.fillRect(parseInt(idxC)*(cubeSize/4), parseInt(idxR)*(cubeSize/4), cubeSize/4, cubeSize/4);
            }
        }
    }
}

function release(params) {
    
}

function exchange(params) {
    
}
