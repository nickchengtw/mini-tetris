
function RandomColor() {
    let c = ['#2196F3', '#F44336', '#4CAF50', '#FFC107'][Math.floor(Math.random()*4)+0]

    if (colorChaos) {
        const r = Math.floor(Math.random()*255)+0
        const g = Math.floor(Math.random()*255)+0
        const b = Math.floor(Math.random()*255)+0
        c = "#"+r.toString(16)+g.toString(16)+b.toString(16)
    }

    return c
}