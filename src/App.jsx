import { useState } from "react";
import useQuizStore, { QUIZ_STAGES } from "./store/quizStore";

//Components
import NavbarComponent from "./Components/NavbarComponent";
import FooterComponent from "./Components/FooterComponent";

import GeneralIntro from "./Components/GeneralIntro";
import SelectingQuiz from "./Components/SelectingQuiz";
import SpecificIntro from "./Components/SpecificIntro";
import Quiz from "./Components/Quiz";
import Results from "./Components/Results";

import Experience from "./Components/Experience/Experience";

//Styles
import "./App.css";

function App() {
  const currentStage = useQuizStore((state) => state.currentStage);

  let currentComponent;

  switch (currentStage) {
    case QUIZ_STAGES.GENERAL_INTRO:
      currentComponent = <GeneralIntro />;
      break;
    case QUIZ_STAGES.SELECTING_QUIZ:
      currentComponent = <SelectingQuiz />;
      break;
    case QUIZ_STAGES.QUIZ_SPECIFIC_INTRO:
      currentComponent = <SpecificIntro />;
      break;
    case QUIZ_STAGES.QUIZ:
      currentComponent = <Quiz />;
      break;
    case QUIZ_STAGES.RESULTS:
      currentComponent = <Results />;
      break;
    default:
      currentComponent = <GeneralIntro />;
  }

  return (
    <>
      <NavbarComponent />
      {currentComponent}
      <FooterComponent />
      <Experience />
    </>
  );
}

export default App;
