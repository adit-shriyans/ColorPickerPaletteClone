import * as React from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import "./NewPaletteForm.css";
import "./ColorPickerForm.css";


function ColorPickerForm(props) {
    const [currentColor, setCurrentColor] = React.useState("teal");

    const addNewColor = () => {
        if (!newName) return;
        const newColor = {
            color: currentColor,
            name: newName
        };
        setColors([...colors, newColor]);
        setNewName("");
    }
    const { isPaletteFull, colors, setColors, newName, setNewName } = props;

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', () => {
            return colors.every(({ color }) => color !== currentColor);
        });
    }, [newName, currentColor]);
    return (
        <div>
            <List>
                <ChromePicker color={currentColor} onChangeComplete={(newColor) => setCurrentColor(newColor.hex)} className='chromePicker' />
            </List>
            <ValidatorForm onSubmit={addNewColor} instantValidate={false} >
                <TextValidator
                    className='colorInput'
                    variant="filled"
                    margin='normal'
                    placeholder='Color name'
                    onChange={(evt) => setNewName(evt.target.value)}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={["this field is required", "Color name must be unique", "Color already used"]}
                    value={newName}
                />
                <Button variant='contained' type='submit' color='primary' disabled={isPaletteFull} style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }} className='btn--addClr' >
                    {isPaletteFull ? 'Palette full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default ColorPickerForm