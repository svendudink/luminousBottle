/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:32 ////////////
// Basic information about this React app
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { AboutStory } from "../media/Storys/Storys";

const About = () => {
  const { setActivePage } = useContext(GlobalContext);

  useEffect(() => {
    setActivePage("about");
    document.title = "Bottle Luminous: About";
  });

  return (
    <div className="about">
      <AboutStory />
    </div>
  );
};

export default About;
