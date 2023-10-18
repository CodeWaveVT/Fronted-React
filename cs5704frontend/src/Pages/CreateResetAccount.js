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
import { Formik, Form, Field } from "formik";

export default function CreateResetAccount({ title }) {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        passwordConfirmed: "",
        confirmation: "",
    };

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

    const handleSetUpAccount = async (values) => {

        const userData = {
            userAccount: values.email, // 用户输入的邮箱作为用户名
            userPassword: values.password, // 用户密码
            checkPassword: values.passwordConfirmed, // 确认密码
            validateCode: values.confirmation, // 用户输入的验证码
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Account set up successfully');
                navigate('/');
            } else {
                const errorData = await response.json();
                throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Failed to set up account:', error);
        }
    };


    const handleSendConfirmationCode = async (email) => {
        if (!email) {
            console.error('Email is required');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/user/code?email=${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 确保 cookies 跨域发送
            });

            if (response.ok) {
                console.log('Confirmation code sent successfully');
            } else {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to send the confirmation code:', error);
        }
    };


    return (
        <Card elevation={3} className='Card' sx={{ width: "450px", height: "550px" }}>
            <div style={{ position: "absolute", bottom: "0", right: "0", left: "0" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSetUpAccount}
                >
                    {({ errors, touched,values }) => (
                        <Form>
                            <p style={{
                                textAlign: "center",
                                marginBottom: "0px",
                                fontSize: "50px",
                                fontWeight: "bold",
                                fontFamily: "Roboto",
                                textShadow: "4px 4px #5a8eda",
                                color: "#738dd7"
                            }}>{title}</p>

                            <CardContent>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="login-error-message">
                                        {touched.email && errors.email}
                                    </div>
                                    <Field
                                        as={TextField}
                                        label='Email Address'
                                        name="email"
                                        fullWidth
                                        style={{ marginBottom: "25px" }}
                                    />

                                    <div className="login-error-message">
                                        {touched.password && errors.password}
                                    </div>
                                    <Field
                                        as={TextField}
                                        label='Password'
                                        name="password"
                                        type="password"
                                        fullWidth
                                        aria-hidden="true"
                                        style={{ marginBottom: "10px" }}
                                    />

                                    <div className="login-error-message">
                                        {touched.passwordConfirmed && errors.passwordConfirmed}
                                    </div>
                                    <Field
                                        as={TextField}
                                        label='confirm the password'
                                        name="passwordConfirmed"
                                        type="password"
                                        fullWidth
                                        aria-hidden="true"
                                        style={{ marginBottom: "10px" }}
                                    />

                                    <div className="login-error-message">
                                        {touched.confirmation && errors.confirmation}
                                    </div>
                                    <Field
                                        as={TextField}
                                        label='email confirmation'
                                        name="confirmation"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </CardContent>

                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => handleSendConfirmationCode(values.email)}
                                    style={{ marginLeft: "8px", marginBottom: "5px" }}
                                >
                                    Send confirmation code
                                </Button>
                                {title === "Create Account" ?
                                    <>
                                        <Button size="small" onClick={() => { navigate('/'); }} style={{ marginLeft: "37px", marginBottom: "5px" }}>
                                            back
                                        </Button>
                                        <Button size="small" type="submit" style={{ marginLeft: "5px", marginBottom: "5px" }}>
                                            Create Account
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button size="small" onClick={() => { navigate('/'); }} style={{ marginLeft: "100px", marginBottom: "5px" }}>
                                            back
                                        </Button>
                                        <Button size="small" type="submit" style={{ marginLeft: "5px", marginBottom: "5px" }}>
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
    );
}

