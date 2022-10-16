import React, {useState, useRef} from "react";
import Api from './api';
import './Login.css'
const Login = () => {
    const [inputs, setInputs] = useState({});
    const formRef = useRef(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = () => {
        const api = new Api();
        api.submitLogin(formRef.current);
    }

    return(
        <form ref={formRef}>
            <input type='text' name='username' value={inputs.username} onChange={handleChange} placeholder='username'></input>
            <input type='password' name='password' value={inputs.password} onChange={handleChange} placeholder='password'></input>
            <input type='button' name='submit' value='Login' onClick={handleSubmit}></input>
            <a href='#reset'>reset password</a>
        </form>
    )
}

export default Login;