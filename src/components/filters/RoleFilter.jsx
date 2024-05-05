import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function RoleFilter(props) {

    const [options, setOptions] = React.useState([]);

    const getData = () => {
        if (props.placeholder === "Roles") {
            console.log("in roles:", props?.data.map((item) => item.jobRole) )
            const uniqueJobRoles = [...new Set(props?.data.map((item) => item.jobRole))];
            setOptions(uniqueJobRoles);
        } else if (props.placeholder === "Number of Employees") {
            setOptions(["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"]);
        }
    };

    const updateFilter = (params) => {
        console.log("update:", params, props);
        props.setFilters({ ...props.filters, [props.filter]: params });
    }

    React.useEffect(() => {
        getData();
    }, [props?.data]);

    return (
        <Stack spacing={3} sx={{ width: 250 }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option}
                defaultValue={options}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.placeholder}
                        placeholder={props.placeholder}
                    />
                )}
                onChange={(event, value) => {
                    updateFilter(value);
                }}
            />
            
        </Stack>
    );
}


