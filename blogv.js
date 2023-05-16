const mongoose= require('mongoose');
const schema= mongoose.Schema;

const Blog= new schema({
    link:{
        type: String,
        requrire:true
    },
    content:{
        type: String,
        require: true
    }
}, {timestamp: true})

const Blogv= mongoose.model('Blogv', Blog);
module.exports= Blogv;