const moment = require("moment")

const messageFormatter = (username, message) => {
    time = moment().utcOffset("+05:30").format("h:mm a")
    return { username, message, time }
}

module.exports = messageFormatter
