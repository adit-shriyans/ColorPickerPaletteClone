import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import {ChromePicker} from "react-color";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "./NewPaletteForm.css";
import DraggableColorList from './DraggableColorList';
import NavPaletteForm from './NavPaletteForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
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
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newName, setNewName] = React.useState("");
  const isPaletteFull = colors.length >= props.maxColors;

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });
  }, [newName]);

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(({ color }) => color !== currentColor);
    });
  }, [newName, currentColor]);

  const addNewColor = () => {
    if (!newName) return;
    const newColor = {
      color: currentColor,
      name: newName
    };
    setColors([...colors, newColor]);
    setNewName("");
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function removeColor(colorName) {
    setColors(colors.filter(color => color.name !== colorName))
  }

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    const randomColor = allColors[Math.floor(Math.random()*allColors.length)];
    setColors([...colors, randomColor]);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <NavPaletteForm palettes={props.palettes} savePalette={props.savePalette} open={open} setOpen={setOpen} colors={colors} />
      <Drawer
        sx={{
          width: drawerWidth,
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
        <Typography variant='h4' >
          Choose Your Color
        </Typography>
        <div className='color-buttons'>
          <Button variant='contained' color='error' onClick={() => {setColors([])}} >Clear Palette</Button>
          <Button variant='contained' color='primary' onClick={addRandomColor} disabled={isPaletteFull} >Random Color</Button>
        </div>
        <List>
          <ChromePicker color={currentColor} onChangeComplete={(newColor) => setCurrentColor(newColor.hex)} />
        </List>
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
            placeholder='Enter Color Name'
            onChange={(evt) => setNewName(evt.target.value)}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={["this field is required", "Color name must be unique", "Color already used"]}
            value={newName}
          />
          <Button variant='contained' type='submit' color='primary' disabled={isPaletteFull} style={{backgroundColor: isPaletteFull?'grey':currentColor}}>
            {isPaletteFull?'Palette full':'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <div>
          <ul className='color-boxes'>
            {colors.map((color) => (
              <DraggableColorBox key={color.name} color={color.color} name={color.name} removeColor={() => removeColor(color.name)} />
            ))}
          </ul>
        </div> */}
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
