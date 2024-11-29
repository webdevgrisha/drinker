import "./App.css";
import getCotails from "./services/cotails-api";

function App() {
  getCotails("cocktails");
  getCotails("cocktails/glasses");
  getCotails("cocktails/categories");
  getCotails("cocktails/11002");
  return <></>;
}

export default App;
