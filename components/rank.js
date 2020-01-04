
function record(score) {
    if (parseInt(score) > parseInt(document.cookie)) {
        document.cookie = score
    }
}
