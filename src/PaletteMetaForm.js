import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Picker from '@emoji-mart/react';
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
    const [stage, setStage] = React.useState('form');
    const { colors } = props;
    const navigate = useNavigate();

    const handleEmojiSelect = (emoji) => {
        savePalette(emoji.native);
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
        });
    }, [newPaletteName]);

    const savePalette = (emoji) => {
        const newPalette = {
            paletteName: newPaletteName,
            colors: colors,
            emoji: emoji,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
        };
        props.savePalette(newPalette);
        navigate("/");
    };

    return (
        <div>
            <Dialog open={stage === 'emoji'} onClose={props.hideForm}>
                <DialogTitle>Choose Palette Emoji</DialogTitle>
                <Picker onEmojiSelect={handleEmojiSelect} />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={props.hideForm}>
                <DialogTitle>Create Palette</DialogTitle>
                <ValidatorForm onSubmit={() => setStage('emoji')}>
                    <DialogContent>
                        <DialogContentText>
                            Enter a name for your palette
                        </DialogContentText>
                        <TextValidator
                            value={newPaletteName}
                            label="Palette Name"
                            onChange={(evt) => setNewPaletteName(evt.target.value)}
                            fullWidth
                            margin='normal'
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["This field is required", "Palette name already taken"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.hideForm}>Cancel</Button>
                        <Button type='submit' variant='contained' color='primary'>Save Name</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
