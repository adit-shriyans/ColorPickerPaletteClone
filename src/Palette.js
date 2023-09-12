import { React, useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import "./Palette.css";
import PaletteFooter from './PaletteFooter';

function Palette(props) {
  const [lvl, setLvl] = useState(500);
  const [format, setFormat] = useState("hex");
  const colorBoxes = props.palette.colors[lvl].map((color) => (
    <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={props.palette.id} showMore={true} />
  ))
  function changeFormat(val){
    setFormat(val);
  }
  return (
    <div className='Palette'>
      <Navbar level={lvl} changeLevel={setLvl} handleChange={changeFormat} sliderOn={true} />
      <div className='Palette-colors'>
        {colorBoxes}
      </div>
      <PaletteFooter paletteName={props.palette.paletteName} emoji={props.palette.emoji} />
    </div>
  )
}

export default Palette