import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import CreateBook from './CreateBook';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import SnackBar from './SnackBar';

export default function NavigationBar({setLoggedOut, setLoggedOutSnackBarOpen}) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const response = await fetch('http://localhost:8080/api/user/logout', {
        method: 'POST',
        body: '',
        credentials: 'include',
      });

      const responseData = await response.json();

      if (response.ok) {
        // 检查 HTTP 状态代码是否指示成功（2xx）,因为后台的状态码不是用的标准版，而是多了两位，如20011，40001，所以需要取前三位
        const codePrefix = Math.floor(responseData.code / 100); // 计算代码的前三位
        console.log(codePrefix)
        if (codePrefix === 200) {
          // 如果代码以 200 开头，处理成功的情况
          console.log('Logout was successful:', responseData);
          navigate('/');
          setLoggedOut(true);
          setLoggedOutSnackBarOpen(true);
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
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div style={{ position: 'fixed', right: "1vw" }}>
              <Button color="inherit" style={{ marginRight: "1vw" }} onClick={handleClickOpen} >Create</Button>
              <Button color="inherit" onClick={handleLogout}>Log Out</Button>
              <CreateBook
                handleClose={handleClose}
                open={dialogOpen}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}