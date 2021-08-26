import React, { useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    formControl: {
        margin: 10,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: 15,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



export const MultipleSelect = ({projectName,values,projects,handleItemsChange}) =>{
    const classes = useStyles();
    const [selectedValues, setSelectedValues] = React.useState(projects?.map(({id})=>id));

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
        handleItemsChange(event.target.value)
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSelectedValues(value);
    };


    return (
        <FormControl className={classes.formControl}>
            <InputLabel  id="demo-mutiple-chip-label">{projectName}</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={selectedValues || []}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                <div className={classes.chips}>
                        {selected.map((value,i) => (
                             <Chip key={i} label={values?.find(val=>val.id === value)?.name} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {values?.map((value) => (
                    <MenuItem key={value.name} value={value.id}>
                        {value.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

