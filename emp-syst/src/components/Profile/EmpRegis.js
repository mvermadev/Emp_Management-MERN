import React, { Component, useEffect, useState } from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap'
import {addEmpInfo} from '../UserFunction';
import './Profile.css'

// registration of employee logic.
function EmpRegis(){
    const history = useHistory();

    // collection for store the value.
    const [form, setState] = useState({
      name : '',
      email : '',
      address : '',
      pincode : '',
      phone : '',
      department: '',
      post: '',
      joinDate: '',
      dob: '',
      gender: '',
      empId: '',
    });

    // hit constantly when field became updated.
    const updateField=e=>{
      setState({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    // final operation to complete registration by storing the value in mongoDB through nodejs server communication.
    const finalStep = e=>{
      
      e.preventDefault();

      const empValue = "SB-Emp-"+Math.floor(Math.random() * 100000);

    //   main values of user.
      const empData = {
        name : form.name,
        email : form.email,
        address : form.address,
        pincode : form.pincode,
        phone : form.phone,
        department : form.department,
        post : form.post,
        joinDate: form.joinDate,
        dob: form.dob,
        gender: form.gender,
        empId: empValue,
      }
     
    //   run the fucntion of userFunction.js
      addEmpInfo(empData).then(()=>{
        localStorage.setItem("refNo", empValue);
        history.push('/profile')
      })

    }

    // intial loader.
    useEffect(()=>{
      if(!(localStorage.userAuth))
      {
        alert('Login First')
        history.push('/')
      }
    })

    return(
        <div className="headEmpRegis">
            <div className="EmpRegis">
            <p className="text-center">Enter details to make the profile.</p>
        <Form method="POST" onSubmit={finalStep}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" value={form.name} onChange={updateField} required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email (OPTIONAL)" name="email" value={form.email} onChange={updateField} required />
        </Form.Group>
     

        <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Address</Form.Label>
        <Form.Control type="text" placeholder="Address 1" name="address" value={form.address1} onChange={updateField} required />
      </Form.Group>
      
      <Form.Group controlId="formBasicEmail">
      <Form.Label>Pincode.</Form.Label>
      <Form.Control type="text" placeholder="Enter Area Pincode" name="pincode" value={form.pincode} onChange={updateField} required />
    </Form.Group>
      
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Contact No.</Form.Label>
        <Form.Control type="tel" placeholder="Enter contact no." name="phone" value={form.phone} onChange={updateField} required />
    </Form.Group>

    <Form.Group controlId="formGridState">
    <Form.Label>DEPARTMENT</Form.Label>
    <Form.Control as="select" value={form.state} name="department" onChange={updateField}  required>
      <option value="">Choose...</option>
      <option>IT</option>
      <option>Production</option>
      <option>Human Resource</option>
      <option>Utility</option>
      <option>Total Quality</option>
      <option>Inspection</option>
      <option>Testing</option>
      <option>Security</option>
      <option>House Keeping</option>
      <option>Other</option>
    </Form.Control>
  </Form.Group>

    <Form.Group controlId="formGridState">
    <Form.Label>POST</Form.Label>
    <Form.Control as="select" value={form.state} name="post" onChange={updateField}  required>
      <option value="">Choose...</option>
      <option>Intern</option>
      <option>Junior Assistant</option>
      <option>Junior</option>
      <option>Senior Assistant</option>
      <option>Senior</option>
      <option>Assistant Manager</option>
      <option>General Manager</option>
      <option>Assistant President</option>
      <option>Vice President</option>
      <option>Other</option>
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
        <Form.Label>Joining Date</Form.Label>
        <Form.Control type="date" name="joinDate" value={form.joinDate} onChange={updateField} required />
    </Form.Group>

  <Form.Group controlId="formBasicEmail">
        <Form.Label>DOB</Form.Label>
        <Form.Control type="date" name="dob" value={form.dob} onChange={updateField} required />
    </Form.Group>

  <Form.Group as={Col} required>
    <Row sm={10}>
      <Form.Check className="ml-2"
        type="radio"
        label="MALE"
        name="gender"
        id="formHorizontalRadios1" value="Male" onChange={updateField}
      />
      <Form.Check className="ml-2"
        type="radio"
        label="FEMALE"
        name="gender"
        id="formHorizontalRadios2" value="Female" onChange={updateField}
      />
    </Row>
  </Form.Group>
    <Form.Text className="text-muted">
    We'll never share your info with anyone else.
    </Form.Text>
    <div className="text-center">
    <Button variant="success" className="btn-block rounded mt-2" type="submit">BOOK</Button> 
    </div>
        </Form>
        </div>
        </div>
    )
}


export default EmpRegis;