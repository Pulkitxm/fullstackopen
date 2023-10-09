import React from 'react'

import { useDispatch,useSelector } from 'react-redux'

const VisibilityFilter = () => {
  const filter = useSelector(state=>state.filter)
  const dispatch = useDispatch()
  return (
    <div>
      filter: <input placeholder='Type a filter' onChange={(e)=>{
        dispatch({ type: 'filter/filterChange', payload: e.target.value})
      }} />
    </div>
  )
}

export default VisibilityFilter