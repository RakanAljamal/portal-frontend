import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "../../../shared/useForm";
import { apiMethods, useApi } from "../../../shared/useApi";
import axios from "axios";

export default function CreateUserDialog({ open, setOpen }) {
    const { formData, handleInputChange } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypedPassword: ""
    })
    const { firstName, lastName, email, password, retypedPassword } = formData;

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        console.log({formData})
        axios.post('http://localhost:3000/user/register', { ...formData })
            .then(response => {
                return response.data;
            })
            .then(json => {
                console.log(json);
            }).catch(err => {
            console.log(err)
        })
    };

    return (
        <div>
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
                        autoFocus
                        margin="dense"
                        id="name"
                        name="lastName"
                        label="Last name"
                        type="email"
                        fullWidth
                        value={lastName}
                        onChange={handleInputChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        value={email}
                        onChange={handleInputChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        value={password}
                        onChange={handleInputChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
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
