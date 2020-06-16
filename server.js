const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

// secure for applciation.
const port = process.env.PORT || 5000;

// parse the complete req param.
app.use(bodyParser.json());

// enable cross-origin-resource sharing for comm between react and node app.
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

// URI to connect with mongodb server.
const mongoURI = "mongodb://localhost:27017/sb_services";

// now, connected to mongoDB:)
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('mongoDb connected'))
.catch(err=>console.log(err));

// fetching router of otp.js
let sendOtpRouter = require('./routes/otp')
app.use('/users', sendOtpRouter);

// fetching router of EmpReg.js
let empRegisRouter = require('./routes/EmpReg');
app.use('/newEmployee', empRegisRouter);

// listen the port to run the node app. And here I'm using 1111 port for development and testing.
app.listen(1111, ()=>{
    console.log('the 1111 is running port.');
})