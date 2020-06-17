import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Profile.css'

function EmpProfile(){

    // again for redirect to another page.
    const history = useHistory();
    
    // state collection of values of emp.
    const [name, setName] = useState('')
    , [empEmail, setEmpEmail] = useState('')
    , [address, setAddress] = useState('')
    , [pincode, setPincode] = useState('')
    , [phone, setPhone] = useState('')
    , [department, setDepartment] = useState('')
    , [post, setPost] = useState('')
    , [joinDate, setJoinDate] = useState('')
    , [dob, setDob] = useState('')
    , [gender, setGender] = useState('')
    , [empId, setEmpId] = useState('');

    const userId = localStorage.userId;

    // recept the employee data.
    const getEmpData = () =>{
         axios.get('/newEmployee/empDetails/'+userId)
         .then((res)=>{
             const data = res.data;
             setName(data.data[0].fullName);
             setEmpEmail(data.data[0].email);
             setAddress(data.data[0].address);
             setPincode(data.data[0].pincode);
             setPhone(data.data[0].phone);
             setDepartment(data.data[0].department);
             setPost(data.data[0].post);
             setJoinDate(data.data[0].joinDate)
             setDob(data.data[0].dob)
             setGender(data.data[0].gender)
             setEmpId(data.data[0].empId)
             console.log("state data : ", data.data[0].fullName)
             console.log('name received :', data.data.fullName)
             console.log('Data has been received :', data.data)
         })
         .catch(()=>{
             let c = window.confirm('Please register your details!');  
             if(c == true){
               history.push('/registration')
             }
         })
     }

    //  delete emp if they want...
     const deleteEmp = ()=>{
        // /removeEmp/:empId
        let c = window.confirm('Are you sure?');  
        if(c == true){

         axios.post('/newEmployee/removeEmp/'+empId)
         .then(res=>{
             console.log('emp delete');
             localStorage.removeItem('userAuth')
             localStorage.removeItem('userId')
             history.push('/')
         })
         .catch((err)=>{
            console.log('error to delete emp : ', err);
         })
        }
    }

    //initial effect in every loading.
    useEffect(()=>{
        getEmpData();
        if(!localStorage.userAuth)
        {
            alert('Login or Register First')
            history.push('/login')
        }
    })

    // bundle of link to edit a specific field properly.
    const editLink = {
         nameLink : '/editProfile/fullName/'+name,
         phoneLink : '/editProfile/phone/'+phone,
         pincodeLink : '/editProfile/pincode/'+pincode,
         adddressLink : '/editProfile/address/'+address,
         department : '/editProfile/department/'+department,
         post : '/editProfile/post/'+post,
         joinDate : '/editProfile/joinDate/'+joinDate,
         dob : '/editProfile/dob/'+dob,
         email : '/editProfile/email/'+empEmail,
         gender : '/editProfile/gender/'+gender,

     }


    return(
        <div >
        <div className="profileImg">
        <img src="https://cdn3.iconfinder.com/data/icons/business-and-employment-2/48/laptop_profile_view_computer_information-512.png" alt="partner profile"/>
        <h5 className="text-center">{name} Profile</h5>
        </div>
        <div className="partnerDetails">
        <div className="detail">
                <p>Employee Id</p>
                <p>{empId}
                <Button variant="outline-dark" >Uneditable</Button>
                </p>
            </div>
            <div className="detail">
                <p>Full Name</p>
                <p>{name}
               <Link to={editLink.nameLink}> <Button variant="outline-dark">Edit</Button> </Link>
                </p>

            </div>
            <div className="detail">
                <p>Contact No.</p>
                <p>{phone}
                <Link to={editLink.phoneLink}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Email.</p>
                <p>{empEmail}
                <Link to={editLink.email}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Address</p>
                <p>{address}
                <Link to={editLink.adddressLink}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Pincode</p>
                <p>{pincode}
                <Link to={editLink.pincodeLink}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Department</p>
                <p>{department}
                <Link to={editLink.department}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>POST</p>
                <p>{post}
                <Link to={editLink.post}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Joined Date</p>
                <p>{joinDate}
                <Link to={editLink.joinDate}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Date of birth</p>
                <p>{dob}
                <Link to={editLink.dob}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            <div className="detail">
                <p>Gender</p>
                <p>{gender}
                <Link to={editLink.gender}> <Button variant="outline-dark" >Edit</Button> </Link>
                </p>
            </div>
            
            <div className="detail">
                <p>Remove Profile.</p>
             <Button variant="warning" className="btn-block" onClick={deleteEmp} >Delete Profile</Button>
            </div>
            </div>
        </div>
    );
}

export default EmpProfile;
