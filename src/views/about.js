import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { AboutStory } from "../media/background/Storys/Storys";

const About = () => {
  const { setActivePage } = useContext(GlobalContext);

  useEffect(() => {
    setActivePage("about");
  });

  return (
    <div>
      <AboutStory />
    </div>
  );
};

export default About;
