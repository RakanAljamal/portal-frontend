import React, { useState } from 'react';
import { TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ShowEditedUserGrid, ShowUserGrid } from "./actions";

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
    return globalFilter(`${user.firstName} ${user.lastName}`) || globalFilter(user.lastName) || globalFilter(user.email);
}


const TableUserBody = ({ users, rowsPerPage, page, filterName }) => {
    const [isEditUser, setIsEditUser] = useState(-1);
    const classes = useStyles();

    const handleRowEdit = (id) => {
        setIsEditUser(id);
    }

    users = users.filter(user => handleFilter(user, filterName));
    return (
        <TableBody>
            {
                ( rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                ).map((row) => {
                    return ( row.id !== isEditUser ?
                        <ShowUserGrid handleRowEdit={handleRowEdit} classes={classes} {...row} />
                        : <ShowEditedUserGrid handleRowEdit={handleRowEdit} classes={classes} {...row} /> )
                })
            }
        </TableBody>
    );
};

export default TableUserBody;
