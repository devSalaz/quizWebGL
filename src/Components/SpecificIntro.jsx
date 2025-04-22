import React from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";

//Styles
import "../assets/Styles/specificIntroStyles.css";

const SpecificIntro = () => {
  const currentQuiz = useQuizStore((state) => state.currentQuiz);

  const setStage = useQuizStore((state) => state.setStage);

  function setQuizStage() {
    setStage(QUIZ_STAGES.QUIZ);
  }

  let currentIntroComponent =
    currentQuiz.sku == "nickelodeon" ? (
      <NickelodeonIntro setQuizStage={setQuizStage} />
    ) : (
      <BrainrotIntro setQuizStage={setQuizStage} />
    );

  return (
    <div className="specific-intro-container">{currentIntroComponent}</div>
  );
};

export default SpecificIntro;

const BrainrotIntro = ({ setQuizStage }) => {
  return (
    <div className="brainrot-intro">
      <h3>Braintrot</h3>

      <p>
        This quiz gently explores your awareness of online trends, viral memes,
        and the occasional bit of delightful internet weirdness
      </p>

      <button onClick={setQuizStage}>Star Quiz</button>
    </div>
  );
};

const NickelodeonIntro = ({ setQuizStage }) => {
  return (
    <div className="nickelodeon-intro">
      <h3>Plankton has captured all your favorite Nickelodeon characters!</h3>

      <p>
        He’s holding them hostage to steal the Krabby Patty secret formula. The
        only way to save them is by answering questions correctly
      </p>

      <button onClick={setQuizStage}>Star Quiz</button>
    </div>
  );
};
