import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "../../../shared/useForm";
import axios from "axios";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default function CreateProjectDialog({ open, setOpen }) {
    const { formData, handleInputChange,resetForm } = useForm({
        name: ""
    })
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('');


    const handleClose = () => {
        setOpen(false);
    };


    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setToastOpen(false);
    };
    const handleCreate = () => {
        console.log({ ...formData })
        axios.post('http://localhost:3000/project/', { ...formData } )
            .then(response => {
                return response.data;
            })
            .then(json => {
                setMessage('Project created successfully');
                setToastOpen(true)
                setOpen(false);
                resetForm();
            }).catch(err => {
            setMessage('Internal server error');
            setToastOpen(true);
            console.log(err)
        })
    };

    const { name } = formData;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={toastOpen}
                autoHideDuration={6000}
                onClose={handleToastClose}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleToastClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        name="name"
                        fullWidth
                        value={name}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
