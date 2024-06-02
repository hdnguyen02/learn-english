import React from 'react' 
import { Outlet  } from 'react-router-dom'



function Card() { 
  return (<div className='mx-4 md:mx-24 mt-32'>
      <Outlet />
  </div>)
}
export default Card