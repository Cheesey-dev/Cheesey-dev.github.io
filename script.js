function getRemainingTime() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const regex = window.location.href.match(/http:\/\/127.0.0.1\:5500\/\?(end)=(\d+)/)

    if (!regex) {
        document.getElementById('ends').innerHTML = 'Invalid Giveaway'
        document.getElementById('date').innerHTML = null
        return
    }

    let [, endString, endTime] = regex

    if (!endString || endString !== 'end' || !endTime) {
        document.getElementById('ends').innerHTML = 'Invalid Giveaway'
        document.getElementById('date').innerHTML = null
        return
    }

    let ends = Number(endTime)

    if (ends <= 0) {
        document.getElementById('ends').innerHTML = 'Invalid Giveaway'
        document.getElementById('date').innerHTML = null
        return
    }

    let utc_ms = Date.now()
    let milliseconds = ends - utc_ms

    if (milliseconds <= 0) {
        document.getElementById('ends').innerHTML = 'This giveaway has ended'
        document.getElementById('date').innerHTML = null
        return
    }

    const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil

    const date = new Date(ends).toUTCString().replace(" GMT", "")
	console.log(date)

    document.getElementById('ends').innerHTML = `${roundTowardsZero(milliseconds / 86400000)}d ${roundTowardsZero(milliseconds / 3600000) % 24}h ${roundTowardsZero(milliseconds / 60000) % 60}m ${roundTowardsZero(milliseconds / 1000) % 60}s remaining`

    function getOrdinalNum(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '')
    }

    const interval = setInterval(() => {
        milliseconds -= 1000
        if (milliseconds <= 0) {
            clearInterval(interval)
            document.getElementById('ends').innerHTML = 'This giveaway has ended'
            document.getElementById('date').innerHTML = null
        } else {
            document.getElementById('ends').innerHTML = `${roundTowardsZero(milliseconds / 86400000)}d ${roundTowardsZero(milliseconds / 3600000) % 24}h ${roundTowardsZero(milliseconds / 60000) % 60}m ${roundTowardsZero(milliseconds / 1000) % 60}s remaining`
        }
    }, 1000)
}

getRemainingTime()
