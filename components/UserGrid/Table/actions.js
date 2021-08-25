import React, { useState } from "react";
import { Avatar, Button, IconButton, Input, Menu, MenuItem, TableCell, TableRow } from "@material-ui/core";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export function ShowEditedUserGrid({ handleRowEdit, classes, id, firstName,role, lastName, email, department, projects }) {
    const [ID, setID] = useState(id);
    const [fName, setFName] = useState(firstName)
    const [lName, setLName] = useState(lastName)
    const [Email, setEmail] = useState(email)
    const [Department, setDepartment] = useState(department)
    const [Projects, setProjects] = useState(department)

    function handleChange(ev,func) {
        return func(ev.target.value);
    }

    function handleSave(){
        handleRowEdit(-1);
    }
    return <TableRow
        hover
        key={id}
        tabIndex={-1}
        role="checkbox"
    >
        <TableCell align="center" component="th" scope="row">
            <Input value={ID} onChange={(ev)=>handleChange(ev,setID)} />
        </TableCell>
        <TableCell component="th" scope="row" align="center">
            <Avatar className={classes.avatar}/>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
            <Input value={fName} onChange={(ev)=>handleChange(ev,setFName)} />

            <Input value={lName} onChange={(ev)=>handleChange(ev,setLName)} />
        </TableCell>
        <TableCell align="center" component="th" scope="row">
            <Input value={Email} onChange={(ev)=>handleChange(ev,setEmail)} />
        </TableCell>
        <TableCell align="center" component="th" scope="row">
            {department?.name}
        </TableCell>
        <TableCell width={"20%"} size="small" align="center" component="th" scope="row">
            {projects?.map(({ name }) => `[${name.slice(0, 15)}]`)}
        </TableCell>
        <TableCell width={"5%"} size="small" align="center" component="th" scope="row">
            {role}
        </TableCell><TableCell width={"20%"} align="center" component="th" scope="row">
            <Button
                onClick={handleSave}
                variant="contained">
                Save
            </Button>

        </TableCell>
    </TableRow>

}

export function ShowUserGrid({ classes, handleRowEdit, id, firstName, role, lastName, email, department, projects }) {
    return <TableRow
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
        <TableCell width={"20%"} size="small" align="center" component="th" scope="row">
            {projects?.map(({ name }) => `[${name.slice(0, 15)}]`)}
        </TableCell>
        <TableCell width={"5%"} size="small" align="center" component="th" scope="row">
            {role}
        </TableCell>
        <TableCell width={"20%"} align="center" component="th" scope="row">
            <UserOptions handleRowEdit={handleRowEdit} id={id}/>
        </TableCell>
    </TableRow>
}

export const UserOptions = ({ id, handleRowEdit }) => {
    function handleEdit(popupState) {
        handleRowEdit(id)
        return popupState.close();
    }


    return <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
            <React.Fragment>
                <IconButton
                    {...bindTrigger(popupState)}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                >
                    <MoreVertIcon/>
                </IconButton>.
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => handleEdit(popupState)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleEdit(popupState)}>Delete</MenuItem>
                </Menu>
            </React.Fragment>
        )}
    </PopupState>
}

