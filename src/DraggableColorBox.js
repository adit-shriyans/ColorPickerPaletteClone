import React from 'react';
import "./DraggableColorBox.css";

function DraggableColorBox(props) {
  return (
    <div style={{backgroundColor: props.color}} className='DraggableColorBox'>
        {props.color}
    </div>
  )
}

export default DraggableColorBox