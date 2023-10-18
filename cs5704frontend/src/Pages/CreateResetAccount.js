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
        verificationCode: "",
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
        confirmation: Yup.string().required("You must input the verification code"),
    });

    const handleSubmit = (values) => {
        // Simulating a successful login
        navigate('/lib');
    };

    return (
        <Card elevation={3} className='Card' sx={{ width: "450px", height: "550px" }}>
            <div style={{ position: "absolute", bottom: "0", right: "0", left: "0" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
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
                                <Button type="submit" size="small" style={{ marginLeft: "8px", marginBottom: "5px" }}>
                                    Send confirmation code
                                </Button>
                                <Button size="small" onClick={() => { navigate('/'); }} style={{ marginLeft: "40px", marginBottom: "5px" }}>
                                    back
                                </Button>
                                <Button size="small" style={{ marginLeft: "5px", marginBottom: "5px" }}>
                                    Create Account
                                </Button>
                            </CardActions>
                        </Form>
                    )}
                </Formik>
            </div>
        </Card>
    );
}

