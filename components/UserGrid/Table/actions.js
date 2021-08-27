import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, IconButton, Input, Menu, MenuItem, TableCell, TableRow, Typography } from "@material-ui/core";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DropdownMenu } from "../../../shared/Components/menu";
import { MultipleSelect } from "../../../shared/Components/multiple-menu";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { UserContext } from "../../UserProvider";
import { useSecretApi } from "../../../shared/useApi";

export const roles = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    EMPLOYEE: "Employee"
}

const rolesData = [{
    name: roles.ADMIN,
    id: "Admin"
}, {
    name: roles.MANAGER,
    id: "Manager"
}, {
    name: roles.EMPLOYEE,
    id: "Employee"
}]

const departmentsData = [{
    value: "1",
    text: "IT"
}, {
    value: "2",
    text: "This is aproject"
}]

const projectsData = [{
    id: "1",
    name: "WSF"
}, {
    id: "2",
    name: "VCC"
}]

const fetchDepartments = async () => {
    const results = await useSecretApi('http://localhost:3000/department/').get()

    return results.data;
};
const fetchProjects = async () => {
    const results = await useSecretApi('http://localhost:3000/project/').get()
    return results.data;
};

export function ShowEditedUserGrid({ handleRowEdit, classes, id, firstName, role, lastName, email, department, projects }) {
    const [fName, setFName] = useState(firstName)
    const [lName, setLName] = useState(lastName)
    const [Email, setEmail] = useState(email)
    const [Department, setDepartment] = useState(department?.id)
    const [Projects, setProjects] = useState(projects ? projects?.map(({ id })=>`${id}`) : [])
    const [Role, setRole] = useState(role)
    const [availableDepartments, setAvailableDepartments] = useState(null)
    const [availableProjects, setAvailableProjects] = useState(null)
    const { toggleRefresh } = useContext(UserContext);
    function handleChange(ev, func) {
        return func(ev.target.value);
    }

    useEffect(() => {
        fetchDepartments().then(data => {
            setAvailableDepartments(data);
        }).catch(err => {
            console.log(err)
        });
        fetchProjects().then(data => {
            setAvailableProjects(data);
        }).catch(err => {
            console.log(err)
        });
    }, [])

    function handleSave() {
        useSecretApi(`http://localhost:3000/user/update/${id}`, {
            firstName: fName,
            lastName: lName,
            email: Email,
            departmentId: Department,
            projectsId: Projects.length > 0 ? Projects : null,
            role: Role
        }).patch().then(data => {
            toggleRefresh();
            handleRowEdit(-1);
        }).catch(err => {
            console.error(err)
        })
    }

    function handleClose() {
        handleRowEdit(-1);
    }

    function handleDepartmentChange(value) {
        setDepartment(value);
    }

    function handleRoleChange(value) {
        setRole(value);
    }

    function handleProjectsChange(values) {
        setProjects(values);
    }

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
            <Input value={fName} onChange={(ev) => handleChange(ev, setFName)}/>

            <Input value={lName} onChange={(ev) => handleChange(ev, setLName)}/>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
            <Input value={Email} onChange={(ev) => handleChange(ev, setEmail)}/>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
            <DropdownMenu placeholder={'Select department'} handleItemChange={handleDepartmentChange}
                          values={availableDepartments} defaultValue={Department}/>
        </TableCell>
        <TableCell width={"20%"} size="small" align="center" component="th" scope="row">
            <MultipleSelect handleItemsChange={handleProjectsChange} projectName={'Select a project'} values={availableProjects} projects={projects}/>
        </TableCell>
        <TableCell width={"5%"} size="small" align="center" component="th" scope="row">
            <DropdownMenu placeholder={'Select role'} handleItemChange={handleRoleChange} values={rolesData}
                          defaultValue={Role}/>
        </TableCell><TableCell width={"20%"} align="center" component="th" scope="row">
        <Button
            onClick={handleSave}
            variant="contained">
            Save
        </Button>
        <Button
            onClick={handleClose}
            variant={"h6"}>
            Close
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
        <TableCell size="small" align="center" component="th" scope="row">
            <div className={classes.chips}>
                {projects.map((project, i) => (
                    <Chip key={i} label={project.name} className={classes.chip}/>
                ))}

            </div>
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
    const {toggleRefresh} = useContext(UserContext);
    function handleEdit(popupState) {
        handleRowEdit(id)
        return popupState.close();
    }

    function handleDelete(popupState) {
        useSecretApi(`http://localhost:3000/user/delete/${id}`).delete().then(data=>{
            console.log(data)
            toggleRefresh()
        }).catch(err=>{
            console.log(err)
        })
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
                    <MenuItem onClick={() => handleDelete(popupState)}>Delete</MenuItem>
                </Menu>
            </React.Fragment>
        )}
    </PopupState>
}

