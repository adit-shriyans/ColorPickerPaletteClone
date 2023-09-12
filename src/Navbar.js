import {React, useState} from 'react';
import {Link} from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

function Navbar(props) {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);
  function handleChange(e) {
    setFormat(e.target.value);
    setOpen(true);
    props.handleChange(e.target.value);
  }
  return (
    <header className='Navbar'>
        <div className='logo'>
            <Link to="/">reactcolorpicker</Link>
        </div>
        {props.sliderOn && <div className='slider-container'>
            <span>Level: {props.level/100}</span>
            <div className='slider'>
                <Slider defaultValue={props.level} min={100} max={900} step={100} onChange={(level) => {props.changeLevel(level)}} />
            </div>
        </div>}
        <div className='select-container'>
          <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
          </Select>
        </div>
        <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}} open={open} autoHideDuration={3000} message={<span id='message-id'>Format changed to {format.toUpperCase()}</span>} ContentProps={{"aria-describedby": "message-id"}} onClose={() => {setOpen(false)}} action={[<IconButton onClick={() => {setOpen(false)}} color='inherit' key="close" aria-label='close' ><CloseIcon /></IconButton>]} />
    </header>
  )
}

export default Navbar