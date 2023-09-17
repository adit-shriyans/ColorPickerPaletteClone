import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(true);
  const [newPaletteName, setNewPaletteName] = React.useState("");
  const {colors} = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
    });
  }, [newPaletteName]);

  const savePalette = () => {
    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id:newPaletteName.toLowerCase().replace(/ /g, "-"),
    };
    props.savePalette(newPalette);
    navigate("/");
  };

  return (
      <Dialog open={open} onClose={props.hideForm}>
        <DialogTitle>Create Palette</DialogTitle>
        <ValidatorForm onSubmit={savePalette}>
        <DialogContent>
          <DialogContentText>
            Enter a name for your palette
          </DialogContentText>
          {/* <ValidatorForm onSubmit={savePalette}> */}
            <TextValidator 
              value={newPaletteName} 
              label="Palette Name"
              onChange={(evt) => setNewPaletteName(evt.target.value)}
              fullWidth
              margin='normal'
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["this field is required", "palette name already taken"]}
            />
            {/* <Button type='submit' variant='contained' color='primary'>Save Palette</Button> */}
            {/* </ValidatorForm> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hideForm}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
  );
}
