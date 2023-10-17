import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import '../CSS/general.css';

export default function Login() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/lib');
      };

    return (
        <Card elevation={3} className='Card' sx={{ width: "450px", height: "350px"}}>
            <div style={{position: "absolute", bottom: "0", right: "0", left: "0"}}>
                <p style={{textAlign: "center", marginBottom: "20px", fontSize: "50px", fontWeight: "bold", fontFamily: "Roboto", textShadow: "4px 4px #5a8eda", color: "#738dd7"}}>Welcome</p>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField label={'Email Address'} style={{marginBottom: "25px"}}/>
                        <TextField label={'Password'} style={{marginBottom: "10px"}}/>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{ position: "absolute", right: "10px" }} onClick={handleLoginClick}>Login</Button>
                    <Button size="small" style={{ marginLeft: "auto", marginRight: "70px" }}>Create Account</Button>
                    <Button size="small" style={{ position: "absolute", left: "10px" }}>Forgot Password?</Button>
                </CardActions>
            </div>
        </Card>
    );
}
