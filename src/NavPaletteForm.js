import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import "./NewPaletteForm.css";
import "./NavPaletteForm.css";
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

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

function NavPaletteForm(props) {
    const {open, setOpen, colors} = props;
    const [newPaletteName, setNewPaletteName] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // const savePalette = () => {
    //     const newPalette = {
    //       paletteName: newPaletteName,
    //       colors: colors,
    //       id:newPaletteName.toLowerCase().replace(/ /g, "-"),
    //     };
    //     props.savePalette(newPalette);
    //     navigate("/");
    // }

    // React.useEffect(() => {
    //     ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    //       return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
    //     });
    //   }, [newPaletteName]);

  return (
    <div className='NavPaletteForm'>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='default' className='navAppBar'>
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
            Create your Palette
          </Typography>
        </Toolbar>
        <div className='navBtns'>
          {/* <ValidatorForm onSubmit={savePalette}>
            <TextValidator 
              value={newPaletteName} 
              label="Palette Name"
              onChange={(evt) => setNewPaletteName(evt.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["this field is required", "palette name already taken"]}
            />
            <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
            </ValidatorForm> */}
            {/* <PaletteMetaForm palettes={props.palettes} colors={colors} savePalette={props.savePalette} /> */}
            <Link to='/'>
              <Button variant='contained' color='secondary' className='btn--nav'>Go Back</Button>
            </Link>
            <Button variant="contained" className='btn--nav' onClick={() => setShowForm(true)}>
              Save Palette
            </Button>
        </div>
      </AppBar>
      {showForm && <PaletteMetaForm palettes={props.palettes} colors={colors} savePalette={props.savePalette} hideForm={() => setShowForm(false)} />}
    </div>
  )
}

export default NavPaletteForm