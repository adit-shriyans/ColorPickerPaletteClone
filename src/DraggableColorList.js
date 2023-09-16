import React from 'react'
import DraggableColorBox from './DraggableColorBox';
import "./DraggableColorList.css";

function DraggableColorList(props) {
  return (
    <div className='DraggableColorList' style={{height:"500px"}}>
        <ul>
            {props.colors.map(color => (
                <DraggableColorBox 
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    removeColor={() => props.removeColor(color.name)}
                />
            ))}
        </ul>
    </div>
  )
}

export default DraggableColorList