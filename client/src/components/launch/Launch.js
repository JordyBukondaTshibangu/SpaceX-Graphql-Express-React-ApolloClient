import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LAUNCH_QUERY } from '../GraphQL/Queries';
import LoadingSpinner from './Loader';


const Launch = props => {

    let flight_number_string = props.match.params.flight_number;
    let flight_number = parseInt(flight_number_string);

    const { error, loading, data } = useQuery(LAUNCH_QUERY, { variables : { flight_number}});
    const [ launch, setLaunch ] = useState({
        mission_name : '',
        launch_year: '',
        launch_success: '',
        launch_date_local: '',
      });

    useEffect(() => {
        if(data) setLaunch(data.launch)
    }, [data])

    console.log(data)
    return (
        <div className="my-5">
        {
            error ? 
                <h3>An Error Occured</h3> :
                <>     
                    {
                        loading ? <LoadingSpinner/> : 
                        <>
                            <h1 className="display-4 my-3">
                                <span className="text-dark">Mission : </span> { launch.mission_name }
                            </h1>
                            <h4 className="mb-3">Launch details</h4>
                            <ul className="list-group">
                                <li className="list-group-item">Flight number : { launch.flight_number }</li>
                                <li className="list-group-item">launch year: { launch.launch_year }</li>
                                <li className="list-group-item">Launch successfull  : <span className={classNames({
                                    'text-success' : launch.launch_success,
                                    'text-danger' : !launch.launch_success
                                })}>{launch.launch_success ? 'Yes' : 'No'}</span></li>
                                <li className="list-group-item">Date local : <Moment format="YYYY-MM-DD HH:mm">{ launch.flight_number }</Moment></li>
                            </ul>
                            <h4 className="my-5"></h4>
                            {/* <ul className="list-group my-5">
                                <li className="list-group-item">Rocket id : { launch.rocket.rocket_id }</li>
                                <li className="list-group-item">Rocket Name: { launch.rocket.rocket_name }</li>
                                <li className="list-group-item">Rocket type : { launch.rocket.rocket_type }</li>
                            </ul> */}
                            <Link to="/" className="btn btn-secondary">Back</Link>
                        </>
                    }
                </>
        }
        
        </div>
    )
}

export default Launch
