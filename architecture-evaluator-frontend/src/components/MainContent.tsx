import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import Home from '../pages/Home';
import Instructions from '../pages/Instructions';
import ProjectLoad from '../pages/ProjectLoad';
import DashboardV2 from '../pages/DashboardV2';

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
        return <DashboardV2 />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full h-full animate-fadeIn">
      {renderPage()}
    </div>
  );
};

export default MainContent;
