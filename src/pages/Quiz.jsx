import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const categoryMap = {
    9: "General Knowledge",
    19: "Science: Mathematics",
    21: "Sport",
  };

  useEffect(() => {
    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`
            );
            const data = await res.json();
            const formatted = data.results.map((q) => {
                const options = [...q.incorrect_answers];
                const randomIndex = Math.floor(Math.random() * 4);
                options.splice(randomIndex, 0, q.correct_answer);
                return {
                    question: q.question,
                    options,
                    correct: q.correct_answer,
                };
            });
            setQuestions(formatted);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      alert("Quiz completed!");
      navigate("/");
    }
  };

  if (isLoading) {
    return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <p>Loading questions...</p>
    </div>
  );
};

const current = questions[currentIndex];

return (
  <div className="min-h-screen flex justify-center items-center bg-blue-50 p-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-2xl text-center">
      <h2 className="font-semibold mb-4">{categoryMap[categoryId]} Quiz</h2>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h3
        className="font-medium mb-6 text-lg"
        dangerouslySetInnerHTML={{ __html: current.question }}
      />
      <div className="flex flex-col gap-3 mb-6">
        {current.options.map((opt, i) => {
          const isCorrect = opt === current.correct;
          const isSelected = selectedAnswer === opt;

          let btnClass = "bg-gray-100 hover:bg-gray-200 border-gray-300";
          if (isAnswered) {
            if (isSelected && isCorrect) btnClass = "bg-green-200 border-green-400";
            else if (isSelected && !isCorrect) btnClass = "bg-red-200 border-red-400";
            else if (!isSelected && isCorrect) btnClass = "bg-green-200 border-green-400";
          }

          return (
            <button 
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={isAnswered}
            className={`p-3 rounded-lg border text-left transition ${btnClass}`}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        );
      })}
      </div>

      <button onClick={handleNext}
        disabled={!isAnswered}
        className={`px-5 py-2 rounded-md text-white font-medium ${
          isAnswered ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next Question
      </button>
    </div>
  </div>
 );
};

export default Quiz;