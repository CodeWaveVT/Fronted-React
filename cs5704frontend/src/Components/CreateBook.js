import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react'; 
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

export default function CreateBook({open, handleClose}) {

    const [AIModel, setAIModel] = React.useState('');

    const handleModelChange = (event) => {
        setAIModel(event.target.value);
    };

    const [file, setFile] = useState(null);

    function handleUpload() {
        if(!file) {
            console.log("No file selected!");
            return;
        }
    }

    const fd = new FormData();
    fd.append('file', file);

    return (
        <div>
        <Dialog open={open}>
            <DialogTitle>Create Book</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To create a new audiobook, please fill the following blanks
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="book name"
                type="email"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="author"
                type="email"
                fullWidth
                variant="standard"
            />
        <Box sx={{ minWidth: 120 }} style = {{marginTop: "20px"}}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">AI Model</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={AIModel}
                label="AI Model"
                onChange={handleModelChange}
            >
            <MenuItem value={"Jack"}>Jack</MenuItem>
            <MenuItem value={"Mark"}>Mark</MenuItem>
            <MenuItem value={"Marry"}>Marry</MenuItem>
                </Select>
            </FormControl>
        </Box>
            <div style = {{marginTop: "20px"}}>
                <input onChange={(e) => {setFile(e.target.files[0])}} type = 'file'/>
            </div>
            </DialogContent>
            <DialogActions style = {{marginRight: '10px'}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Upload</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}