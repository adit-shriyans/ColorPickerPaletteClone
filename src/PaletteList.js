import React from 'react';
import MiniPalette from './MiniPalette';
import "./PaletteList.css";
import { Link, useNavigate } from "react-router-dom";

function PaletteList(props) {

  const navigate = useNavigate();
  function goToPalette(id) {
    console.log("clicked");
    console.log(id);
    navigate(`/palette/${id}`);
  }

  return (
    <div className='root'>
      <div className='container'>
        <nav className='nav'>
          <h1>Palette List</h1>
        </nav>
        <div className='palettes'>
          {props.palettes.map(palette => (
            <p>
              {/* <Link to={`/palette/${palette.id}`}> */}
                <MiniPalette {...palette} handleClick={() => goToPalette(palette.id)} />
              {/* </Link> */}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaletteList