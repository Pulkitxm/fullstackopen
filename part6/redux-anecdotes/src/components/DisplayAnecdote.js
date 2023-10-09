import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const DisplayAnecdote = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter!='')
      return state.anecdote.filter(i=>i.content.search(state.filter)!=-1)
    return state.anecdote
  });
  const dispatch = useDispatch();

  const displayNotification = (content) =>{
    dispatch({ type: 'notification/changeNotification', payload: content})
    setTimeout(()=>{
      dispatch({ type: 'notification/removeNotification'})
    },5000)
  }

  const vote = (id) => {
    dispatch({ type: 'anecdote/voteAnecdote', payload: id })
    displayNotification(`voted for [ ${anecdotes.filter(i=>i.id==id)[0].content} ]`)
  };

  const sortedAnecdotes = (anecdotes) => {
    const sortedArr = [...anecdotes];
    for (let i=0;i<sortedArr.length;i++)
        for (let j=0;j<sortedArr.length-1;j++)
            if (sortedArr[j].votes < sortedArr[j+1].votes){
                const newObj = sortedArr[j];;
                sortedArr[j] = sortedArr[j+1];
                sortedArr[j+1] = newObj;
            }
    return sortedArr;
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote) => ( */}
      {sortedAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnecdote;
