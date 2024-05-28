import React from 'react' 
import { Outlet  } from 'react-router-dom'



function Deck() { 
  return (<div className='mx-24 mt-32'>
      <Outlet />
  </div>)
}
export default Deck