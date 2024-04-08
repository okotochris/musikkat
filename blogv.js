const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Blog = new schema({
    link: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Fix the typo here

const Blogv = mongoose.model('Blogv', Blog);
module.exports = Blogv;
