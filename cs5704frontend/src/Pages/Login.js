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

export default function Login({ setAccountTitle, setLoggedOut, setLoggedIn }) {
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackNum, setSnackNum] = useState(1);

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
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include', // Include cookies with the request
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                const codePrefix = Math.floor(responseData.code / 100);
                console.log(codePrefix)
                if (codePrefix === 200) {
                    console.log('Request was successful:', responseData);
                    setLoggedIn(true)
                    setLoggedOut(false)
                    navigate('/lib');
                }
                else {
                    console.error('Something went wrong:', responseData);
                    setSnackNum(1);
                    setSnackBarOpen(true);
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
        <div className='full-screen' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SnackBar
                barOpen={snackBarOpen}
                setBarOpen={setSnackBarOpen}
                alertType={snackNum}
                hideDuration={2500}
            />
            <Card elevation={3} className='Card' sx={{ width: "460px", height: "380px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, submitCount }) => (
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

                                <CardContent style={{ paddingBottom: '0px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Field
                                            as={TextField}
                                            label='Email Address'
                                            name="email"
                                            fullWidth
                                        />
                                        <div className="login-error-message">
                                            {submitCount > 0 && touched.email && errors.email}
                                        </div>

                                        <Field
                                            as={TextField}
                                            label='Password'
                                            name="password"
                                            type="password"
                                            fullWidth
                                        />
                                        <div className="login-error-message" style={{ marginBottom: "10px" }}>
                                            {submitCount > 0 && touched.password && errors.password}
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
                                    <Button type="submit" size="small" style={{ marginLeft: "5px", marginBottom: "5px", marginRight: "5px" }}>
                                        Login
                                    </Button>
                                </CardActions>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Card>
        </div>
    );
}

