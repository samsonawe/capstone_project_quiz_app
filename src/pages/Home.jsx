import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); 

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 19, name: "Maths" },
    { id: 21, name: "Sport" },
  ];

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const startQuiz = () => {
    if (selectedCategory) navigate(`/quiz/${selectedCategory}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-200 p-3 rounded-full">
            <span className="text-2xl">💡</span>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-6">
          WELCOME TO SAMSON AWE TRIVIA QUIZ
        </h1>

        <h2 className="font-medium mb-4">Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`p-6 rounded-xl cursor-pointer transition ${
                selectedCategory === cat.id
                  ? "bg-cyan-400 text-white"
                  : "bg-cyan-200 hover:bg-cyan-300"
              }`}
            >
              <p className="font-semibold">{cat.name}</p>
            </div>
          ))}
        </div>

        <p className="text-sm mb-6">
          Take the quiz on general knowledge, maths and sport to see how versatile you are in those areas.
        </p>

        <button
          onClick={startQuiz}
          disabled={!selectedCategory}
          className={`px-5 py-2 rounded-md text-white font-medium ${
            selectedCategory
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          ▶ Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;