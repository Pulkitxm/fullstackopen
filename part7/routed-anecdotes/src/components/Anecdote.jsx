import React from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <br />
      has {anecdote.votes} votes
      <br />
      {anecdote.content}
      <br />-<b>{anecdote.author}</b>
      <br />
      for more info:{" "}
      <a href={anecdote.info} target="_blank">
        {anecdote.info}
      </a>
      <br />
      <br />
    </div>
  );
};

export default Anecdote;