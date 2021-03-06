import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LAUNCHES_QUERIES } from '../../GraphQL/Queries';
import LaunchItem from './LaunchItem';
import MissionKey from '../feedback/MissionKey';
import LoadingSpinner from '../feedback/Loader';


const Launches = () => {

    const { loading, error, data } = useQuery(LAUNCHES_QUERIES);
    const [launches, setLaunches ] = useState([]);

    useEffect(() => {
        console.log(data)
       if(data)  setLaunches(data.launches);
       
    },[data, launches])

    return (
        <>
            {
                !error 
                ?
                <div>
                    <h1 className="display-4 my-5"> SpaceX Launches</h1>
                    <h3>Add new </h3>
                    <Link to="/new-launch">new launch</Link>
                    <MissionKey />
                    {
                        loading && <LoadingSpinner />
                    }
                    {
                        launches.map((launch, index) => <LaunchItem key={index} launch={launch}/>)
                    }
                </div>
                :
                <div>
                    <h1 className="display-4 my-3">An Error occured </h1>
                </div>
            }
        </>
    )

}

export default Launches
