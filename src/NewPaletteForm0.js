import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import {ChromePicker} from "react-color";
import Typography from '@mui/material/Typography';
import "./NewPaletteForm.css";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function NewPaletteForm() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(["purple", "#e15f74"]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={e => {toggleDrawer(anchor, false);
                e.stopPropagation()}}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div>hey</div>
      </List>
      <Divider />
      <Typography variant='h4' >
        Choose Your Color
      </Typography>
      <div className='color-buttons'>
        <Button variant='contained' color='error'>Clear Palette</Button>
        <Button variant='contained' color='primary'>Random Color</Button>
      </div>
      <List>
        <ChromePicker color={currentColor} onChangeComplete={(newColor) => setCurrentColor(newColor.hex)} />
      </List>
      <TextField>Enter Color Name</TextField>
      <Button variant='contained' color='primary' style={{backgroundColor: currentColor}} onClick={() => setColors([...colors, currentColor])} >Add Color</Button>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}>{'left'}</Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
        <div>
            <ul>
                {colors.map(color => (
                    <li style={{backgroundColor: color}}>{color}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}