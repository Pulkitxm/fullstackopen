import React from 'react'
import {useDispatch, useSelector } from "react-redux";
import anecdoteServices from '../services/anecdote'
import { createAnecdotes } from '../reducers/anecdoteReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdotes(event.target.content.value))
  }
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={e=>newAnecdote(e)} >
          <div><input name='content' /></div>
          <button>create</button>
      </form>
    </>
  )
}

export default NewAnecdote