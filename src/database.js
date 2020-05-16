const mongoose = require("mongoose")

const {database} = require("./keys")

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(db => console.log("DB Connected"))
  .catch(err => console.error(err))