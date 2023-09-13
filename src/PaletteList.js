import React from 'react';
import MiniPalette from './MiniPalette';
import "./PaletteList.css";
import { useNavigate, Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';

function PaletteList(props) {

  const navigate = useNavigate();
  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }
  
  return (
    <div className='root'>
      <div className='container'>
        <nav className='nav'>
          <h1>Palette List</h1>
          <Link to="/palette/new"><CreateIcon sx={{ fontSize: 24 }} />Create Palette</Link> 
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