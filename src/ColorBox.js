import React from 'react';
import "./ColorBox.css";

function ColorBox(props) {
  return (
    <div style={{background: props.background}} className='ColorBox'>
        <div>{props.name}</div>
        <span>MORE</span>
    </div>
  )
}

export default ColorBox