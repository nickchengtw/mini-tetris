
class fixed
{
    constructor(gridX, gridY, color)
    {
        this.type = "cube"
        this.gridX = gridX
        this.gridY = gridY
        this.color = color
    }

    draw()
    {
        ctx.fillStyle = this.color
        ctx.fillRect(this.gridX*cubeSize, this.gridY*cubeSize, cubeSize, cubeSize);
    }

    act()
    {
        draw()
    }
}
