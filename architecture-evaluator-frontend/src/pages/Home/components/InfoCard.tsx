import { FaGithub, FaGlobe } from "react-icons/fa";

const InfoCard = () => {
    return (
        <div className="w-full h-full max-w-md p-8 bg-gradient-to-br from-white/70 to-gray-100/70 backdrop-blur-lg border border-gray-border rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src="/archev-icon.svg" alt="Logo" className="h-12" />
                    <span className="text-primary font-extrabold text-3xl">ArchEv</span>
                </div>
                <div className="flex gap-4">
                    <a href="https://github.com/Opsord/architecture-evaluator" target="_blank" rel="noopener noreferrer" className="text-gray-medium hover:text-primary transition">
                        <FaGithub size={24} />
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-medium hover:text-primary transition">
                        <FaGlobe size={24} />
                    </a>
                </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-dark">Automatic Architecture Evaluation</h2>
            <p className="text-gray-medium text-base leading-relaxed">
                Analyze your Spring Boot Java projects with maintainability metrics and interactive visualizations. No advanced metric knowledge required.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-light">
                <span>Powered by TailwindCSS</span>
                <span className="px-3 py-1 bg-bright-turquoise-100 text-bright-turquoise-700 rounded-full">Spring Boot</span>
            </div>
        </div>
    );
};

export default InfoCard;