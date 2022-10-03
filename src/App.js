import {
  Router,
  Route,
  BrowserRouter,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import BackgroundLayer from "./BackgroundLayer";
import { GlobalContextProvider } from "./components/context/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <BackgroundLayer />
    </GlobalContextProvider>
  );
}

export default App;
