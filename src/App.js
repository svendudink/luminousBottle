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
import { UserContextProvider } from "./components/context/UserContext";

function App() {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <BackgroundLayer />
      </UserContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
