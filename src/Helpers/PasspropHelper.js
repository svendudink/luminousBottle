import { useContext, useState } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { useLocation } from "react-router-dom";

const PasspropHelper = (props) => {
  const { lampBackGround, setLampBackground, activePage, setActivePage } =
    useContext(GlobalContext);

  const location = useLocation();

  props.backGround({
    background: [lampBackGround],
    activePage: [activePage],
    nonsense: ["nonsense"],
  });
};

export default PasspropHelper;
