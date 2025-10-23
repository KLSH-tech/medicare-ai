import { useState, useEffect } from 'react';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import ChatBox from "./ai-chat/components/ChatBox";
import Collaboration from "./components/Collaboration";
import Credits from "./ai-chat/pages/Credits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Community from "./ai-chat/pages/Community";
import SideBar from "./ai-chat/components/SideBar";
import { assets } from './ai-chat/assets/assets';
import './assets/prism.css';
import Loading from './ai-chat/pages/Loading';
import Login from './ai-chat/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import {Toaster} from 'react-hot-toast'

// Landing Page Layout
const LandingPageLayout = () => {
  return (
    <div className="bg-n-8 min-h-screen">
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Pricing />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

// Shared Layout with Sidebar (for Chat, Community, Credits)
const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();

  // Show loading on route change
  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (showLoading) {
    return <Loading duration={800} />; // Pass shorter duration
  }

  return (
    <>
    <Toaster />
      {!isMenuOpen && (
        <img 
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden invert dark:invert-0 z-50"
          onClick={() => setIsMenuOpen(true)}
          alt="Menu"
        />
      )}
      <div className="bg-white dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] text-gray-900 dark:text-white min-h-screen">
        <div className="flex h-screen w-screen">
          <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  // Initial loading when app first mounts - KEEP THIS LONGER
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500); // Keep initial load at 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen on initial app load
  if (initialLoading) {
    return <Loading duration={2500} />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPageLayout />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes with Sidebar Layout */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/community" element={<Community />} />
          <Route path="/credits" element={<Credits />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<LandingPageLayout />} />
      </Routes>
      <ButtonGradient />
    </>
  );
};

export default App;
