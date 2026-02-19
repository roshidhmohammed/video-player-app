import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// framer motion
import { AnimatePresence } from "framer-motion";

// components
import HomePage from "./features/feed/components/HomePage";
import DetailedVideoPage from "./features/player/components/DetailedVideoPage";

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
