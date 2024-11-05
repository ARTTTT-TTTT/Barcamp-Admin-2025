const { Schema, default: mongoose } = require('mongoose')

const collection = "Topics"

const TopicModel = new Schema({
    id_speaker: String,
    title: String,
    speaker: String,
    long_duration: Boolean,
    category: String,
    votes: [String],
    description: String,
    recommend: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model(collection, TopicModel)