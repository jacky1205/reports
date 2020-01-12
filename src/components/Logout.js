import React from 'react';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import { authenticationAction } from '../actions';
import { useDispatch } from 'react-redux';

const StyleLogout = styled.button`
float:right;
margin-right:30px;
`;

function Logout() {
    const dispatch = useDispatch();

    const handleLogut = () => {
        Cookies.removeItem('user');
        authenticationAction(dispatch);
    }
    return (
        <StyleLogout onClick={handleLogut}>Logout</StyleLogout>
    )
}

export default Logout;