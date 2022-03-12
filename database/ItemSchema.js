import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    done: {
        type: Boolean,
        required: false,
    }
}, { collection: 'items' });

export default mongoose.model('Item', ItemSchema)