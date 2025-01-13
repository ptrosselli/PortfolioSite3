import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import ChessBSolo from './components/ChessBSolo.jsx';
import About from './components/About.jsx';
import Totapp from './components/TotApp.jsx';
import Projects from './components/Projects.jsx';
import StudyRoom from './components/studychess/StudyRoom.jsx';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/chessbsolo" && location.pathname !== "/studychess" && (
        <>
          <Header />
          <div className='py-16 top-0 left-0'></div>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chessbsolo" element={<ChessBSolo />} />
        <Route path="/about" element={<About />} />
        <Route path="/totapp" element={<Totapp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/studychess" element={<StudyRoom />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
