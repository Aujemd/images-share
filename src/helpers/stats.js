const {Image, Comment} = require("../models")

async function imageCounter(){
    return await Image.countDocuments()
}

async function commentsCounter(){
    return await Comment.countDocuments()
}

async function imageTotalViewsCounter(){

    if (await Image.countDocuments() > 0) {
        const result = await Image.aggregate([{$group: {
            _id: 1,
            viewsTotal: {$sum : "$views"}
        }}])
        return result[0].viewsTotal
    }

    return 0
}

async function likesTotalCounter(){
    if (await Image.countDocuments() > 0) {
        const result = await Image.aggregate([{$group: {
            _id: 1,
            likesTotal: {$sum : "$likes"}
        }}])
        return result[0].likesTotal
    }

    return 0
}
module.exports = async () => {

    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])

    return{
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}