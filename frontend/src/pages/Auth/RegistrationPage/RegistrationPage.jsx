import { Box } from '@mui/material';
import React from 'react';
import Navbar from '../../../components/Navbar';
import LoginForm from '../../Auth/RegistrationPage/RegistrationForm'
import RegistrationForm from '../../Auth/RegistrationPage/RegistrationForm';

function RegistrationPage(){

    return(
        <Box>
            <RegistrationForm />
        </Box>
    );

}

export default RegistrationPage;