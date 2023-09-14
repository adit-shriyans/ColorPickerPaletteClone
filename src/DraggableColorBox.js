import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./DraggableColorBox.css";

function DraggableColorBox(props) {
  return (
    <div style={{backgroundColor: props.color}} className='DraggableColorBox'>
      <div className='box-content'>
        <span>{props.name}</span>
        <span><DeleteOutlineIcon className='delete-icon' onClick={props.removeColor} /></span>
      </div>
    </div>
  )
}

export default DraggableColorBox