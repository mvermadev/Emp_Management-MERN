import React from 'react'
import {useHistory , Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Header.css'

// Function component for header.
function Header() {

    // use to redirect to another page.
    const history = useHistory();

    // logout logic
    const logout = (e)=>{
        e.preventDefault();
        // remove Authentication values.
        localStorage.removeItem('userAuth');
        localStorage.removeItem('userId');
        history.push('/')
    }

    // If user exist.
    const yesUser = (
    
        <Button variant="outline-warning btn" className='btn' onClick={logout}>Logout</Button>
    )

// We do not able to write comment in return!

    return (
        <div className="Header" id="headerId">
            <div>
            <Link to="/"><p> ServiceBird365 </p></Link>
            </div>
            <div>
            <p>
                {localStorage.userAuth ? yesUser : ''}
            </p>
            </div>
        </div>
    )
}

export default Header
