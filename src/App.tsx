import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Technology from './pages/Technology';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Documentation from './pages/Documentation';
import Models from './pages/Models';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-coal text-metallic">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/documentation/*" element={<Documentation />} />
          <Route path="/models" element={<Models />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;