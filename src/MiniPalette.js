import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "./MiniPalette.css";

function MiniPalette(props) {
  const miniColorBoxes = props.colors.map(color => (
    <div className='mini-color' style={{ backgroundColor: color.color }} key={color.name} />
  ))

  const deletePalette = (e) => {
    e.stopPropagation();
    props.deletePalette(props.id)
  }

  return (
    <div className='mini-root' onClick={props.handleClick}>
      <div className='btn--dltMini'>
        <DeleteIcon className='deleteIcon' style={{transition: "all 0.3s ease-in-out"}} onClick={deletePalette} />
      </div>
      <div className='colors'>{miniColorBoxes}</div>
      <h5 className='title'>{props.paletteName} <span className='emoji'>{props.emoji}</span></h5>
    </div>
  )
}

export default MiniPalette