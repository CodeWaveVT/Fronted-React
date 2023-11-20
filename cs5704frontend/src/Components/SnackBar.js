import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ barOpen, setBarOpen, alertType, hideDuration }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setBarOpen(false);
  };

  let alert = "Ebook file successfully uploaded! Please check the progress in the 'IN PROCESS' table";
  let color = 'success';
  switch (alertType) {
    case 0:
      alert = "Ebook file successfully uploaded! Please check the progress in the 'IN PROCESS' table";
      color = 'success';
      break;
    case 1:
      alert = "INVALID USER!";
      color = 'error';
      break;
    case 2:
      alert = "LOGGED IN!";
      color = 'info';
      break;
    case 3:
      alert = "LOGGED OUT!";
      color = 'info';
      break;
    case 4:
      alert = "Invalid Email Adress!";
      color = 'error';
      break;
    case 5:
      alert = "Confirmation Code Sent!";
      color = 'success';
      break;
    case 6:
      alert = "Account set up successfully!";
      color = 'success';
      break;
    case 7:
      alert = "Failed to set up account!";
      color = 'error';
      break;
    case 8:
      alert = "Submitted request!";
      color = 'info';
      break;
    default:
      break;
  }

  if (hideDuration === 0) {
    hideDuration = 4500;
  }

  return (
    <Stack spacing={2} sx={{ width: '100%'}}>
      <Snackbar
        open={barOpen}
        autoHideDuration={hideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Corrected typo here
        style={{ marginBottom: '1.5vh' }}
      >
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%'}}>
          {alert}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
