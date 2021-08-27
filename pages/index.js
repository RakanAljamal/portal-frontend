import styles from '../styles/Home.module.css'
import Users from "../components/Users";
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from "@material-ui/styles";
import { CssBaseline, LinearProgress } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { ExitToApp } from "@material-ui/icons";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { UserProvider } from "../components/UserProvider";
import { useUser } from "../shared/useUser";
import { useRouter } from "next/router";
import { useSecretApi } from "../shared/useApi";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,


    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));
export  function PermanentDrawerLeft({children}) {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <h4 style={{marginLeft:drawerWidth}}>Users Portal</h4>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {['Dashboard', 'Logout'].map((text, index) => (
                        <ListItem onClick={index % 2 !== 0 ? handleLogout : null} button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <DashboardIcon/> : <ExitToApp />}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                {children}
                </div>
            </main>
        </div>
    );
}

const theme = createTheme();


export default function Home() {
    const router = useRouter();
    const[loading,setIsLoading] = useState(true);
    const[users,setUsers] = useState(null);
    const { user } = useUser();
    const [refreshUsers,setRefreshUsers] = useState(false);

    function toggleRefresh () {
        setRefreshUsers(true);
    }
    useEffect(()=>{
            useSecretApi('http://localhost:3000/user/').get().then(response => {
                setUsers(response.data)
                setIsLoading(false);
                setRefreshUsers(false)
            }).catch(err=>{
                router.push('/notfound')
               throw new Error('Unauthorized user');
            })
    },[refreshUsers])


    if(loading){
        return  <LinearProgress />
    }

    return (
        <ThemeProvider theme={theme}>
        <div className={styles.container}>
            <PermanentDrawerLeft >
                <UserProvider value={{ refreshUsers, toggleRefresh }}>
                    <Users users={users}/>
                </UserProvider>
            </PermanentDrawerLeft>
        </div>
        </ThemeProvider>

    )
}

