import React, { useContext, useState } from 'react';
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
import { useSecretApi } from "../../../shared/useApi";
import { UserContext } from "../../UserProvider";

export default function CreateUserDialog({ open, setOpen }) {
    const {toggleRefresh} = useContext(UserContext);
    const { formData, handleInputChange,resetForm } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypedPassword: ""
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
        useSecretApi('http://localhost:3000/user/register', { ...formData })
            .post()
            .then(response => {
                return response.data;
            })
            .then(json => {
                setMessage('User created successfully');
                setToastOpen(true)
                setOpen(false);
                toggleRefresh();
                resetForm();
            }).catch(err => {
            setMessage('Internal server error');
            setToastOpen(true);
            console.log(err)
        })
    };

    const { firstName, lastName, email, password, retypedPassword } = formData;

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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First name"
                        name="firstName"
                        fullWidth
                        value={firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastName"
                        label="Last name"
                        type="email"
                        fullWidth
                        value={lastName}
                        onChange={handleInputChange}/>
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        value={email}
                        onChange={handleInputChange}/>
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        value={password}
                        onChange={handleInputChange}/>
                    <TextField
                        margin="dense"
                        label="Retype password"
                        type="password"
                        name="retypedPassword"
                        fullWidth
                        value={retypedPassword}
                        onChange={handleInputChange}/>

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
