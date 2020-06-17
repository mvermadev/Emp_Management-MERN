import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import './Profile.css'

function EditProfile(){

    // React router.
    const history = useHistory();
    const {field, oldValue} = useParams();
  
    //  State properies for partner
    const [empId, setEmpId] = useState('');
    const [empEmail, setEmpEmail] = useState('');
    
    // State properties for emp.
    const [form, setState] = useState({
      newValue : ''
    });

    const userID = localStorage.userId;
   

    // specifying operator for User.
    const specificOperation = () =>{
        axios.get('/newEmployee/empDetails/'+userID)
            .then((res)=>{
                const data = res.data;
                setEmpEmail(data.data[0].email)
                setEmpId(data.data[0].empId)
                console.log("state data : ", data.data[0].fullName)
                console.log('Data has been received :', data.data)
            })
            .catch(()=>{
                alert('Error to retrieving data')
        })
    }

  


    useEffect(()=>{
      specificOperation();
        if(!localStorage.userAuth )
        {
          alert('Login or Register First')
          history.push('/login')
        }
  })

     
    //  Update the field value.
     const updateField=e=>{
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
      };

      //  OnSubmit operation.
    const finalStep = e=>{
      
        e.preventDefault();
      
        const setData = {
          newValue : form.newValue
        }

               // /updateEmp/:id/:email/:field/:newValue
               axios.post(`/newEmployee/updateEmp/${empId}/${empEmail}/${field}/${setData.newValue}`)
               .then(res=>{
                   console.log('Emp Update Info Sended')
                   if(field === "email")
                   {
                     localStorage.removeItem('userAuth')
                     localStorage.removeItem('userId')
                     history.push('/login')
                   }
                   else
                   {
                     history.push('/profile')
                   }
                   return res.data
               }).
               catch(err=>console.log(err + " from sending emp update info"))

      }



    return(
        <div className="headProfile">
        <div className="EditProfile">
        
        <Form method="POST" onSubmit={finalStep}>

        <Form.Group controlId="formBasicEmail">
                <Form.Label>Changes {field}</Form.Label>
                <Form.Control type="text" name="newValue" autoFocus placeholder={oldValue} value={form.newValue} onChange={updateField} required/>
        </Form.Group> 

        <div className="text-center">
        <Button variant="warning" className="btn-block" type="submit">UPDATE</Button>
        </div>
        </Form>
        </div>
        </div>
    );
}

export default EditProfile;