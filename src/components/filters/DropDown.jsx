import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const updateFilter = (params, props) => {
    console.log("update:", params, props);
  props.setFilters({ ...props.filters, [props.filter]: params});
 
};

const DropDown = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  console.log("flters:", props?.filters)
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        getData();
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const getData = () => {
    if (props.placeholder === "Experience") {
      setOptions([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else if (props.placeholder === "Remote") {
      setOptions(["Remote", "In office"]);
    } else if (props.placeholder === "Minimum Base Pay Salary") {
      setOptions([0, 10, 20, 30, 40, 50, 60, 70]);
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: props.width ?? 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => (props.placeholder === "Minimum Base Pay Salary" ? option + "L" : option)}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      onChange={(event, value) => {
        updateFilter(value, props);
      }}
    />
  );
};

export default React.memo(DropDown);
