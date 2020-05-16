const path = require("path")
const {random} = require("../helpers/libs")
const fs = require("fs-extra")
const {Image} = require("../models")

const ctrl = {}

ctrl.index = (req, res) => {
    res.send("Index Page")
}

ctrl.create = (req, res) => {

    const saveImage = async () =>{
        const imgUrl = random()
        const images = await Image.find({filename: imgUrl})

        if(images.length > 0){
            saveImage()
        }else{
            const ext = path.extname(req.file.originalname).toLowerCase()
            const imageTempPath = req.file.path
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

            if(ext === ".png" || ext === ".jpg" || ext === ".gif"){
                await fs.rename(imageTempPath, targetPath)
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                })
                const imageSaved = await newImg.save()
                res.send("Works!")
            }else{
                await fs.unlink(imageTempPath)
                res.status(500).json({error: "Only Images are allowed"})
            }
        }
    }

    saveImage()
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