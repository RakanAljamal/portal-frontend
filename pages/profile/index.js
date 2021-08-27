import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box, Paper } from '@material-ui/core';
import { useUser } from '../../shared/useUser'
import { LinearProgress } from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { UserOptions } from "../../components/UserGrid/Table/actions";
import { PermanentDrawerLeft } from "../index";
import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles(theme => ({
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    root: {
        width: "950px"
    },
    table: {
        minWidth: 850,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const Profile = ({ hello }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const classes = useStyles();
    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading || !user) {
        return <LinearProgress />
    }


    return ( !loading && <PermanentDrawerLeft>
        <div className={classes.center}>
            <Box
                display="flex"
                width={500} height={80}
            >
                <Box m="auto">
                    <Paper elevation={3} className={classes.root}>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}
                                    </Avatar>
                                }
                                action={
                                    <UserOptions options={['ChangePassword']}/>
                                }
                                title={user.role}
                                subheader={user.createdAt.substring(0, 10)}
                            />
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell align="right">First Name</TableCell>
                                            <TableCell align="right">Last Name</TableCell>
                                            <TableCell align="right">Role</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="center">Projects</TableCell>
                                            <TableCell width={"10%"} align="right">Created At</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell component="th" scope="row">{user.email}</TableCell>
                                        <TableCell align="right">{user.firstName}</TableCell>
                                        <TableCell align="right">{user.lastName}</TableCell>
                                        <TableCell align="right">{user.role}</TableCell>
                                        <TableCell align="right">{user.department?.name}</TableCell>
                                        <TableCell align="center">
                                            {user.projects?.map((project, i) => (
                                                <Chip key={i} label={project.name} className={classes.chip}/>
                                            ))}
                                        </TableCell>
                                        <TableCell width={"10%"} align="right">{user.createdAt.substring(0, 10)}</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Paper>
                </Box>
            </Box>
        </div>
    </PermanentDrawerLeft> )
}

export async function getServerSideProps() {
    return {
        props: {
            hello: 'world'
        }
    }
}

export default Profile;
