export const formatTimeMS = (time) => {
    const m = Math.floor(time / 60)
    let s = time % 60
    if (s < 10) {
        s = "0" + s
    }
    return `${m}:${s}`
}