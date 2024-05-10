import React, { useState } from 'react'
import AsideListening from './ViewContent.astro'
function AsideListeningReact() {

const [state, setState] = useState(false);
const handleClick = () => {
  setState(!state)
}

  return (
    <div>
      HOLA
        {state && <AsideListening />}
        <button className='bg-red-500 text-white p-2' onClick={handleClick}>{state}</button>
    </div>
  )
}

export default AsideListeningReact