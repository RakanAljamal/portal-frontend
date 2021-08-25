import React, { useEffect, useState } from 'react';
import { Button, Card, Container, OutlinedInput, Stack, Typography } from "@material-ui/core";
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import UserGrid from "../UserGrid";
import UserToolbar from "../UserGrid/user-toolbar";
import CreateUserDialog from "../Auth/CreateUserDialog";


const Users = ({users}) => {
    const [filterName, setFilterName] = useState('');
    const [open,setOpen] = useState(false);

    const handleCreateUserDialog = () => {
        setOpen(true);
    };
    function handleFilterChange(ev) {
        setFilterName(ev.target.value);
    }



    return (
        <div style={{ marginTop: 100 }}>
            <Container>
                <Card>

                    <CreateUserDialog open={open} setOpen={setOpen} />

                    <Stack direction="row" alignItems="center" justifyContent="space-between" padding={2} mb={5}>
                        <Typography variant="h4" gutterBottom>
                            User
                        </Typography>
                        <Button
                            variant="contained"
                            to="#"
                            startIcon={<Icon icon={plusFill}/>}
                            onClick={handleCreateUserDialog}
                        >
                            New User
                        </Button>
                    </Stack>

                    <OutlinedInput
                        fullWidth
                        value={filterName}
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
