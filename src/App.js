import { useEffect } from "react";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import { Route, Routes, useParams } from "react-router-dom";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./codeHelper";
import { useState } from "react";

export function RenderPalette(props) {
  function findPalette(id) {
    return props.palettes.find(function (palette) { return palette.id === id })
  }
  let { id } = useParams();
  return <Palette palette={generatePalette(findPalette(id))} />
}

export function RenderSingleColorPalette(props) {
  function findPalette(id) {
    return props.palettes.find(function (palette) { return palette.id === id })
  }
  let { colorId, paletteId } = useParams();
  return <SingleColorPalette colorId={colorId} palette={generatePalette(findPalette(paletteId))} />
}

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const availablePalettes = savedPalettes.length!==0?savedPalettes:seedColors;
  const [palettes, setPalettes] = useState(availablePalettes);
  // const [palettes, setPalettes] = useState(seedColors);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  function savePalette(newPalette) {
    console.log("OKOK");
    setPalettes([...palettes, newPalette]);
    syncLocalStorage();
  }

  function syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  }

  function deletePalette(id) {
    setPalettes(palettes.filter(p => p.id !== id));
    syncLocalStorage();
  }

  return (
    <Routes>
      <Route path="/" Component={() => <PaletteList palettes={palettes} deletePalette={deletePalette} />} />
      <Route path="/palette/new" Component={() => <NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
      <Route path="/palette/:id" Component={() => <RenderPalette palettes={palettes} />} />
      <Route path="/palette/:paletteId/:colorId" Component={() => <RenderSingleColorPalette palettes={palettes} />}></Route>
      <Route path="/*" Component={() => <h1>Palette not found :(</h1>} />
    </Routes>
  );
}

export default App;
