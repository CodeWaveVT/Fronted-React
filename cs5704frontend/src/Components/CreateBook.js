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
import SnackBar from './SnackBar';
import { useNavigate } from "react-router-dom";

export default function CreateBook({ open, handleClose }) {
    const [AIModel, setAIModel] = React.useState('OpenAI');
    const [file, setFile] = useState(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const initialValues = {
        bookName: "",
        authorName: "",
        AIModel: "OpenAI",
    };

    const validationSchema = Yup.object().shape({
        bookName: Yup.string().required("You must input the name of the book"),
        authorName: Yup.string().required("You must input the name of the author"),
        AIModel: Yup.string().required("You must input the valid ai model"),
    });

    const handleDiaClose = () => {
        setFile(null);
        handleClose();
    }

    const submitToBackend = async (bookType, bookName, bookAuthor) => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('bookType', bookType);
        formData.append('bookName', bookName);
        formData.append('bookAuthor', bookAuthor);
        try {
            const response = await fetch('http://localhost:8080/api/task/gen/async', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok) {
                // 检查 HTTP 状态代码是否指示成功（2xx）,因为后台的状态码不是用的标准版，而是多了两位，如20011，40001，所以需要取前三位
                const codePrefix = Math.floor(responseData.code / 100); // 计算代码的前三位
                console.log(codePrefix)
                if (codePrefix === 200) {
                    // 如果代码以 200 开头，处理成功的情况
                    console.log('Request was successful:', responseData);
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

    const onSubmit = (values, actions) => {
        console.log(values);
        if (file) {
            let bookType = "";
            switch (file.type) {
                case 'text/plain':
                    bookType = 'txt';
                    break;
                case 'application/epub+zip':
                    bookType = 'epub';
                    break;
                case 'application/pdf':
                    bookType = 'pdf';
                    break;
                default:
                    alert('Please upload a valid file type (.txt, .epub, or .pdf)');
                    break;
            }
            if (bookType !== ""){
                submitToBackend(bookType, values.bookName, values.authorName);
                handleClose();
                setFile(null);
                setSnackBarOpen(true);
            }
        } 
        else {
            alert("Please upload a file");
        }
        setFile(null);
    };



    return (
        <div>
            <SnackBar 
                barOpen = {snackBarOpen}
                setBarOpen = {setSnackBarOpen}
                alertType = {0}
                hideDuration={7000}
            />
            <Dialog open={open}>
                <DialogTitle >Create Book</DialogTitle>
                <DialogContent style = {{paddingBottom: "0px"}}>
                    <DialogContentText>
                        To create a new audiobook, please fill the following blanks
                    </DialogContentText>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched, submitCount }) => (
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
                                    {errors.bookName && touched.bookName && submitCount > 0 && errors.bookName}
                                </div>
                                <Field as={TextField}
                                    autoFocus
                                    marginTop="0px"
                                    id="authorName"
                                    name="authorName"
                                    label="author"
                                    fullWidth
                                    variant="standard"
                                />
                                <div className="login-error-message" style={{ marginBottom: "0px" }}>
                                    {errors.authorName && touched.authorName && submitCount > 0 && errors.authorName}
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
                                            <MenuItem value={"Xunfei"}>Xunfei</MenuItem>
                                            <MenuItem value={"OpenAI"}>OpenAI</MenuItem>
                                        </Field>
                                    </FormControl>
                                </Box>
                                <div style={{ marginTop: "20px" }}>
                                    <input onChange={(e) => { setFile(e.target.files[0]) }} type='file' />
                                </div>
                                <DialogActions style={{ marginRight: '0px' }}>
                                    <Button type="button" onClick={handleDiaClose}>Cancel</Button>
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
