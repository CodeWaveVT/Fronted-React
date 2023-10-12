import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import CreateBook from './CreateBook';

export default function NavigationBar() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <div style={{position: 'fixed', right: "1vw"}}>
            <Button color="inherit" style={{marginRight: "1vw"}} onClick={handleClickOpen} >Create</Button>
            <Button color="inherit">Log Out</Button>
            <CreateBook 
              handleClose = {handleClose}
              open = {dialogOpen}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}