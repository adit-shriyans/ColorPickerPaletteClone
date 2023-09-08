import { React, useState } from 'react';
import ColorBox from './ColorBox';
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
import Navbar from './Navbar';
import "./Palette.css";
// const Slider = require('rc-slider');
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

function Palette(props) {
  const [lvl, setLvl] = useState(500);
  const colorBoxes = props.palette.colors[lvl].map((color, index) => (
    <ColorBox background={color.hex} name={color.name} />
  ))
  return (
    <div className='Palette'>
      <Navbar level={lvl} changeLevel={setLvl} />
      {/* <div className='slider'>
        <Slider defaultValue={lvl} min={100} max={900} step={100} onChange={(level) => {setLvl(level)}} />
      </div> */}
      <div className='Palette-colors'>
        {colorBoxes}
      </div>
    </div>
  )
}

export default Palette