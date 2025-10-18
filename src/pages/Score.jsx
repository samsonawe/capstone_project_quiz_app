import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total, category } = state || {};

  if (!state) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-50">
        <p>No quiz data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md sm:max-w-2xl">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-200 p-3 rounded-full">🏆</div>
        </div>
        <h2 className="text-xl font-bold mb-6">{category} Quiz Completed!</h2>
        <p className="font-medium mb-2">Score</p>
        <div className="bg-cyan-100 text-2xl font-semibold w-32 mx-auto py-4 rounded-md mb-6">
          {score} / {total}
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
        >
          ▶ Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Score;