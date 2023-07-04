import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Post.css'
import FriendsList from './FriendsList'

const Friends = () => {

  

  return (
    <div className='home-container-1'>
      <LeftSidebar />
        <FriendsList/>
    </div>
  )
}

export default Friends
