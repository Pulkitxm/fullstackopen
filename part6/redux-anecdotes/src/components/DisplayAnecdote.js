import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const DisplayAnecdote = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

//   const sortedAnecdotes = () => {
//     const sortedArr = [...anecdotes];
//     for (let i=0;i<sortedArr.length;i++)
//         for (let j=0;j<sortedArr.length-1;j++)
//             if (sortedArr[j].votes < sortedArr[j+1].votes){
//                 const newObj = sortedArr[j];;
//                 sortedArr[j] = sortedArr[j+1];
//                 sortedArr[j+1] = newObj;
//             }
//     console.log(sortedArr);
//     return sortedArr;
//   }

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* {sortedAnecdotes().map((anecdote) => ( */}
      {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote) => (
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
