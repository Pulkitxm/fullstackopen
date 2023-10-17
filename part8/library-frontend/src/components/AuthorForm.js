import React, { useState } from 'react'

import { editAuthor,fetchAuthors } from '../gqlQueries'
import { useMutation } from '@apollo/client'

const AuthorForm = () => {
  
  const [name, setname] = useState("")
  const [year, setyear] = useState("")

  const [alterAuthor] = useMutation(editAuthor,{
    refetchQueries:[ {quer:fetchAuthors} ]
  })
  
  const handleUpdate = () => {
    alterAuthor({variables:{name,setBornTo:parseInt(year)}})
    setname("")
    setyear("")
  }
  
  return (
    <div>
      <h2>Set Birth year</h2>
      name<input type="text" value={name} onChange={e=>setname(e.target.value)} />
      <br />
      born<input type="text" value={year} onChange={e=>setyear(e.target.value)} />
      <br />
      <button onClick={handleUpdate} >update author</button>
    </div>
  )
}

export default AuthorForm