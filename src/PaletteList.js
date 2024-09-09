import React, { useState } from 'react';
import MiniPalette from './MiniPalette';
import "./PaletteList.css";
import { useNavigate, Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';

function PaletteList(props) {

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const navigate = useNavigate();

  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }
  
  function handleDelete() {
    props.deletePalette(deletingId);
    setOpenDeleteDialog(false);
    setDeletingId("");
  }

  return (
    <div className='root PaletteList'>
      <div className='container'>
        <nav className='nav'>
          <h1>Palette List</h1>
          <Link to="/palette/new"><CreateIcon sx={{ fontSize: 24 }} />Create Palette</Link> 
        </nav>
        {/* <div className='palettes'> */}
          <TransitionGroup className='palettes'>
          {props.palettes?.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette {...palette} handleClick={() => goToPalette(palette.id)} deletePalette={(id) => {setOpenDeleteDialog(true);setDeletingId(id)}} key={palette.id} id={palette.id} />
            </CSSTransition>
          ))}
          </TransitionGroup>
        {/* </div> */}
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle id="delete-dialog-title" >Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={()=>{setOpenDeleteDialog(false); setDeletingId("")}}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default PaletteList