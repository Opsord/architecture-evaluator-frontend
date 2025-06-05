import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import InfoCard from "./components/InfoCard";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-6 h-max">
            {/* Title */}
            <div className="col-span-5 mb-8">
                <h1 className="text-5xl font-extrabold text-center text-primary drop-shadow-lg">
                    Architecture Evaluator
                </h1>
                <p className="text-lg text-gray-medium text-center mt-4">
                    Analyze your software architecture with ease and different maintainability metrics.
                </p>
            </div>
            {/* Section 1 (left-info) */}
            <div className="col-span-2 row-span-4 row-start-3 flex items-center justify-center h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <InfoCard />
                </div>
            </div>
            {/* Section 2 (right-menu) */}
            <div className="col-span-2 row-span-4 col-start-4 row-start-3 flex flex-col gap-8 h-full">
                <div className="flex flex-col gap-6 bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 h-full justify-center">
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
    );
}
export default Home;