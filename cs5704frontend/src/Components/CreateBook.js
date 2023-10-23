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

export default function CreateBook({ open, handleClose }) {
    const [AIModel, setAIModel] = React.useState('Jack');
    const [file, setFile] = useState(null);

    const initialValues = {
        bookName: "",
        authorName: "",
        AIModel: "Jack",
    };

    const validationSchema = Yup.object().shape({
        bookName: Yup.string().required("You must input the name of the book"),
        authorName: Yup.string().required("You must input the name of the author"),
        AIModel: Yup.string().required("You must input the valid ai model"),
    });

    const onSubmit = (values, actions) => {
        console.log(values);

        if (file) {
            switch (file.type) {
                case 'text/plain':
                case 'application/epub+zip':
                case 'application/pdf':
                    handleClose();
                    break;
                default:
                    alert('Please upload a valid file type (.txt, .epub, or .pdf)');
                    break;
            }
        } 
        else {
            alert("Please upload a file");
        }
    };


    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Create Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new audiobook, please fill the following blanks
                    </DialogContentText>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field as={TextField}
                                    autoFocus
                                    margin="dense"
                                    id="bookName"
                                    name="bookName"
                                    label="book name"
                                    fullWidth
                                    variant="standard"
                                />
                                <div className="login-error-message" style={{ marginBottom: "0px" }}>
                                    {errors.bookName && touched.bookName && errors.bookName}
                                </div>
                                <Field as={TextField}
                                    autoFocus
                                    margin="dense"
                                    id="authorName"
                                    name="authorName"
                                    label="author"
                                    fullWidth
                                    variant="standard"
                                //error={errors.authorName && touched.authorName}
                                //helperText={errors.authorName && touched.authorName && errors.authorName}
                                />
                                <div className="login-error-message" style={{ marginBottom: "0px" }}>
                                    {errors.authorName && touched.authorName && errors.authorName}
                                </div>
                                <Box sx={{ minWidth: 120 }} style={{ marginTop: "20px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">AI Model</InputLabel>
                                        <Field as={Select}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="AIModel"
                                            value={AIModel}
                                            label="AI Model"
                                            onChange={(e) => {
                                                setAIModel(e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"Jack"}>Jack</MenuItem>
                                            <MenuItem value={"Mark"}>Mark</MenuItem>
                                            <MenuItem value={"Marry"}>Marry</MenuItem>
                                        </Field>
                                    </FormControl>
                                </Box>
                                <div style={{ marginTop: "20px" }}>
                                    <input onChange={(e) => { setFile(e.target.files[0]) }} type='file' />
                                </div>

                                <DialogActions style={{ marginRight: '10px' }}>
                                    <Button type="button" onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Upload</Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}
