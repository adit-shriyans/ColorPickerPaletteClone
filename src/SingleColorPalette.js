import React from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {Link} from "react-router-dom";
import { useState } from 'react';

function SingleColorPalette(props) {

    const [format, setFormat] = useState("hex");
    function changeFormat(val){
        setFormat(val);
    }
    let _shades = gatherShades(props.palette, props.colorId);
    console.log(_shades);

    function gatherShades(palette, colorToFilterBy)
    {
        let shades = [];
        let colors = palette.colors;
        for(let key in colors) {
            shades = shades.concat(colors[key].filter(color => color.id === colorToFilterBy));
        }
        return shades.slice(1);
    }

    const colorBoxes = _shades.map(color => (
        <ColorBox key={color.id} name={color.name} background={color[format]} showMore={false} />
    ))

  return (
    <div className='SingleColorPalette Palette'>
        <Navbar handleChange={changeFormat} sliderOn={false} />
        <div className='Palette-colors'>
            {colorBoxes}
            <div className='go-back ColorBox'>
                <Link to={`/palette/${props.palette.id}`} className='go-back-button'>Go Back</Link>
            </div>
        </div>
        <PaletteFooter paletteName={props.palette.paletteName} emoji={props.palette.emoji} />
    </div>
  )
}

export default SingleColorPalette