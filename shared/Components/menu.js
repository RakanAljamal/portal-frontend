import { makeStyles } from "@material-ui/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from "react";

const useStyles = makeStyles(() => ( {
    formControl: {
        margin: 1,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: 1,
    },
} ));

export const DropdownMenu = ({ values, placeholder,defaultValue,handleItemChange }) => {
    const classes = useStyles();
    const [defValue,setDefValue] = useState(defaultValue);
    const handleChange = (event) => {
        handleItemChange(event.target.value);
        setDefValue(event.target.value);
    };

    return <FormControl className={classes.formControl}>
        <Select
            value={defValue}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            <MenuItem value="" disabled>
                {placeholder}
            </MenuItem>
            {
                values?.map(value => (
                        <MenuItem value={value.id}>{value.name}</MenuItem>
                    )
                )
            }

        </Select>
    </FormControl>
}

