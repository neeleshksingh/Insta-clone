const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    likes: { type: Number, default: Math.floor(Math.random() * 100) },
    description: { type: String, required: true },
    PostImage: { data: Buffer, contentType: String },
    Date: { type: String, default: new Date().toLocaleDateString() }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel