const {Image} = require("../models/index")

module.exports = {
    async popular(){
        const images = await Image.find()
                    .limit(9)
                    .sort({lkes: -1})
        return images
    }
}