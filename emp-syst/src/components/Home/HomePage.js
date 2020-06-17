import React from 'react'
import {Button} from 'react-bootstrap'
import Header from '../Fixed/Header'
import { Link } from 'react-router-dom'
import './Home.css'



function HomePage() {
    // if user exist.
    const yesUser = (
       
        <Link to="/profile"><Button variant="outline-warning btn" className='btn'>My Profile</Button> </Link>
    )

    // if not...
    const noUser = (
        <Link to="/login"><Button variant="outline-warning btn" className='btn'>GET IN</Button></Link>
    )
    

    return (
        <div className="HomePage">
            <div className="text">
            <h3>Welcome to ServiceBird365 Employee Dashboard.</h3>
            <div className="center">
            
            {localStorage.userAuth || localStorage.userId ? yesUser : noUser}
            </div>
            </div>
        </div>
    )
}

export default HomePage
