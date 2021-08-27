import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { roles } from "../../components/UserGrid/Table/actions";
import { useSecretApi } from "../../shared/useApi";

const useStyles = makeStyles(theme => ( {
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    textField: {
        marginLeft: 5,
        marginRight: 5,
        width: '100%',
    },
} ));
export default function Login() {
    const router = useRouter()
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoading(true)
    }, [])

    const handleLogin = async () => {
        axios.post('http://localhost:3000/auth/login', {
            email,
            password
        }).then(async (response) => {
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            const user = await useSecretApi('http://localhost:3000/user/me').get();
            await router.push(user.data.role === roles.ADMIN ? '/' : '/profile');
        }).catch(err => {
            alert('Invalid user credentials')
        })
    }
    return (

        loading && <div className={classes.root}>
            <img style={{ width: 300, height: 100, marginBottom: 40 }}
                 src="https://tadviser.com/images/5/51/Pwclogo_black.png" alt="logo"/>
            <TextField
                id="filled-password-input"
                label="Email"
                type="email"
                value={email}
                onChange={(ev)=>setEmail(ev.target.value)}
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                className={classes.textField}

            />
            <br/>
            <br/>
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                variant="outlined"
                onChange={(ev)=>setPassword(ev.target.value)}
                className={classes.textField}
                fullWidth
            />

            <br/>
            <br/>

            <Button onClick={handleLogin}>
                Login
            </Button>
        </div>
    )


}
