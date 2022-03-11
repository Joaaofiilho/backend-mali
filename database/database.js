import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ItemSchema from './ItemSchema.js'

dotenv.config()

var uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
})

export { ItemSchema }