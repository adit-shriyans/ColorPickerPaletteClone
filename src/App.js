import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import {Route, Routes, useParams} from "react-router-dom";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./codeHelper";

export function RenderPalette() {
  function findPalette(id) {
    return seedColors.find(function(palette) {return palette.id === id})
  }
  let {id} = useParams();
  return <Palette palette={generatePalette(findPalette(id))} />
}

export function RenderSingleColorPalette() {
  function findPalette(id) {
    return seedColors.find(function(palette) {return palette.id === id})
  }
  let {colorId, paletteId} = useParams();
  return <SingleColorPalette colorId={colorId} palette={generatePalette(findPalette(paletteId))} />
}

function App() {
  return (
    <Routes>
      <Route path="/" Component={() => <PaletteList palettes={seedColors} />} />
      <Route path="/palette/new" Component={() => <NewPaletteForm />} />
      <Route path="/palette/:id" Component={() => <RenderPalette />} />
      <Route path="/palette/:paletteId/:colorId" Component={() => <RenderSingleColorPalette />}></Route>
      <Route path="/*" Component={() => <h1>Palette not found :(</h1>} />
    </Routes>
  );
}

export default App;
