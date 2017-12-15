var mongoose = require('mongoose');

var EmployeeShema = new mongoose.Schema({
    name: String,
    address: String,
    position: String,
    age: Number,
    id_card: String,
    update_at:{
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('Employee',EmployeeShema)