import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs'

const ToggleContent = (props) => {
  const [visible, setVisible] = useState(true);
  const [author, setAuthor] = useState('')

  if (props.type === 'form') {
    return (
      <div >
        {(visible) ? props.children : (<></>)}
        <br /><br />
        <button onClick={() => setVisible(!visible)} style={{ backgroundColor: 'red' }} >
          {visible ? 'Cancel' : props.label}
        </button>
      </div>
    )
  } else if (props.type === 'blog') {

    const [like, setLike] = useState(props.blog.likes)
    const handleLike = () => {
      setLike(like+1)
      props.blog.likes+=1;
      let id = props.blog.id
      let newObject = { ...props.blog, author:author.id , likes: like+1 }
      blogService.update(id , newObject) 
    }

    useEffect(() => {
      props.author.then((Author) => {
        setAuthor(Author);
      });
    }, [props.author, props.type]);

    return (
      <div className='note' >
        {props.i}{') '}title: <b>{props.blog.title}</b> &nbsp; 
        {(visible) ?
          <>
            <br />
            url: <a href={props.blog.url}>{props.blog.url}</a>
            <br />
            <p style={{display:'inline',cursor:'pointer',userSelect:'none'}} onClick={handleLike}  >👍</p>: {like}
            <br />
            author: {author}
            <br />
          </>

          : (<></>)}
        <button onClick={() => setVisible(!visible)} className='visible' >
          {visible ? 'hide' : props.label}
        </button>
      </div>
    )
  }
}

export default ToggleContent