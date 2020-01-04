
class tetrisBlock
{
    constructor(initGridX)
    {
        this.type = "block"
        this.gridX = initGridX
        this.y = 0
        this.gridY = -1
        this.remainFrame = Math.ceil(60/speed)
        //Randomly create block's shape
        this.shape = shapeLib[difficulty][Math.floor(Math.random()*shapeLib[difficulty].length)+0]
        this.color = RandomColor()
        this.lock = false
    }

    execAllCube(obj, execFunc) {
        for (let idxR in obj.shape) {
            const row = obj.shape[idxR]
            for (let idxC in row) {
                let cube = row[idxC]
                if (cube) {
                    execFunc(obj, parseInt(idxR), parseInt(idxC))
                }
            }
        }
    }

    drawCube(x, y)
    {
        ctx.fillStyle = this.color
        ctx.fillRect(x, y, cubeSize, cubeSize);
    }

    drawShadow(x, y)
    {
        ctx.fillStyle = this.color
        ctx.fillRect(x+cubeSize/4, y+cubeSize/4, cubeSize/2, cubeSize/2);
    }

    draw()
    {
        this.execAllCube(this, function (obj, idxR, idxC) {
            obj.drawCube(
                (obj.gridX+idxC)*cubeSize, (obj.gridY+idxR)*cubeSize
            )
        })

        let shadowY = obj.gridY
        while (this.canDrop(obj.gridX, shadowY))
        {
            shadowY += 1
        }

        this.execAllCube(this, function (obj, idxR, idxC) {
            obj.drawShadow(
                (obj.gridX+idxC)*cubeSize, (shadowY+idxR)*cubeSize
            )
        })
    }

    canDrop(gridX, gridY)
    {
        let canDropDown = true

        for (let i in this.shape) {
            let column = []
            for (let j in this.shape) {
                column[j] = this.shape[j][i]
            }
            let cubePos = column.reverse().indexOf(1)
            if (cubePos > -1) {
                let gridBelow = gridY+3-parseInt(cubePos)
                if (gridBelow < gridH) {
                    if (getPosition(obj.gridX+parseInt(i), gridBelow)) {
                        canDropDown = false
                    }
                } else {
                    canDropDown = false
                }
            }
        }

        return canDropDown
    }

    drop(o)
    {
        if (o.canDrop(o.gridX, o.gridY)) {
            o.gridY += 1
        } else if(!o.lock) {
            o.writeBlock(o.gridX, o.gridY, o.shape)
            o.execAllCube(o, function(obj, idxR, idxC) {
                gameObjects.push(new fixed(parseInt(obj.gridX)+parseInt(idxC), parseInt(obj.gridY)+parseInt(idxR), obj.color))
            })
            o.lock = true
        }
    }

    dropToButtom(o)
    {
        while (!this.lock) {
            if (this.canDrop(this.gridX, this.gridY)) {
                this.gridY += 1
            } else {
                this.writeBlock(this.gridX, this.gridY, this.shape)
                this.execAllCube(this, function(obj, idxR, idxC) {
                    gameObjects.push(new fixed(parseInt(obj.gridX)+parseInt(idxC), parseInt(obj.gridY)+parseInt(idxR), obj.color))
                })
                this.lock = true
            }
        }
    }

    moveLeft(obj)
    {
        let canMoveLeft = true
        for (const i in this.shape) {
            let row = this.shape[i]
            let cubePos = row.indexOf(1)
            if (cubePos < 0) cubePos = 3
            if (obj.gridX-1+cubePos > -1) {
                if (cubePos > -1) {
                    if (getPosition(obj.gridX+parseInt(cubePos)-1, obj.gridY+parseInt(i))) {
                        canMoveLeft = false
                    }
                }
            } else {
                canMoveLeft = false
            }
        }

        if (canMoveLeft) {
            obj.gridX -= 1
        }
    }

    moveRight(obj)
    {
        let canMoveRight = true
        for (const i in this.shape) {
            let row = this.shape[i]
            let cubePos = row.slice().reverse().indexOf(1)
            if (cubePos < 0) cubePos = 3
            if (obj.gridX+3-cubePos < gridW) {
                if (cubePos > -1) {
                    if (getPosition(obj.gridX+3-parseInt(cubePos), obj.gridY+parseInt(i))) {
                        canMoveRight = false
                    }
                }
            } else {
                canMoveRight = false
            }
        }

        if (canMoveRight) {
            obj.gridX += 1
        }
    }

    rotateLeft(obj)
    {
        let oldShape = obj.shape
        let newShape = [[], [], []]
        for (let i in oldShape) {
            for (let n in oldShape) {
                for (let j in oldShape) {
                    newShape[j][n] = oldShape.slice().reverse()[n][j]
                }
            }
        }

        let isVaild = true
        for (let i in newShape) {
            let cubePos = newShape[i].slice().reverse().indexOf(1)
            if (cubePos < 0) cubePos = 3
            console.log(parseInt(obj.gridX)+3-parseInt(cubePos))
            if (parseInt(obj.gridX)+3-parseInt(cubePos) > gridW) {
                isVaild = false
            }
            cubePos = newShape[i].indexOf(1)-1
            if (cubePos < 0) cubePos = 0
            if (parseInt(obj.gridX)+parseInt(cubePos) < 0) {
                console.log(cubePos, parseInt(obj.gridX)+parseInt(cubePos))
                isVaild = false
            }
        }

        let execObj = {gridX: obj.gridX, gridY: obj.gridY}
        execObj.shape = newShape
        this.execAllCube(execObj, function(obj, idxR, idxC) {
            if (grid[parseInt(obj.gridY)+parseInt(idxR)][parseInt(obj.gridX)+parseInt(idxC)]) {
                isVaild = false
            }
        })

        if (isVaild)
        {
            obj.shape = newShape
        }
    }

    rotateRight(obj)
    {
        let oldShape = obj.shape
        let newShape = [[], [], []]
        for (let i in oldShape) {
            for (let n in oldShape) {
                for (let j in oldShape) {
                    newShape[j][n] = oldShape.slice().reverse()[n][j]
                }
            }
        }

        for (let i in newShape)
        {
            newShape[i].reverse()
        }
        newShape.reverse()
        
        let isVaild = true
        for (let i in newShape) {
            let cubePos = newShape[i].slice().reverse().indexOf(1)
            if (cubePos < 0) cubePos = 3
            if (parseInt(obj.gridX)+3-parseInt(cubePos) > gridW) {
                isVaild = false
            }
            cubePos = newShape[i].indexOf(1)-1
            if (cubePos < 0) cubePos = 0
            if (parseInt(obj.gridX)+parseInt(cubePos) < 0) {
                console.log("exe1", obj.gridX, cubePos)
                isVaild = false
            }
        }

        let execObj = {gridX: obj.gridX, gridY: obj.gridY}
        execObj.shape = newShape
        this.execAllCube(execObj, function(obj, idxR, idxC) {
            if (grid[parseInt(obj.gridY)+parseInt(idxR)][parseInt(obj.gridX)+parseInt(idxC)]) {
                isVaild = false
            }
        })


        if (isVaild)
        {
            obj.shape = newShape
        }
    }

    writeBlock(gridX, gridY)
    {
        //Write all block's position to grid
        this.execAllCube(this, function (obj, idxR, idxC) {
            writeGrid(parseInt(gridX)+parseInt(idxC), parseInt(gridY)+parseInt(idxR))
        })
    }

    act()
    {
        //Copy this object's reference to "o"
        const o = this

        //Handle keyboard event
        let clicked = false
        document.onkeydown = function(event)
        {
            var key = event.key;
            if (key == "a" && !o.lock && !clicked) {
                o.moveLeft(o)
                clicked = true
            } else if (key == "d" && !o.lock && !clicked) {
                o.moveRight(o)
                clicked = true
            } else if (key == " " && !clicked) {
                if (acceleration > -1) {
                    for(i=0;i<acceleration+1;i++) {
                        o.drop(o)
                    }
                } else {
                    o.dropToButtom(o)
                }
                clicked = true
            } else if (key == "q" && !clicked) {
                o.rotateLeft(o)
            } else if (key == "e" && !clicked) {
                o.rotateRight(o)
            } else if (key == "Control" && !clicked) {
                hold(o.gridX, o.gridY, o.color, o.shape)
            }
        }

        //Drop block
        if (this.remainFrame < 1) {
            this.drop(o)
            this.remainFrame = Math.ceil(60/speed)
        } else {
            this.remainFrame -= 1
        }

        //Draw object
        if (!this.lock) {
            this.draw()
        }
    }
}