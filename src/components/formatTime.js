export const formatTime = (time) => {
    const min = Math.floor(time / 60)
    let sec = time % 60
    if (sec < 10) {
        sec = "0" + sec
    }
    return min + ":" + sec
}