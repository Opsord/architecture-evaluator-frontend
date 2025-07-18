import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProjectLoad from './pages/ProjectLoad'
import Home from './pages/Home'
import DashboardV2 from "./pages/DashboardV2";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/load" element={<ProjectLoad />} />
                    <Route path="/dashboardV2" element={<DashboardV2 />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App