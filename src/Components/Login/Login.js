import React, {useState } from 'react';
import Style from './Login.module.css';
import { onChangeHandler , clearInputs } from '../../Utils/util_functions';
import { useNavigate } from 'react-router-dom';
import { useContextValue } from '../../Context/CustomContext';

const Login = () => {
    const navigate = useNavigate();
    const {signIn} = useContextValue();
    const [signInData, setSignInData] = useState({});
    const handleSubmit = (e)=>{
        e.preventDefault();
        signIn(signInData);
        clearInputs('sign-in-inp');
        navigate("/")
    }    
  return (
    <div className={Style.container}>
        <form>
            <input type="email" className='sign-in-inp' name="username" id="email" placeholder='Enter username' onChange={(e)=> onChangeHandler(e.target , signInData , setSignInData)} required/>
            <input type="password" className='sign-in-inp' name="password" id="password" placeholder='Enter Password' onChange={(e)=> onChangeHandler(e.target , signInData , setSignInData)} required/>
            <button type="submit" className="btn btn-sm btn-outline-success" onClick={handleSubmit}>Sign In</button>
          </form>
    </div>
  )
}

export default Login