import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Plans.css'
import DisplayPlans from './DisplayPlans'


const Plans = () => {

  return (
    <div className="home-container-1">
      <LeftSidebar />
        <DisplayPlans />
    </div>
  )
}

export default Plans
