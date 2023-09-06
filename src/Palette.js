import React from 'react';
import ColorBox from './ColorBox';
import "./Palette.css";

function Palette(props) {
    const colorBoxes = props.colors.map((color, index) => (
        <ColorBox background={color.color} name={color.name} />
    ))
  return (
    <div className='Palette'>
        <div className='Palette-colors'>
            {colorBoxes}
        </div>
    </div>
  )
}

export default Palette