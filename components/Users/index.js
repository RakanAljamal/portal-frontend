import React, {  useState } from 'react';
import { Button, Card, Container, CssBaseline, OutlinedInput, Stack, Typography } from "@material-ui/core";
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import UserGrid from "../UserGrid";
import UserToolbar from "../UserGrid/user-toolbar";
import CreateUserDialog from "../Auth/CreateUserDialog";
import { makeStyles } from "@material-ui/styles";
import styles from './Users.module.css';
import CreateProjectDialog from "../Auth/CreateProjectDialog";
import CreateDepartmentDialog from "../Auth/CreateDepartmentDialog";
const useStyles = makeStyles((theme) => ({
    root:{
        margin: 15
    }
}));

const Users = ({users}) => {
    const classes = useStyles();
    const [filterName, setFilterName] = useState('');
    const [createUserOpen,setCreateUserOpen] = useState(false);
    const [createProjectDialog,setCreateProjectDialog] = useState(false);
    const [createDepartmentDialog,setCreateDepartmentDialog] = useState(false);

    const handleCreateUserDialog = () => {
        setCreateUserOpen(true);
    };

    const handleCreateProjectDialog = () => {
        setCreateProjectDialog(true);
    };

    const handleCreateDepartmentDialog = () => {
        setCreateDepartmentDialog(true);
    };

    function handleFilterChange(ev) {
        setFilterName(ev.target.value);
    }



    return (
        <div>
            <Container maxWidth={"xl"}>
                <Card>

                    <CreateUserDialog open={createUserOpen} setOpen={setCreateUserOpen} />
                    <CreateProjectDialog open={createProjectDialog} setOpen={setCreateProjectDialog} />
                    <CreateDepartmentDialog open={createDepartmentDialog} setOpen={setCreateDepartmentDialog} />

                    <Stack direction="row" alignItems="center" justifyContent="space-between" padding={2} mb={5}>
                        <Typography variant="h4" gutterBottom>
                            User
                        </Typography>
                        <div className={styles.buttonContainer}>
                                <Button
                                    className={classes.root}
                                    variant="contained"
                                    to="#"
                                    startIcon={<Icon icon={plusFill}/>}
                                    onClick={handleCreateDepartmentDialog}
                                >
                                New Department
                            </Button>
                                <Button
                                    className={classes.root}
                                    variant="contained"
                                    to="#"
                                    startIcon={<Icon icon={plusFill}/>}
                                    onClick={handleCreateProjectDialog}
                                >
                                New Project
                            </Button>
                                <Button
                                    className={classes.root}
                                    variant="contained"
                                    to="#"
                                    startIcon={<Icon icon={plusFill}/>}
                                    onClick={handleCreateUserDialog}
                                >
                                New User
                            </Button>



                        </div>

                    </Stack>

                    <OutlinedInput
                        autoComplete={false}
                        fullWidth
                        value={filterName}
                        name="filterName"
                        type="email"
                        onChange={handleFilterChange}
                        placeholder={'Search users...'}/>
                    <UserToolbar />
                    <UserGrid
                        filterName={filterName}
                        users={users}

                    />
                </Card>
            </Container>
        </div>
    );
};

export default Users;
