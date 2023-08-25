import React, { useState } from 'react'

const ToggleContent = (props) => {
  const [visible, setVisible] = useState(false)
  if (props.type==='form'){
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

    return (
      <div className='note' >
        {props.i}{') '}title: <b>{props.blog.title}</b>
        {(visible) ?
          <>
            <br />
            likes:{' ' + props.blog.likes}
            <br />
            url: <a href={props.blog.url}>{props.blog.url}</a>
            <br />
            likes: {props.blog.likes}
            <br />
            author: {props.blog.author.name}
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