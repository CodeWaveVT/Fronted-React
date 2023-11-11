import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ barOpen, setBarOpen }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setBarOpen(false);
  };

  return (
    <Stack spacing={5} sx={{ width: '100%'}}>
      <Snackbar 
        open={barOpen} 
        autoHideDuration={7000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'botton', horizontal: 'center' }} // Centering the Snackbar
        style = {{marginBottom: '2vh'}}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Ebook file successfully uploaded! Please check the progress in the "In Process" table
        </Alert>
      </Snackbar>
    </Stack>
  );
}
