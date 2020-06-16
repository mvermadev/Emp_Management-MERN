const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Emp registaion schema to store it accordingly.
const empRegSchema = new schema({
    fullName : {
        type: String
    },
    email : {
        type: String,
    },
    address : {
        type: String,
    },
    pincode : {
        type: String,
    },
    phone : {
        type: String
    },
    department : {
        type: String
    },
    post:{
        type: String
    },
    joinDate : {
        type: String,
    },
    dob: {
        type: String,
    },
    gender:{
        type: String,
    },
    empId : {
        type: String,
        required : true
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})


module.exports = empRegis = mongoose.model('empRegis', empRegSchema);