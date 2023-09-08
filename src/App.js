import Palette from "./Palette";
import {Route, Routes, useParams} from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./codeHelper";



export function RenderPalette() {
  function findPalette(id) {
    return seedColors.find(function(palette) {return palette.id === id})
  }
  let {id} = useParams();
  return <Palette palette={generatePalette(findPalette(id))} />
}

function App() {
  return (
    <Routes>
      <Route path="/" Component={() => <h1>PALETTE LIST</h1>} />
      <Route path="/palette/:id" Component={() => <RenderPalette />} />
      <Route path="/*" Component={() => <h1>Palette not found :(</h1>} />
    </Routes>
  );
}

export default App;
