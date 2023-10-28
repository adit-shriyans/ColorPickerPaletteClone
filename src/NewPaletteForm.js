import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import "./NewPaletteForm.css";
import DraggableColorList from './DraggableColorList';
import NavPaletteForm from './NavPaletteForm';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const [open, setOpen] = React.useState(true);
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newName, setNewName] = React.useState("");
  const isPaletteFull = colors.length >= props.maxColors;

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });
  }, [newName]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function removeColor(colorName) {
    setColors(colors.filter(color => color.name !== colorName))
  }

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    let randomColor = allColors[Math.floor(Math.random()*allColors.length)];
    let isDuplicate = true;
    while(isDuplicate){
      randomColor = allColors[Math.floor(Math.random()*allColors.length)];
      isDuplicate = colors.some(color => color.name === randomColor.name)
    }
    setColors([...colors, randomColor]);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <NavPaletteForm palettes={props.palettes} savePalette={props.savePalette} open={open} setOpen={setOpen} colors={colors} />
      <Drawer
        sx={{
          width: drawerWidth,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className='drawerContainer'>
        <Typography variant='h4' gutterBottom>
          Choose Your Color
        </Typography>
        <div className='color-buttons'>
          <Button variant='contained' className='btn--clr' color='error' onClick={() => {setColors([])}} >Clear Palette</Button>
          <Button variant='contained' className='btn--rnd' color='primary' onClick={addRandomColor} disabled={isPaletteFull} >Random Color</Button>
        </div>
        <ColorPickerForm isPaletteFull={isPaletteFull} colors={colors} setColors={setColors} newName={newName} setNewName={setNewName} />
        </div>
      </Drawer>
      <Main open={open} className='listContainer'>
        <DrawerHeader />
        <div>
          <DraggableColorList colors={colors} removeColor={removeColor} />
        </div>
      </Main>
    </Box>
  );
}

PersistentDrawerLeft.defaultProps = {
  maxColors: 20
}
