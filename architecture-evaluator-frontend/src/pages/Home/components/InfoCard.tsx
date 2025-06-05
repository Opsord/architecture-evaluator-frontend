// InfoCard.tsx
import { FaGithub, FaGlobe } from "react-icons/fa";

const InfoCard = () => {
  return (
      <div className="w-full h-full max-w-md p-7 bg-white/70 backdrop-blur border border-gray-border rounded-2xl shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-10" />
            <span className="text-primary font-bold text-2xl">ArchEv</span>
          </div>
          <div className="flex gap-3">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-medium hover:text-primary transition">
              <FaGithub size={22} />
            </a>
            <a href="https://netlify.com/" target="_blank" rel="noopener noreferrer" className="text-gray-medium hover:text-primary transition">
              <FaGlobe size={22} />
            </a>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-dark">Automatic Architecture Evaluation</h2>
        <p className="text-gray-medium text-sm">
          Analyze your Spring Boot Java projects with maintainability metrics and interactive visualizations. No advanced metric knowledge required.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-light">
          <span>Powered by TailwindCSS</span>
          <span className="px-2 py-0.5 bg-bright-turquoise-100 text-bright-turquoise-700 rounded">Spring Boot</span>
        </div>
      </div>
  );
};

export default InfoCard;