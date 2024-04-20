 const mongoose= require('mongoose');
const Schema= mongoose.Schema;


const blogschema= new Schema({
    artist_name:{
        type: String,
        require: true
    },
    header:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    
    image:{
        type: String,
        require: true
    },
    audio:{
        type:String,
        require: true
    }
}, {timestamps: true}) 

const Blog= mongoose.model('Blog', blogschema);

module.exports = Blog
   
