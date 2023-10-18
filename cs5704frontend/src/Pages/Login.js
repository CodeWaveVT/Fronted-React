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

export default function Login({ setAccountTitle }) {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required("You must input an email"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .max(25, "Password must be at most 8 characters long")
            .required("You must input a password"),
    });

    const handleCreateAccount = () => {
        setAccountTitle("Create Account");
        navigate('/setUpAccount');
    }

    const handleResetAccount = () => {
        setAccountTitle("Reset Password");
        navigate('/setUpAccount');
    }

    const handleSubmit = async (values) => {
        const credentials = {
            userAccount: values.email,
            userPassword: values.password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const responseData = await response.json();

            if (response.ok) {
                // 检查 HTTP 状态代码是否指示成功（2xx）,因为后台的状态码不是用的标准版，而是多了两位，如20011，40001，所以需要取前三位
                const codePrefix = Math.floor(responseData.code / 100); // 计算代码的前三位
                console.log(codePrefix)
                if (codePrefix === 200) {
                    // 如果代码以 200 开头，处理成功的情况
                    console.log('Request was successful:', responseData);
                    navigate('/lib');
                }
                else {
                    console.error('Something went wrong:', responseData);
                }
            }
            else {
                throw new Error(`Bad response from server: ${response.status}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <Card elevation={3} className='Card' sx={{ width: "450px", height: "380px" }}>
            <div style={{ position: "absolute", bottom: "0", right: "0", left: "0" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(Formik) => handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <p style={{
                                textAlign: "center",
                                marginBottom: "20px",
                                fontSize: "50px",
                                fontWeight: "bold",
                                fontFamily: "Roboto",
                                textShadow: "4px 4px #5a8eda",
                                color: "#738dd7"
                            }}>Welcome</p>

                            <CardContent  style={{paddingBottom: '0px'}}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Field
                                        as={TextField}
                                        label='Email Address'
                                        name="email"
                                        fullWidth
                                    />
                                    <div className="login-error-message">
                                        {touched.email && errors.email}
                                    </div>

                                    <Field
                                        as={TextField}
                                        label='Password'
                                        name="password"
                                        type="password"
                                        fullWidth
                                    />
                                    <div className="login-error-message" style={{marginBottom: "10px" }}>
                                        {touched.password && errors.password}
                                    </div>
                                </Box>
                            </CardContent>

                            <CardActions>
                                <Button onClick={handleResetAccount} size="small" style={{ marginLeft: "8px", marginBottom: "5px" }}>
                                    Forgot Password?
                                </Button>
                                <Button onClick={handleCreateAccount} size="small" style={{ marginLeft: "80px", marginBottom: "5px" }}>
                                    Create Account
                                </Button>
                                <Button type="submit" size="small" style={{ marginLeft: "5px", marginBottom: "5px" }}>
                                    Login
                                </Button>
                            </CardActions>
                        </Form>
                    )}
                </Formik>
            </div>
        </Card>
    );
}

