
if (revers) {
    let r = false
    setInterval(function () {
        if (r) {
            document.getElementById('cvs').style.animationName = 'rvsB'
            document.getElementById('cvs').style.transform = 'rotate(0)'
            r = false
        } else {
            document.getElementById('cvs').style.animationName = 'rvs'
            document.getElementById('cvs').style.transform = 'rotate(00.5turn)'
            r = true
        }
    }, reverseItv*1000)
}
