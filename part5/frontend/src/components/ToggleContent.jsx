import React, { useState } from 'react'

const ToggleContent = (props) => {
    const [visible, setVisible] = useState(false)
  return (
    <>
        {(visible) ? props.children : (<></>)}
        <button onClick={()=>setVisible(!visible)} style={{backgroundColor:'red'}} >
              {visible ? 'Cancel' : props.label}
        </button>
    </>
  )
}

export default ToggleContent