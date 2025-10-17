import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

  if (isLoading) {
    return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <p>Loading questions...</p>
    </div>
  );
};

return <div>Questions Loaded!</div>;
};

export default Quiz;