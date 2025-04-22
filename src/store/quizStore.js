import { create } from "zustand";
import { quizzes } from "../data/dataQuiz";

export const QUIZ_STAGES = {
  GENERAL_INTRO: "generalIntro",
  SELECTING_QUIZ: "selectingQuiz",
  QUIZ_SPECIFIC_INTRO: "quizSpecificIntro",
  QUIZ: "quiz",
  RESULTS: "results",
};

const useQuizStore = create((set) => ({
  isQuizCompleted: false,
  currentQuiz: null,
  currentQuestionId: 0,
  currentQuestions: [],
  currentStage: QUIZ_STAGES.GENERAL_INTRO,
  correctAnswersCount: 0,

  incrementCorrectAnswers: () => {
    set((state) => ({
      correctAnswersCount: state.correctAnswersCount + 1,
    }));
  },

  setQuizId: (id) => {
    const currentQuiz = quizzes[id];

    const questions = [...currentQuiz.questions];

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    set({ quizId: id, currentQuiz: currentQuiz, currentQuestions: questions });
  },
  setIsQuizCompleted: (completed) => set({ isQuizCompleted: completed }),
  setCurrentQuestion: (questionIndex) =>
    set({ currentQuestionId: questionIndex }),

  resetQuiz: () => {
    set({
      isQuizCompleted: false,
      currentQuestionId: 0,
      currentStage: QUIZ_STAGES.SELECTING_QUIZ,
      currentQuiz: null,
      correctAnswersCount: 0,
    });
  },

  setStage: (stage) => set({ currentStage: stage }),
}));

export default useQuizStore;
