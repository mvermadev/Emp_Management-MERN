import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Fixed/Header';
import HomePage from './Home/HomePage';
import Login from "./Home/Registration/Login";
import Otp from "./Home/Registration/Otp";
import EmpRegis from './Profile/EmpRegis';
import EmpProfile from './Profile/EmpProfile';
import EditProfile from './Profile/EditProfile';

// backbone of the application, which have complete navigation information and all pages which are required.
function Main() {
    return (
        <Router>
            <Header/>
                <Switch> 
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/auth" component={Otp}/>
                    <Route path="/registration" component={EmpRegis}/>
                    <Route path="/profile" component={EmpProfile}/>
                    <Route path="/editProfile/:field/:oldValue" component={EditProfile}/>
                    
                </Switch>
        </Router>
    )
}

export default Main
