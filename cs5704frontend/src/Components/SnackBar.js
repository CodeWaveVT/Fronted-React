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

  let alert = "";
  let color = 'success';
  switch (alertType) {
    case 0:
      alert = "Ebook's on the move! Head over to 'IN PROCESS' table via the bottom-right menu for the action.";
      color = 'success';
      break;
    case 1:
      alert = "Oops! User invalid!";
      color = 'error';
      break;
    case 2:
      alert = "Welcome to the AI Audiobook Oasis, where every story sparkles!";
      color = 'info';
      break;
    case 3:
      alert = "LOGGED OUT! Catch you in the next chapter!";
      color = 'info';
      break;
    case 4:
      alert = "Whoops, that email seems imaginary. Double-check?";
      color = 'error';
      break;
    case 5:
      alert = "Code dispatched to your inbox!";
      color = 'success';
      break;
    case 6:
      alert = "Hooray! You're all set and registered!";
      color = 'success';
      break;
    case 7:
      alert = "Uh-oh, account setup error!";
      color = 'error';
      break;
    case 8:
      alert = "Code request in flight!";
      color = 'info';
      break;
    case 9:
      alert = "Book vanished into thin air!";
      color = 'error';
      break;
    case 10:
      alert = "Account already here! Please log in.";
      color = 'error';
      break;
    case 11:
      alert = "Oops, wrong confirmation code. Try again?";
      color = 'error';
      break;
    case 12:
      alert = "Password reset: You're back in action!";
      color = 'success';
      break;
    case 13:
      alert = "User account does not exist! Time to sign up?";
      color = 'error';
      break;
    default:
      break;
  }

  if (hideDuration === 0) {
    hideDuration = 4500;
  }

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'fixed', zIndex: 999 }}>
      <Snackbar
        open={barOpen}
        autoHideDuration={hideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ marginBottom: '5vh' }}
      >
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
