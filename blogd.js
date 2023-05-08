const mongoose= require('mongoose');
const schema= mongoose.Schema;

const blog= new schema({
    artist_name:{
        type: String,
        require: true
    },
    comment:{
        type:String,
        require:true
    },
    dlink:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    plink:{
        type:String,
        require:true
    }
    

}, {timestamps: true})

const Blogd =mongoose.model('Blogd', blog);
module.exports= Blogd;