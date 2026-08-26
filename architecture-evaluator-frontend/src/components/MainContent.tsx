import React, { Suspense, lazy } from 'react';
import { useNavigation } from '../context/NavigationContext';
import Home from '../pages/Home';
import Instructions from '../pages/Instructions';
import ProjectLoad from '../pages/ProjectLoad';

const DashboardV2 = lazy(() => import('../pages/DashboardV2'));

const MainContent: React.FC = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'instructions':
        return <Instructions />;
      case 'load':
        return <ProjectLoad />;
      case 'dashboard':
        return (
          <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading dashboard…</div>}>
            <DashboardV2 />
          </Suspense>
        );
      default:
        return <Home />;
    }
  };

  // El Dashboard necesita h-full y min-h-0 para el canvas 3D
  // Otras páginas necesitan crecer naturalmente
  const containerClasses = currentPage === 'dashboard'
    ? "w-full h-full flex flex-col min-h-0 animate-fadeIn"
    : "w-full flex flex-col animate-fadeIn";

  return (
    <div className={containerClasses}>
      {renderPage()}
    </div>
  );
};

export default MainContent;
