import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Container, LinearProgress, Paper, TextField } from "@material-ui/core";
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
        setLoading(false)
    }, [])

    const handleLogin = async () => {
        if(!email || !password){
            return;
        }
        setLoading(true)
        axios.post('http://localhost:3000/auth/login', {
            email,
            password
        }).then(async (response) => {
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            const user = await useSecretApi('http://localhost:3000/user/me').get();
            await router.push(user.data.role === roles.ADMIN ? '/' : '/profile');
        }).catch(err => {
            setLoading(false);
            alert('Invalid user credentials')
        })
    }
    const handleKeyDown = (ev) => {
        console.log(ev.key)
        if (ev.key === 'Enter') {
            handleLogin();
        }
    }
    if(loading){
        return  <LinearProgress />
    }
    return (

        !loading && <div className={classes.root}>
            <img style={{ width: 300, height: 100, marginBottom: 40 }}
                 src="https://tadviser.com/images/5/51/Pwclogo_black.png" alt="logo"/>
            <TextField
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
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

            <Button onKeyDown={handleKeyDown} onClick={handleLogin}>
                Login
            </Button>
        </div>
    )


}
