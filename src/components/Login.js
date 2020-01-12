import React, { useState } from 'react';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import { authenticationAction } from '../actions'
import { useDispatch } from 'react-redux';


const LogoutContainer = styled.div`
 margin-top:20px;
`;

const StyleAuthInput = styled.input`
margin:15px;
`;


function Login() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(null);
    const [passWord, setPassWord] = useState(null);
    const handleUsername = (e) => {
        const { value } = e.target;
        setUserName(value);
    }
    const handlePassword = (e) => {
        const { value } = e.target;
        setPassWord(value);
    }

    const handleAuthenticate = () => {
        Cookies.setItem('user', userName);
        authenticationAction(dispatch);
    }

    return (
        <LogoutContainer>
            <form onSubmit={handleAuthenticate}>
                Enter Username:
  <StyleAuthInput type="text" value={userName} onChange={handleUsername} required />
                Enter Password:
  <StyleAuthInput type="text" value={passWord} onChange={handlePassword} required />

                <StyleAuthInput type="submit" value="Submit" />
            </form>
        </LogoutContainer>
    )
}

export default Login;