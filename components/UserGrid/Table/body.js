import React from 'react';
import { Avatar, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    avatar: {
        margin: "auto"
    }
});

function rowMatch(filterName) {
    return (name) => name?.toLowerCase().includes(filterName.toLowerCase());
}

function handleFilter(user, filterName) {
    let globalFilter = rowMatch(filterName);
    return globalFilter(user.firstName) || globalFilter(user.lastName) || globalFilter(user.email);
}

const TableUserBody = ({ users, rowsPerPage, page, filterName }) => {
    const classes = useStyles();
    users = users.filter(user => handleFilter(user, filterName));
    return (
        <TableBody>
            {
                ( rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                ).map((row) => {
                    const { id, firstName,lastName, email,department,projects } = row;

                    return (
                        <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                        >
                            <TableCell align="center" component="th" scope="row">
                                {id}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <Avatar className={classes.avatar}/>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {firstName} {lastName}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {email}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {department?.name}
                            </TableCell>
                            <TableCell width={"30%"} size="small" align="center" component="th" scope="row">
                                {projects?.map(({name})=>`[${name.slice(0, 15)}]`)}
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
    );
};

export default TableUserBody;
