import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSightings, reset } from "../features/sightings/sightingSlice";
import { useNavigate } from "react-router-dom";
import Datacard from "../components/Datacard";
import Spinner from '../components/Spinner'
import '../App.css'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { sightings, isError, isLoading, message } = useSelector((state) => state.sightings)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getSightings())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, navigate, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="home">
            <h2 style={{paddingTop: '10px'}}>Report Feed</h2>
            <section className="content">
                {sightings.length > 0 ? (
                    <div className="sightings">
                        {sightings.map((sightings) => (
                            <Datacard key={sightings._id} sighting={sightings} />
                        ))}
                    </div>
                ) : (<h3>No sightings found.</h3>)}
            </section>
        </div>
    )
}

export default Home;