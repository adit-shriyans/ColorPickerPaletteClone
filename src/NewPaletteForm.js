import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DraggableColorBox from './DraggableColorBox';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import {ChromePicker} from "react-color";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "./NewPaletteForm.css";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState([]);
  const [newName, setNewName] = React.useState("");
  const [newPaletteName, setNewPaletteName] = React.useState("");
  const navigate = useNavigate();

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

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
    });
  }, [newPaletteName]);

  const addNewColor = () => {
    if (!newName) return;
    const newColor = {
      color: currentColor,
      name: newName
    };
    setColors([...colors, newColor]);
    setNewName("");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const savePalette = () => {
    // let newPaletteName = "New Test Palette";
    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id:newPaletteName.toLowerCase().replace(/ /g, "-"),
    };
    props.savePalette(newPalette);
    navigate("/");
  }

  function removeColor(colorName) {
    setColors(colors.filter(color => color.name !== colorName))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='default'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={savePalette}>
            <TextValidator 
              value={newPaletteName} 
              label="Palette Name"
              onChange={(evt) => setNewPaletteName(evt.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["this field is required", "palette name already taken"]}
            />
            <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
          <Button variant='contained' color='error'>Clear Palette</Button>
          <Button variant='contained' color='primary'>Random Color</Button>
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
          <Button variant='contained' type='submit' color='primary' style={{backgroundColor: currentColor}}>
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div>
          <ul className='color-boxes'>
            {colors.map((color) => (
              <DraggableColorBox key={color.name} color={color.color} name={color.name} removeColor={() => removeColor(color.name)} />
            ))}
          </ul>
        </div>
      </Main>
    </Box>
  );
}
