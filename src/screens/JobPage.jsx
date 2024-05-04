import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import JobCard from '../components/JobCards';

const JobsPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
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


    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    console.log("document.documentElement;", document.documentElement.scrollTop, document.documentElement.clientHeight, document.documentElement.scrollHeight - 500 , scrollTop + clientHeight >= scrollHeight - 100)
    const handleScroll = () => {
        console.log("in handlescroll")
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            fetchData(); // Fetch more data when scrolled to the bottom (with a threshold of 100 pixels from the bottom)
        }
    };


    return (
        <div className='grid-container'>
            {data.map((item, index) => (
                <div className='grid-item' style={{width:330}}  key={index}>
                    <JobCard item={item} />
                </div>
            ))}
            {isLoading && <CircularProgress />}
            {/* Show loading indicator */}
        </div>
    );
};

export default JobsPage;
