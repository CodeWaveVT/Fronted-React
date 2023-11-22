import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import '../CSS/general.css';
import * as Yup from "yup";
import { useState } from 'react';
import { Formik, Form, Field } from "formik";
import SnackBar from '../Components/SnackBar';

export default function CreateResetAccount({ title }) {
    const navigate = useNavigate();
    const [sendCodeClicked, setSendCodeClicked] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackNum, setSnackNum] = useState(1);

    const initialValues = {
        email: "",
        password: "",
        passwordConfirmed: "",
        confirmation: "",
    };

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required("You must input an email"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .max(25, "Password must be at most 8 characters long")
            .required("You must input a password"),
        passwordConfirmed: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        confirmation: Yup.string().required("You must input the confirmation code"),
    });


    const handleRegister = async (userData) => {
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if(responseData.data === "register success"){
                    console.log('Account set up successfully');
                    setSnackNum(6);
                    setSnackBarOpen(true);
                    await sleep(1000);
                    navigate('/');
                }
                else if (responseData.message === "userAccount is already exist") {
                    console.log('Account already exists!');
                    setSnackNum(10);
                    setSnackBarOpen(true);
                    return;
                }
                else if (responseData.message === "validateCode is not equal cacheCode") {
                    console.log('Confirmation Code Incorrect!');
                    setSnackNum(11);
                    setSnackBarOpen(true);
                    return;
                }
                else{
                    console.error('Failed to set up account!');
                    setSnackNum(7);
                    setSnackBarOpen(true);
                    return;
                }
            } else {
                const errorData = await response.json();
                throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Failed to set up account:', error);
            setSnackNum(7);
            setSnackBarOpen(true);
        }
    }

    const handleResetPassword = async (userData) => {
        try {
            const response = await fetch('/api/user/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.data === "reset password success") {
                    console.log('reset password success!');
                    setSnackNum(12);
                    setSnackBarOpen(true);
                    await sleep(3000);
                    navigate('/');
                    return;
                }
                else if (responseData.message === "validateCode is not equal cacheCode") {
                    console.log('Confirmation Code Incorrect!');
                    setSnackNum(11);
                    setSnackBarOpen(true);
                    return;
                }
                else if(responseData.message === "userAccount not exist,please register"){
                    console.log('userAccount not exist,please register!');
                    setSnackNum(13);
                    setSnackBarOpen(true);
                    return;
                }
                else{
                    console.error('Failed to set up account!');
                    setSnackNum(7);
                    setSnackBarOpen(true);
                    return;
                }
            } else {
                const errorData = await response.json();
                throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Failed to set up account:', error);
            setSnackNum(7);
            setSnackBarOpen(true);
        }
    }

    const handleSetUpAccount = async (values) => {
        const userData = {
            userAccount: values.email, // 用户输入的邮箱作为用户名
            userPassword: values.password, // 用户密码
            checkPassword: values.passwordConfirmed, // 确认密码
            validateCode: values.confirmation, // 用户输入的验证码
        };

        if(title === "Create Account"){
            handleRegister(userData);
        }
        else{
            handleResetPassword(userData);
        }
        
    };


    const handleSendConfirmationCode = async (email, validateForm) => {
        setSendCodeClicked(true);
        const errors = await validateForm();
        if (errors.email) {
            console.log("email error!");
            return; 
        }

        console.log('Submitted request!');
        setSnackNum(8);
        setSnackBarOpen(true);

        try {
            const response = await fetch(`/api/user/code?email=${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 确保 cookies 跨域发送
            });

            if (response.ok) {
                console.log('Verfication code sent');
                setSnackNum(5);
                setSnackBarOpen(true);
            } else {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to send the confirmation code:', error);
        }
    };


    return (
        <div className='full-screen' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div >
                <SnackBar
                    barOpen={snackBarOpen}
                    setBarOpen={setSnackBarOpen}
                    alertType={snackNum}
                    hideDuration={4000}
                />
            </div>

            <Card elevation={3} className='Card' sx={{ width: "460px", height: "550px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSetUpAccount}
                    >
                        {({ errors, touched, validateForm, values }) => (
                            <Form>
                                <p style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                    fontSize: "50px",
                                    fontWeight: "bold",
                                    fontFamily: "Roboto",
                                    textShadow: "4px 4px #5a8eda",
                                    color: "#738dd7"
                                }}>{title}</p>

                                <CardContent style={{ paddingBottom: '0px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Field
                                            as={TextField}
                                            label='Email Address'
                                            name="email"
                                            fullWidth
                                        />
                                        <div className="login-error-message" style={{ marginBottom: "15px" }}>
                                            {(touched.email || sendCodeClicked) && errors.email}
                                        </div>


                                        <Field
                                            as={TextField}
                                            label='Password'
                                            name="password"
                                            type="password"
                                            fullWidth
                                            aria-hidden="true"
                                        />
                                        <div className="login-error-message" style={{ marginBottom: "15px" }}>
                                            {touched.password && errors.password}
                                        </div>


                                        <Field
                                            as={TextField}
                                            label='confirm the password'
                                            name="passwordConfirmed"
                                            type="password"
                                            fullWidth
                                            aria-hidden="true"
                                        />
                                        <div className="login-error-message" style={{ marginBottom: "15px" }}>
                                            {touched.passwordConfirmed && errors.passwordConfirmed}
                                        </div>

                                        <Field
                                            as={TextField}
                                            label='email confirmation'
                                            name="confirmation"
                                            type="text"
                                            fullWidth
                                        />
                                        <div className="login-error-message" style={{ marginBottom: "10px" }}>
                                            {touched.confirmation && errors.confirmation}
                                        </div>
                                    </Box>
                                </CardContent>

                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => handleSendConfirmationCode(values.email, validateForm)}
                                        style={{ marginLeft: "8px", marginBottom: "5px" }}
                                    >
                                        Send confirmation code
                                    </Button>
                                    {title === "Create Account" ?
                                        <>
                                            <Button size="small" onClick={() => { navigate('/'); }} style={{ marginLeft: "37px", marginBottom: "5px" }}>
                                                back
                                            </Button>
                                            <Button size="small" type="submit" style={{ marginLeft: "5px", marginBottom: "5px", marginRight: "5px" }}>
                                                Create Account
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button size="small" onClick={() => { navigate('/'); }} style={{ marginLeft: "100px", marginBottom: "5px" }}>
                                                back
                                            </Button>
                                            <Button size="small" type="submit" style={{ marginLeft: "5px", marginBottom: "5px", marginRight: "5px" }}>
                                                Reset
                                            </Button>
                                        </>
                                    }
                                </CardActions>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Card>
        </div>
    );
}

