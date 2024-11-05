const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PendingSchema = new Schema({
    id_speaker : String,
    title : String,
    speaker : String,
    long_duration  :Boolean,
    category : String,
    description : String,
    check : { type : Boolean , default : false },
    recommend: {
        type: Boolean,
        default: false
    }
})

const Pending = mongoose.model('pending', PendingSchema)
module.exports = Pending