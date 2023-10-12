import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:props.content.value,
        author:props.author.value,
        info:props.info.value,
        votes: 0
      })
      props.setNotification(`a new anecdoete: '${props.content.value}' is created!`)
      setTimeout(()=>{
        props.setNotification('')
      },5000)
      navigate('/')
    }

    const handleClear = (e) => {
      e.preventDefault()
      props.content.clear()
      props.author.clear()
      props.info.clear()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...props.content}/>
          </div>
          <div>
            author
            <input {...props.author}/>
          </div>
          <div>
            url for more info
            <input {...props.info}/>
          </div>
          <button>create</button>
          <button onClick={handleClear} >clear</button>
        </form>
      </div>
    )
  
  }

export default CreateNew