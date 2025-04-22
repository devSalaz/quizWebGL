import React from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";

//Styles
import "../assets/Styles/generalIntro.css";

const GeneralIntro = () => {
  const setStage = useQuizStore((state) => state.setStage);

  function setNextStage() {
    setStage(QUIZ_STAGES.SELECTING_QUIZ);
  }

  return (
    <div className="general-intro">
      <p>
        Hi I'm Andrés, a <span>Creative Developer</span> from Bogotá, Colombia.
        I transform static websites into interactive and engaging web
        experiences. I’m especially passionate about bringing 3D to the browser,
        creating <span>immersive moments</span> that captivate and inspire.
      </p>
      <button onClick={setNextStage}>Continue</button>
    </div>
  );
};

export default GeneralIntro;
