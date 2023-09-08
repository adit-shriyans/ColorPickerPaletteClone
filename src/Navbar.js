import React from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

function Navbar(props) {
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
    </header>
  )
}

export default Navbar