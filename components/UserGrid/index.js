import React, { createContext, useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import TableUserBody from "./Table/body";
import TableUserFooter from "./Table/footer";
import { UserTablePagination } from "./Table/footer-pagination";
import CreateUserDialog from "../Auth/CreateUserDialog";


const useStyles = makeStyles({
    table: {
        minWidth: 800,
    }
});



const UserGrid = ({ filterName, users }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        setLoading(true)
    }, [])
    return (
        loading && <div style={{minWidth:800}}>
                <CreateUserDialog open={open}/>
                <Table className={classes.table} component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Projects</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center"/>
                        </TableRow>
                    </TableHead>
                    <TableUserBody filterName={filterName} page={page} rowsPerPage={rowsPerPage} users={users}/>
                </Table>
                <TableUserFooter TablePaginationActions={UserTablePagination}
                                 users={users} page={page}
                                 handleChangeRowsPerPage={handleChangeRowsPerPage}
                                 handleChangePage={handleChangePage}
                                 rowsPerPage={rowsPerPage}/>
        </div>
    );
};

export default UserGrid;
