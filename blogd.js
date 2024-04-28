const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    artist_name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    dlink: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    plink: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    
}, { timestamps: true });

const Blogd = mongoose.model('Blogd', blogSchema);
module.exports = Blogd;