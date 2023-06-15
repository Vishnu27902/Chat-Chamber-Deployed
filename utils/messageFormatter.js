const moment = require("moment")

const messageFormatter = (username, message) => {
    time = moment().format("h:mm a")
    return { username, message, time }
}

module.exports = messageFormatter