import React from 'react';
import {Link} from "react-router-dom";

function PaletteList(props) {
  return (
    <div>
        <h1>Palette List</h1>
        {props.palettes.map(palette => (
            <p>
                <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            </p>
        ))}
    </div>
  )
}

export default PaletteList