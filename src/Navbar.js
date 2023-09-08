import {React, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

function Navbar(props) {
  const [format, setFormat] = useState("hex");
  function handleChange(e) {
    setFormat(e.target.value);
    props.handleChange(e.target.value);
  }
  return (
    <header className='Navbar'>
        <div className='logo'>
            <a href="#">reactcolorpicker</a>
        </div>
        <div className='slider-container'>
            <span>Level: {props.level/100}</span>
            <div className='slider'>
                <Slider defaultValue={props.level} min={100} max={900} step={100} onChange={(level) => {props.changeLevel(level)}} />
            </div>
        </div>
        <div className='select-container'>
          <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
          </Select>
        </div>
    </header>
  )
}

export default Navbar