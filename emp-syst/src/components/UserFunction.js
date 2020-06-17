import axios from 'axios';

// transmit the new register emp values.
export const register = newUser=>{
    return axios
    .post('users/sendOtp',  {
        email : newUser.email
    })
    .then(res=>{
        console.log('Registered');
        console.log('Register res.data : ', res.data);
        return res.data;
    })
    .catch(err=>console.log(err + " from axios register"))
}

// transmit the  register emp otp.
export const OtpAuth = user=>{
    return axios
    .post('users/otpAuth', {
        otp : user.otp
    })
    .then(res=>{
        console.log('Genuine OTP')
        console.log('userToken : ', user.otp);
        localStorage.setItem('userToken', user.otp);
        console.log('res data : ', res.data);
        return res.data;
    }).
    catch(err=>{
        console.log(err+" from verifiying OTP");

    })
}

// transmit the new register emp all values
export const addEmpInfo = user => {
    return axios
    .post('/newEmployee/emplyeeRegisteration', {
        fullName : user.name,
        email : user.email,
        address : user.address,
        pincode : user.pincode,
        phone : user.phone,
        department : user.department,
        post : user.post,
        joinDate : user.joinDate,
        dob : user.dob,
        gender : user.gender,
        empId : user.empId,
    })
    .then(res=>{
        console.log('book service Info Sended')
        return res.data
    }).
    catch(err=>console.log(err + " from sending book service info"))
}