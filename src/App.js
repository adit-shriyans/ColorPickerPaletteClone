import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import {Route, Routes, useParams} from "react-router-dom";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./codeHelper";
import { useState } from "react";

export function RenderPalette(props) {
  function findPalette(id) {
    return props.palettes.find(function(palette) {return palette.id === id})
  }
  let {id} = useParams();
  return <Palette palette={generatePalette(findPalette(id))} />
}

export function RenderSingleColorPalette(props) {
  function findPalette(id) {
    return props.palettes.find(function(palette) {return palette.id === id})
  }
  let {colorId, paletteId} = useParams();
  return <SingleColorPalette colorId={colorId} palette={generatePalette(findPalette(paletteId))} />
}

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }

  return (
    <Routes>
      <Route path="/" Component={() => <PaletteList palettes={palettes} />} />
      <Route path="/palette/new" Component={() => <NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
      <Route path="/palette/:id" Component={() => <RenderPalette palettes={palettes} />} />
      <Route path="/palette/:paletteId/:colorId" Component={() => <RenderSingleColorPalette palettes={palettes} />}></Route>
      <Route path="/*" Component={() => <h1>Palette not found :(</h1>} />
    </Routes>
  );
}

export default App;
