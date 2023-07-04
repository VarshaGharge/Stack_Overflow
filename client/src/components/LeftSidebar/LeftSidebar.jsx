import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Globe from '../../assets/Globe.png'
import './LeftSidebar.css'

const LeftSidebar = () => {
  var User = useSelector(state => state.currentUserReducer)

  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink activeclassname='active' to='/' className='side-nav-links'  >
          <p>Home</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>PUBLIC</p></div>
          <NavLink activeclassname='active' to='/Questions' className='side-nav-links' style={{ paddingLeft:"40px" }}>
            <img src={Globe} alt="globe" />
            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink to='/Tags' className='side-nav-links' style={{ paddingLeft:"40px" }}>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/Users' className='side-nav-links' style={{ paddingLeft:"40px" }}>
            <p>Users</p>
          </NavLink>
          { User === null ? 
            <NavLink to='/Auth' className='side-nav-links' style={{ paddingLeft:"40px" }}>
              <p>Explore</p>
            </NavLink>:
            <>
            <NavLink to='/Post' className='side-nav-links' style={{ paddingLeft:"40px" }}>
              <p>Explore</p>
            </NavLink>
          </>
          }
          {User !== null && User.result.plan !== "GOLD" && (
            <NavLink to='/Plans' className='side-nav-links' style={{ paddingLeft:"40px" }}>
              <p>Upgrade</p>
            </NavLink>
          )}
        </div>
      </nav>
      
    </div>
  )
}

export default LeftSidebar
