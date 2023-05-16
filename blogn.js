const mongoose= require('mongoose');
const schema= mongoose.Schema;

const Blog= new schema({
    helder:{
        type: String,
        require:true
    },
    news:{
        type: String,
        require: true
    },
    image:{
        type: String, 
        require: true
    }
}, {timestamps: true})

const Blogn= mongoose.model('Blogn', Blog);
module.exports= Blogn;