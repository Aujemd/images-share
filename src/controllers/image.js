const ctrl = {}

ctrl.index = (req, res) => {
    res.send("Index Page")
}

ctrl.create = (req, res) => {
    res.send("Create Page")
}

ctrl.like = (req, res) => {
    res.send("Like Page")
}

ctrl.comment = (req, res) => {
    res.send("Comment Page")
}

ctrl.remove = (req, res) => {
    res.send("Remove Page")
}
module.exports = ctrl