import React from 'react';
import "./MiniPalette.css";

function MiniPalette(props) {
    const miniColorBoxes = props.colors.map(color => (
        <div className='mini-color' style={{backgroundColor: color.color}} key={color.name} />
    ))
  return (
    <div className='mini-root' onClick={props.handleClick}>
        <div className='colors'>{miniColorBoxes}</div>
        <h5 className='title'>{props.paletteName} <span className='emoji'>{props.emoji}</span></h5>
    </div>
  )
}

export default MiniPalette