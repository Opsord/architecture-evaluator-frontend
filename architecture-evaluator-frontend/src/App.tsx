import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectLoad from './pages/ProjectLoad'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/load" element={<ProjectLoad />} />
                    <Route path="/dashboard" element={<ErrorBoundary>
                        <Dashboard />
                    </ErrorBoundary>} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App