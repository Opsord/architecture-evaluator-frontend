import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import InfoCard from "./components/InfoCard";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center min-h-[80vh] py-12 px-4 bg-gradient-to-br">
            {/* Title */}
            <div className="w-full max-w-4xl mb-10">
                <h1 className="text-5xl font-extrabold text-center text-primary drop-shadow-lg">
                    Architecture Evaluator
                </h1>
                <p className="text-lg text-gray-medium text-center mt-4">
                    Analyze your software architecture with ease and different maintainability metrics.
                </p>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Section 1 (left-info) */}
                <div className="flex items-center justify-center">
                    <div className="w-full h-full">
                        <InfoCard />
                    </div>
                </div>
                {/* Section 2 (right-menu) */}
                <div className="flex flex-col gap-8 h-full">
                    <div className="flex flex-col gap-6 bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-10 h-full justify-center border border-gray-border">
                        <button
                            className="flex items-center justify-center gap-4 w-full py-6 px-6 text-2xl bg-gradient-to-r from-primary to-bright-turquoise-400 text-white font-bold rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl active:scale-100"
                            onClick={() => alert("Instructions coming soon")}
                        >
                            <FaBookOpen className="text-3xl" />
                            Instructions
                        </button>
                        <button
                            className="flex items-center justify-center gap-4 w-full py-6 px-6 text-2xl bg-gradient-to-r from-bright-turquoise-400 to-primary text-white font-bold rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl active:scale-100"
                            onClick={() => navigate("/load")}
                        >
                            <FaSearch className="text-3xl" />
                            Scan Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;