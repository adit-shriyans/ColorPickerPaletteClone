import {React, useState} from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./ColorBox.css";

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  return (
    <CopyToClipboard text={props.background} onCopy={() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      }}>
      <div style={{background: props.background}} className='ColorBox'>
          <div style={{background: props.background}} className={`copy-overlay ${copied && "show"}`} />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>copied!</h1>
            <p>{props.background}</p>
          </div>
          <div className='copy-container'>
              <div className='box-content'>
                  <span>{props.name}</span>
              </div>
              <button className='copy-button'>Copy</button>
          </div>
          <span className='see-more'>More</span>
      </div>
    </CopyToClipboard>
  )
}
export default ColorBox