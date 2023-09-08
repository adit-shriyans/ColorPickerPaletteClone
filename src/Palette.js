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
  const [format, setFormat] = useState("hex");
  const colorBoxes = props.palette.colors[lvl].map((color, index) => (
    <ColorBox background={color[format]} name={color.name} />
  ))
  function changeFormat(val){
    setFormat(val);
  }
  return (
    <div className='Palette'>
      <Navbar level={lvl} changeLevel={setLvl} handleChange={changeFormat} />
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