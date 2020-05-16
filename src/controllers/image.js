const path = require("path")
const {random} = require("../helpers/libs")
const fs = require("fs-extra")
const ctrl = {}

ctrl.index = (req, res) => {
    res.send("Index Page")
}

ctrl.create = async (req, res) => {
    const imgUrl = random()
    const ext = path.extname(req.file.originalname).toLowerCase()
    const imageTempPath = req.file.path
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

    if(ext === ".png" || ext === ".jpg" || ext === ".gif"){
        await fs.rename(imageTempPath, targetPath)
    }
    res.send("Works!")
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