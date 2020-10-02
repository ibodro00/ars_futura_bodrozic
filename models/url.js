const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlschema = new Schema({
    data:{
        type:String,
        require:true,
        minlength: [1, 'Minimum input length is 1 character']
    },
    uuid:{
        type:String,
        require:true
    }
    
},{timestamps:true})

const URL = mongoose.model('URL', urlschema, 'URL');

module.exports = URL;