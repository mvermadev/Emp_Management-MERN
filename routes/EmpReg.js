const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const empReg = require('../models/empReg');
const { route } = require('./otp');
router.use(cors());

// Create Operation.
router.post('/emplyeeRegisteration', (req, res)=>{
    const today = new Date();
    // entire data of a new emp.
    const empData = {
        fullName : req.body.fullName,
        email : req.body.email,
        address : req.body.address,
        pincode : req.body.pincode,
        phone : req.body.phone,
        department : req.body.department,
        post : req.body.post,
        post : req.body.post,
        joinDate : req.body.joinDate,
        dob : req.body.dob,
        gender : req.body.gender,
        empId : req.body.empId,
        created : today
    }
    console.log(req.body);

    // authenticate, if user already exist or not.
    empReg.findOne({
        email: empData.email
    })
    .then(user=>{
        // if not exist.
        if(!user)
        {
            // New Emp operatio to store in Db.
            empReg.create(empData)
            .then((user)=>{
                console.log('data stored.');
                res.json({status : user.email + " message added"});
            }).
            catch(err=>{
                res.send('error ' + err)
            })

            // Send Email as well.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'servicebird365@gmail.com',
                    pass : 'b-i-r-d1997eservices'
                }
            });

            const mailOptions = {
                from: 'ServiceBird 365',
                to: empData.email,
                subject : 'E-Services Response',
                // text : 'Hey ' + empData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + empData.message + '].'
                text : `Hey ${empData.name}, we received your detail to registetr as a employee in this top leading e-service company. Now, enjoy our employee profile panel to use it.\n\nThank you to join us.`
            }

            // transport the mail to the user.
            transporter.sendMail(mailOptions, (err, info)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log('Email is sended');
                    res.end();
                }
            })

        }
        // if exist already
        else
        {
            // res.json({erro: "emp already exist."});
            console.log('emp already exist')
        }
    })
    
    res.end();
})

// Read operation
router.get('/empDetails/:email', (req, res)=>{
    const emailVal = req.params.email;

    empReg.find({ email: emailVal})
    .then((data)=>{
        console.log('userDetails data received')
        res.json({data});
    }).
    catch(err=>{
        console.log('Error fom retrieve Details : ', err)
    })

})

// Update Emp Information operation.
router.post('/updateEmp/:id/:email/:field/:newValue', (req, res)=>{
    // const newValue = req.params.newValue;
    
    const today = new Date();
    const empData = {
        empId : req.params.id,
        email : req.params.email,
        field : req.params.field,
        newValue : req.params.newValue,
    }

    const query = {empId : empData.empId}

    const objValue = {};
    objValue[empData.field] = empData.newValue;

    
    // console.log(req.body);
    console.log(query)
    console.log(objValue)
    
    // update the emp informatio, if they want only!
    empReg.updateOne(query, { $set : objValue }, 
    (err, raw)=>{
        if(err)
        {
            res.send('Err to update')
        }
        else
        {
            console.log(raw)
        }
    });

    res.end();

})

// Delete Emp profile
router.post('/removeEmp/:empId', (req, res)=>{
    const empIdRec = req.params.empId;

    const query = {empId : empIdRec};

    // Remove user from the database. if they want only.
    empReg.deleteOne(query, (err, raw)=>{
        if(err) throw err;
        console.log(raw.result + " record(s) deleted");  
    })
    // end the complete response from the header.
    res.end();
})

// export the module as router codename.
module.exports = router