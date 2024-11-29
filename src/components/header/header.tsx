import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../assets/icons/burger.svg';

import AppLogo from '../../assets/logo.png';
import { ReactComponent as AboutMeIcon } from '../../assets/icons/about-me.svg';
import { ReactComponent as ContactIcon } from '../../assets/icons/contact.svg';
import { ReactComponent as ServicesIcon } from '../../assets/icons/services.svg';
import { ReactComponent as AwardsIcon } from '../../assets/icons/awards.svg';
import { ReactComponent as ReviewsIcon } from '../../assets/icons/review.svg';
import { ReactComponent as ArticlesIcon } from '../../assets/icons/articles.svg';

import '../../styles/header.css';
import HeaderTab from './header.tab.tsx';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // UseEffect pentru a încărca indexul tab-ului selectat din localStorage
  const [focusedTabIndex, setFocusedTabIndex] = useState<number | null>(null);

  // Track whether the menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // La încărcarea componentelor, verificăm dacă avem o valoare în localStorage
  useEffect(() => {
    const savedTabIndex = localStorage.getItem('focusedTabIndex');
    if (savedTabIndex) {
      setFocusedTabIndex(Number(savedTabIndex)); // Setăm indexul salvat
    }
  }, []);

  // Handle tab clicks and navigate
  const handleTabClick = (index: number, route: string) => {
    setFocusedTabIndex(index); // Set the clicked tab as focused
    navigate(route); // Navigate to the specified route
    setMenuOpen(false);

    // Salvăm indexul în localStorage
    localStorage.setItem('focusedTabIndex', String(index));
  };

  // Toggle the burger menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="header-container">
      <div className="header-logo">
        <img src={AppLogo} className="header-logo" alt="Logo" />
      </div>

      {/* Burger menu icon (visible on small screens) */}
      <div className="burger-menu" onClick={toggleMenu}>
        <BurgerIcon />
      </div>

      {/* Main menu (visible on larger screens or when menu is open on small screens) */}
      <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
        <HeaderTab
          tabName={t('header.about_me')}
          icon={AboutMeIcon}
          focused={focusedTabIndex === 0}
          onClick={() => handleTabClick(0, '/prezentare')}
        />
        <HeaderTab
          tabName={t('header.contact')}
          icon={ContactIcon}
          focused={focusedTabIndex === 1}
          onClick={() => handleTabClick(1, '/contact')}
        />
        <HeaderTab
          tabName={t('header.services')}
          icon={ServicesIcon}
          focused={focusedTabIndex === 2}
          onClick={() => handleTabClick(2, '/services')}
        />
        <HeaderTab
          tabName={t('header.awards')}
          icon={AwardsIcon}
          focused={focusedTabIndex === 3}
          onClick={() => handleTabClick(3, '/awards')}
        />

        <HeaderTab
          tabName={t('header.articles')}
          icon={ArticlesIcon}
          focused={focusedTabIndex === 5}
          onClick={() => handleTabClick(5, '/articles')}
        />
      </div>
    </nav>
  );
}

export default Header;
