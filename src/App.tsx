import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './features/feed/HomePage';
// import VideoPlayer from './features/player/VideoPlayer';
import { AnimatePresence } from 'framer-motion';
import DetailedVideoPage from './features/player/DetailedVideoPage';
// import MiniPlayer from './features/global/miniPlayer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailedVideoPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20">

      
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
