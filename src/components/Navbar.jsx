import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

//Access the state to determine if user is logged in or not
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'



function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  //Logout a user

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div>
        <Link className='logo' to='/'><img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/bigfoot-or-sasquatch-sighting-29688-300x300.png" alt="" /></Link>
      </div>
      <ul className='list'>


        {user ? (
          <>
            <li>
              <Link className='nav n1' to='/report'>
                Report a Sighting
              </Link>
            </li>

            <li>
              <Link className='nav n3' to='/account'>
                My Profile
              </Link>
            </li>

            <li>
              <button className='nav b1' onClick={onLogout}>
                Logout
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className='nav n2' to='/login'>
                Login
                <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link className='nav n3' to='/register'>
                Register
                <FaUser />
              </Link>
            </li>
          </>
        )}


      </ul>
    </header>
  )
}

export default Navbar