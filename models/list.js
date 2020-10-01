const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listschema = new Schema({
    name:{
        type:String,
        require:true
    },
    uuid:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const List = mongoose.model('List', listschema);

module.exports = List;