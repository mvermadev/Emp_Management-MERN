const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const rn = require('random-number');

// Create Path to connect with different port and pages.
router.use(cors());

// Generate Random number to send as email to the user.
const options = {
    min : 10000,
    max : 100000,
    integer : true
}

// Assign final value in 5-6 digits
var ran = rn(options)

// created router for send otp operartion in post method.
router.post('/sendOtp', (req, res)=>{
    const email = req.body.email;

    // Transporter details to send the mail.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '', // your email.
            pass : '' // your password.
        }
    });

    // information which we have to send as a mail to the user.
    const mailOptions = {
        from: 'ServiceBird 365',
        to: email,
        subject : 'OTP',
        text : 'Hey ' + ', Your OTP verfication is : ' + ran + ' for E-service Website Registration process'
    }

    // final mail transmitting operation.
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Email is sended');
            console.log(ran)
            res.end();
        }
    })
    // end the complete response from the /sendOtp header.
    res.end();
})

// It's a it to authenticate the Otp.
router.post('/otpAuth', (req, res)=>{
    const otp = req.body.otp;
    
    // For Success.
    if(otp == ran)
    {
        console.log('otp succed');
    }
    // For failure
    else
    {
        console.log('Invalid OTP');
        // Fake command to stop the script.
        res.redirect('/login')
    }
    // end the complete response from the header.
    res.end();
})

// export the module as router codename.
module.exports = router