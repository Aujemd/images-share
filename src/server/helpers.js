const moment = require("moment")

const helpers = {}

helpers.timeAgo = timestamp => {
    return moment(timestamp).startOf("minutes").fromNow()
}

module.exports = helpers