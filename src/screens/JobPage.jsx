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
        remote: null,
        companyName: null
    })
    const limit = 10; // Adjust the limit as needed
    // console.log('data:', data)
    const fetchData = async () => {
        setIsLoading(true);

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

            setData(prevData => [...prevData, ...newData.jdList]);
            setOffset(prevOffset => prevOffset + limit); // Update offset for next fetch
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    console.log("offset and limit:", offset, "  ", limit)
    useEffect(() => {
        fetchData();

    }, []); // Run once on initial render

    window.onscroll = function () {
        console.log(document.documentElement.scrollTop || document.body.scrollTop);
        handleScroll();
    };

    const handleCompanyNameChange = (event) => {
        const companyNameValue = event.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            companyName: companyNameValue,
        }));
    };

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    console.log("document.documentElement;", document.documentElement.scrollTop, document.documentElement.clientHeight, document.documentElement.scrollHeight - 500, scrollTop + clientHeight >= scrollHeight - 100)
    const handleScroll = () => {
        console.log("in handlescroll")
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            fetchData(); // Fetch more data when scrolled to the bottom (with a threshold of 100 pixels from the bottom)
        }
    };

    useEffect(() => {
        filterData();
    }, [filters]); // Update filtered data whenever filters change

    const filterData = () => {
        setIsFilter(false);
        let filteredResult = data;
        let filter_count = 0;
        Object.keys(filters).forEach((key) => {
            const value = filters[key];

            if (value !== null && (Array.isArray(value) && value.length > 0)) {
                setIsFilter(true);
                filteredResult = filteredResult.filter((item) => {
                    return Array.isArray(value) ? value.includes(item[key]) : value === item[key];
                });
            } else {
                filter_count += 1;
            }
        });
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
            <div className='grid-container'>
                { isFilter ?
                  filteredData?.map((item, index) => (
                    <div className='grid-item' style={{ width: 330 }} key={index}>
                        <JobCard item={item} />
                    </div>
                ))
                :
                data?.map((item, index) => (
                    <div className='grid-item' style={{ width: 330 }} key={index}>
                        <JobCard item={item} />
                    </div>
                ))}
                {isLoading && <CircularProgress />}
                {/* Show loading indicator */}
            </div>
        </div>
    );
};

export default JobsPage;
