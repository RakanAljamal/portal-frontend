import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "../../../shared/useForm";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useSecretApi } from "../../../shared/useApi";

export default function ChangePasswordDialog({ open, setOpen,admin,id }) {
    const { formData, handleInputChange,resetForm } = useForm(admin ? {
        password:""
    }:{
        oldPassword: "",
        password:"",
        retypedPassword:""
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

    const handleChangePassword = () => {
        const adminApi = useSecretApi(`http://localhost:3000/user/update/${id}`,{ ...formData })
        const api = useSecretApi(`http://localhost:3000/user/password`, { ...formData })
        if (admin) {
            adminApi.patch().then(json => {
                setMessage('Password changed successfully');
                setToastOpen(true)
                setOpen(false);
                resetForm();
            }).catch(err => {
                setMessage('Internal server error');
                setToastOpen(true);
                console.log(err)
            })
        } else {
            api.post().then(json => {
                setMessage('Password changed successfully');
                setToastOpen(true)
                setOpen(false);
                resetForm();
            }).catch(err => {
                setMessage('Internal server error');
                setToastOpen(true);
                console.log(err)
            })
        }
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
                <DialogTitle id="form-dialog-title">Change password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    {!admin && <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        fullWidth
                        value={name}
                        onChange={handleInputChange}
                    />
                    }                    <TextField
                        margin="dense"
                        id="password"
                        label="New password"
                        name="password"
                        type="password"
                        fullWidth
                        autoComplete={false}
                        value={name}
                        onChange={handleInputChange}
                    />
                    {!admin && <TextField
                        margin="dense"
                        id="retypedPassword"
                        label="Retype new password"
                        name="retypedPassword"
                        type="password"
                        fullWidth
                        value={name}
                        onChange={handleInputChange}
                    />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleChangePassword} color="primary">
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
