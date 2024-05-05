import React, { useEffect, useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import JobCard from '../components/JobCards';
import RoleFilter from '../components/filters/RoleFilter';
import DropDown from '../components/filters/DropDown';
const JobsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    Roles: [],
    Number_of_Employees: [],
    Experience: null,
    minSalary: null,
    Remote: null,
    companyName: null
  })
  const limit = 5; // Adjust the limit as needed

  const fetchData = async () => {
    setIsLoading(true);
    console.log("offset and limit:", offset, "  ", limit, " ", data?.length)
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: limit,
          offset: offset,
        }),
      });

      const newData = await response.json();

      offset === 0 ? setData(prevData => [...newData.jdList]) : setData(prevData => [...prevData, ...newData.jdList]);
      setOffset(prevOffset => prevOffset + limit); // Update offset for next fetch
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on initial render

  window.onscroll = function () {

    handleScroll();
  };

  const handleCompanyNameChange = (event) => {
    const companyNameValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      companyName: companyNameValue === "" ? null : companyNameValue,
    }));
  };


  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && !isFilter) {
      fetchData(); // Fetch more data when scrolled to the bottom (with a threshold of 100 pixels from the bottom)
    }
  };

  useEffect(() => {
    filterData();
  }, [filters]); // Update filtered data whenever filters change

  const filterData = () => {
    setIsFilter(false);

    let filteredResult = data;
    let filtersApplied = false; // Flag to track if any filters are applied

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if ((value !== null && !Array.isArray(value)) || (Array.isArray(value) && value.length > 0)) {
        filtersApplied = true; // Set the flag since a filter is applied

        if (key === "Roles") {
          filteredResult = filteredResult.filter((item) => {
            return value.includes(item.jobRole);
          });
        } else if (key === "Experience") {
          filteredResult = filteredResult.filter((item) => {
            return value <= item.maxExp && value >= item.minExp;
          });
        } else if (key === "minSalary") {
          filteredResult = filteredResult.filter((item) => {
            return value <= item.minJdSalary;
          });
        } else if (key === "Remote") {
          filteredResult = filteredResult.filter((item) => {
            if (value !== "Remote") {
              return item?.location !== "remote";
            } else {
              return item?.location === "remote";
            }
          });
        } else if (key === "companyName") {
          filteredResult = filteredResult.filter((item) => {
            return item.companyName.toLowerCase().startsWith(value.toLowerCase());
          });
        }
      }
    })
    if (filtersApplied) {
      setIsFilter(true); // Set isFilter to true if any filter is applied

    }
    setFilteredData(filteredResult);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <RoleFilter data={data} setData={setData} placeholder="Roles" filters={filters} setFilters={setFilters} filter={"Roles"} />
        <RoleFilter data={data} setData={setData} placeholder={"Number of Employees"} filters={filters} setFilters={setFilters} filter={"Number_of_Employees"} />
        <DropDown width={140} data={data} setData={setData} placeholder={"Experience"} filters={filters} setFilters={setFilters} filter={"Experience"} />
        <DropDown width={130} data={data} setData={setData} placeholder={"Remote"} filters={filters} setFilters={setFilters} filter={"Remote"} />
        <DropDown width={250} data={data} setData={setData} placeholder={"Minimum Base Pay Salary"} filters={filters} setFilters={setFilters} filter={"minSalary"} />
        <TextField id="outlined-basic" label="Search Company Name" variant="outlined" value={filters.companyName || ''} onChange={handleCompanyNameChange} />
      </div>
      <div className='grid-container' >
        {isFilter ? (
          filteredData.length === 0 ? (
            <div style={{display:"flex", flexDirection:"column", padding:20, width:"100vw", alignItems:"center", justifyContent:"center"}}>
             <img style={{ padding:30 }} src={"./nothing-found.png"} height={100} width={100} alt="nothing-found" />
             <div>No Jobs available for this category at the moment</div>
            </div>
          ) : (
            filteredData?.map((item, index) => (
              <div className='grid-item' style={{ width: 330 }} key={index}>
                <JobCard item={item} />
              </div>
            ))
          )
        ) : (
          data?.map((item, index) => (
            <div className='grid-item' style={{ width: 330 }} key={index}>
              <JobCard item={item} />
            </div>
          ))
        )}

        {isLoading &&
          <CircularProgress />
        }
        {/* Show loading indicator */}
      </div>
    </div>
  );
};

export default JobsPage;
