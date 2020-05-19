require('dotenv').config()

module.exports = {
    database: {
        URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}-mzmw3.mongodb.net/imgShare?retryWrites=true&w=majority`
    }
}