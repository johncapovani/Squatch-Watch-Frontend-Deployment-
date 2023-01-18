import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getMySightings, reset } from '../features/sightings/sightingSlice'
//Import CSS
import './UserProfile.css'
import SightingItem from '../components/SightingItem'

function UserProfile() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { sightings, isLoading, isError, message } = useSelector((state) => state.sightings)

  useEffect(() => {

    if (isError) {

      console.log(message)

    }

    if (!user) {

      navigate('/login')

    }

    //If no error get the sightings
    dispatch(getMySightings())

    //Clear sighting when user leaves page
    return () => {

      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {

    return <Spinner />

  }

  return (
    <>

      <div className="accountbackground">
        <div className="account-container">

          <div className="account-info-item">

            <h1>Your Profile Details:</h1>
            <p>

              <b>Name:</b> {user && user.name}
              <br />
              <b>Account Email:</b> {user && user.email}

            </p>


          </div>


          <div className="account-statistics-item">

            <h1>Your Report Activity:</h1>

            <section>
              {sightings.length > 0 ? (
                <ul className='cards'>

                  {sightings.map((sightings) => (
                    <SightingItem key={sightings._id} sighting={sightings} />
                  ))}

                </ul>
              ) : (
                <h3>You have yet to create any posts. To create a post use the <a href="http://localhost:3000/report">Report Sighting form!</a></h3>
              )}

            </section>
          </div>
        </div>
      </div>

    </>
  )
}

export default UserProfile