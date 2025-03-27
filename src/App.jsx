import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Header from './components/header/header.tsx';
import AboutMePage from './components/about-me/about-me.tsx';
import ContactPage from './pages/contact/contact.tsx';
import ServicePage from './pages/services/services.tsx';
import StudyPage from './pages/studies/study-page.tsx';
import Footer from './components/footer/footer.tsx';
import ArticlesPage from './pages/articles/articles-page.tsx';
import Login from './pages/admin/login/login.tsx';
import AppointmentsPage from './pages/admin/appointments/appointments.tsx';
import AdminServices from './pages/admin/services/admin.service.tsx';
import AdminArticles from './pages/articles/admin.articles.tsx';
import AdminStudy from './pages/admin/admin.studies.tsx';

import './i18n.js';

// Function to check authentication
const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return token ? true : false;
};

// Layout component
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isOnLoginPage = location.pathname.includes('login');

  return (
    <>
      {!isOnLoginPage && <Header />}
      <div className="container">
        <Routes>
          {/* Redirect from /pshychotherapy-client to /prezentare */}
          <Route path="/" element={<Navigate to="/prezentare" />} />

          {/* Normal Routes */}
          <Route path="/prezentare" element={<AboutMePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/servicii" element={<ServicePage />} />
          <Route path="/pregatire" element={<StudyPage />} />
          <Route path="/articole" element={<ArticlesPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/admin-dashboard"
            element={
              isAuthenticated() ? (
                <AboutMePage />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/programari"
            element={
              isAuthenticated() ? (
                <AppointmentsPage />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/servicii"
            element={
              isAuthenticated() ? (
                <AdminServices />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/articole"
            element={
              isAuthenticated() ? (
                <AdminArticles />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/pregatire"
            element={
              isAuthenticated() ? (
                <AdminStudy />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />

          {/* Catch-all route for non-existing paths */}
          <Route path="*" element={<Navigate to="/prezentare" />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

// Main App Component
function App() {
  return (
    <Router basename="/pshychotherapy">
      <Layout />
    </Router>
  );
}

export default App;
