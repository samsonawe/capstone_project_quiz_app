import { useState } from "react";
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

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <p>Loading questions...</p>
    </div>
  );
};

export default Quiz;