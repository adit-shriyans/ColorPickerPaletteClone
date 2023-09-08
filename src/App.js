import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./codeHelper";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
