import React from 'react';
import Header from './components/header/header.tsx';

import './i18n.js';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import AboutMePage from './components/about-me/about-me.tsx';
import ContactPage from './pages/contact/contact.tsx';
import ServicePage from './pages/services/services.tsx';
import StudyPage from './pages/studies/study-page.tsx';
import Footer from './components/footer/footer.tsx';
import ReviewPage from './pages/reviews/review.tsx';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          {/* Ruta implicită care redirecționează automat la /prezentare */}
          <Route path="/" element={<Navigate to="/prezentare" />} />
          <Route path="/prezentare" element={<AboutMePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/awards" element={<StudyPage />} />
          <Route path="/feedback" element={<ReviewPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
