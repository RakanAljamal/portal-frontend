import React from 'react';
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import clsx from "clsx";
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/styles';

const useToolbarStyles = makeStyles((theme) => ({
    title: {
        flex: '1 1 100%',
    },
}));

const UserToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div" />
                <Tooltip title="(Not yet implemented)">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
        </Toolbar>
    );
};


export default UserToolbar;
