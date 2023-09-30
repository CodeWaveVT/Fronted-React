import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../CSS/general.css';

export default function Login() {
    return (
        <Card className='Card' sx={{ width: "450px", height: "350px", fontWeight: "bold", color: "#738dd7"}}>
            <div style={{position: "absolute", bottom: "0", right: "0", left: "0"}}>
                <p style={{textAlign: "center", marginBottom: "20px", fontSize: "50px", fontFamily: "Roboto", textShadow: "4px 4px #5a8eda"}}>Welcome</p>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField label={'Email Address'} style={{marginBottom: "25px"}}/>
                        <TextField label={'Verification Code'} style={{marginBottom: "10px"}}/>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{ position: "absolute", right: "10px" }}>Login</Button>
                    <Button size="small" style={{ marginLeft: "auto", marginRight: "70px" }}>Send Verification Code</Button>
                </CardActions>
            </div>
        </Card>
    );
}
