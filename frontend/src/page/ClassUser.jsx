import React from 'react' 
import { Outlet  } from 'react-router-dom'



function ClassUser() { 
  return (<div className='mx-24 mt-32'>
      <Outlet />
  </div>)
}
export default ClassUser  