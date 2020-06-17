import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import {register} from '../../UserFunction';
import '../Home.css'

// Login logic.
class Login extends Component {
    constructor()
    {
        super()
        // State to store email value.
        this.state={
            email: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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

        const user = {
            email : this.state.email
        }
        
        // main logic to transmit the data to nodejs.
        register(user).then(res=>{
            if(res)
            {
                console.log("successfully registered.")
            }
            else{
                localStorage.setItem('userId', user.email)
                this.props.history.push('/auth');
            }
        })
    }

    // load in every loading.
    componentDidMount(){
        if(localStorage.partAuth){
            localStorage.removeItem('partAuth')
        }
    }

    render() { 
        return ( 
            <div className="Login">
            <div className="loginForm">
            <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required autoFocus name="email" onChange={this.onChange} value={this.state.email}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
            <Button variant="warning btn btn-block mt-4" type="submit">Get OTP</Button> 
            </Form> 
            </div>
            </div>
            );
        }
    }
    
export default Login;