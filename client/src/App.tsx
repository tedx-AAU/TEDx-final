import Booking from './pages/Booking';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import tedxxImage from './assets/images/tedxx.jpeg';
import About from './components/About';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import OrganizerSection from './components/OrganizerSection';
import Partners from './components/Partners';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import { AuthProvider } from './contexts/AuthContext';
// Ticket booking – commented out
// import Booking from './pages/Booking';
import SchedulePage from './pages/SchedulePage';
import SpeakersPage from './pages/SpeakersPage';
import TeamPage from './pages/TeamPage';
import TicketsLogin from './pages/TicketsLogin';
import TicketsManagement from './pages/TicketsManagement';
// import TicketsPage from './pages/TicketsPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const RouterContent: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/team" element={<TeamPage />} />
          {/* Ticket booking – commented out */}
          {/* <Route path="/tickets" element={<TicketsPage />} /> */}
        </Route>

         <Route path="/booking" element={<Booking />} /> 
        <Route path="/tickets-login" element={<TicketsLogin />} />
        <Route path="/tickets-management" element={<TicketsManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white">
      <Hero onSeeSpeakers={() => navigate('/speakers')} />

      <section className="relative w-full overflow-hidden border-y border-white/5 bg-black">
        <div className="relative group">
          <img
            src={tedxxImage}
            alt="TEDx Jabal Tareq - Jordan Landmarks"
            className="w-full h-auto object-cover opacity-95 transition-opacity duration-700 group-hover:opacity-100"
          />
          {/* Gradient overlays for smooth transitions from hero to content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
          {/* Subtle red accent glow at edges */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        </div>
      </section>

      <section className="py-24">
        <About />
      </section>

      <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black border-y border-white/5">
        <Speakers onSeeAll={() => navigate('/speakers')} />
      </section>

      <section className="py-24">
        <Schedule onSeeFull={() => navigate('/schedule')} />
      </section>

      <section className="py-24 bg-zinc-950 border-y border-white/5">
        <OrganizerSection />
      </section>

      <section className="py-24">
        <Partners />
      </section>

      {/* <section className="py-24 border-t border-white/5">
        <GeminiIdeaGenerator />
      </section> */}
    </div>
  );
};

const PublicLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentView = useMemo(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.startsWith('/speakers')) return 'speakers';
    if (path.startsWith('/schedule')) return 'schedule';
    if (path.startsWith('/team')) return 'team';
    // if (path.startsWith('/tickets')) return 'tickets';
    if (path.startsWith('/tickets-login')) return 'tickets-login';
    if (path.startsWith('/tickets-management')) return 'tickets-management';
    return 'home';
  }, [location.pathname]);

  const handleNavigate = (
    view:
      | 'home'
      | 'speakers'
      | 'schedule'
      | 'team'
      | 'tickets'
      | 'tickets-login'
      | 'tickets-management'
  ) => {
    const routes: Record<typeof view, string> = {
      home: '/',
      speakers: '/speakers',
      schedule: '/schedule',
      team: '/team',
      tickets: '/', // ticket booking commented out
      'tickets-login': '/tickets-login',
      'tickets-management': '/tickets-management',
    };
    navigate(routes[view]);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <RouterContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
