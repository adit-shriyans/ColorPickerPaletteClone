import { React, useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from 'chroma-js';
import { Link } from "react-router-dom";
import "./ColorBox.css";

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const isDarkColor = chroma(props.background).luminance() <= 0.055;
  const isLightColor = chroma(props.background).luminance() >= 0.7;

  return (
    <CopyToClipboard text={props.background} onCopy={() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }}>
      <div style={{ background: props.background }} className='ColorBox'>
        <div style={{ background: props.background }} className={`copy-overlay ${copied && "show"}`} />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={isLightColor && "dark-text"}>{props.background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColor && "light-text"}>{props.name}</span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
        </div>
        {props.showMore && <Link to={`/palette/${props.paletteId}/${props.id}`} onClick={e => e.stopPropagation()}>
          <span className={`see-more ${isLightColor && "dark-text"}`}>More</span>
        </Link>}
      </div>
    </CopyToClipboard>
  )
}
export default ColorBox