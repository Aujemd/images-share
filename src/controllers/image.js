const path = require("path")
const {random} = require("../helpers/libs")
const fs = require("fs-extra")
const {Image, Comment} = require("../models")
const md5 = require("md5")

const ctrl = {}

ctrl.index = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    console.log(image)
    res.render("image", {image})
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

            if(ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === '.jpeg'){
                await fs.rename(imageTempPath, targetPath)
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                })
                const imageSaved = await newImg.save()
                res.redirect("/images/" + imgUrl)
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

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})

    if(image){
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        await newComment.save()
        res.redirect("/images/" + image.uniqueId)
    }
    res.send("Comment Page")
}

ctrl.remove = (req, res) => {
    res.send("Remove Page")
}
module.exports = ctrl