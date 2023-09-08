import { React, useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import "./Palette.css";
function Palette(props) {
  const [lvl, setLvl] = useState(500);
  const [format, setFormat] = useState("hex");
  const colorBoxes = props.palette.colors[lvl].map((color, index) => (
    <ColorBox background={color[format]} name={color.name} key={color.id} />
  ))
  function changeFormat(val){
    setFormat(val);
  }
  return (
    <div className='Palette'>
      <Navbar level={lvl} changeLevel={setLvl} handleChange={changeFormat} />
      <div className='Palette-colors'>
        {colorBoxes}
      </div>
      <footer className='Palette-footer'>
        {props.palette.paletteName}
        <span className='emoji'>{props.palette.emoji}</span>
      </footer>
    </div>
  )
}

export default Palette