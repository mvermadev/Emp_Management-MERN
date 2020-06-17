import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {OtpAuth} from '../../UserFunction';
import '../Home.css'

// otp identification logic.
class Otp extends Component {
    constructor()
    {
        super()
                // State to store email value.
        this.state = {
            otp : ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

        // assigned value to email.
    onChange(e)
    {
        this.setState({[e.target.name] : e.target.value})
    }

    // final operation when click on submit button.
    onSubmit(e)
    {
        e.preventDefault()
        const authCode = {
            otp : this.state.otp
        }

        // main logic to transmit the data to nodejs.
        OtpAuth(authCode).then(()=>{
            if(localStorage.userToken == authCode.otp)
            {
                localStorage.setItem('userAuth', authCode.otp)
                window.location.replace('/profile')
            }
            else
            {
                alert("Enter correct OTP.")
                
            }
        })
    }

    render() { 
        return ( 
            <div className="Login">
            <div className="loginForm">
            <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" name="otp" value={this.state.otp} placeholder="Enter OTP" required onChange={this.onChange} autoFocus autoComplete="OFF" />
            </Form.Group>
            <Button variant="success btn btn-block" type="submit"> Get In! </Button>
            </Form>
            </div>
            </div>
            );
        }
    }
    
export default Otp;