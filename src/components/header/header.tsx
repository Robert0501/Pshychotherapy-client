import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../assets/icons/burger.svg';

import AppLogo from '../../assets/logo.png';
import { ReactComponent as AboutMeIcon } from '../../assets/icons/about-me.svg';
import { ReactComponent as ContactIcon } from '../../assets/icons/contact.svg';
import { ReactComponent as ServicesIcon } from '../../assets/icons/services.svg';
import { ReactComponent as AwardsIcon } from '../../assets/icons/awards.svg';
import { ReactComponent as ArticlesIcon } from '../../assets/icons/articles.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

import '../../styles/header.css';
import HeaderTab from './header.tab.tsx';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('access_token');

  const [focusedTabIndex, setFocusedTabIndex] = useState<number | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTabIndex = localStorage.getItem('focusedTabIndex');
    if (savedTabIndex) {
      setFocusedTabIndex(Number(savedTabIndex));
    } else {
      setFocusedTabIndex(0);
    }
  }, []);

  const handleTabClick = (index: number, route: string) => {
    setFocusedTabIndex(index);
    navigate(route);
    setMenuOpen(false);

    localStorage.setItem('focusedTabIndex', String(index));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutButton = () => {
    localStorage.clear();
    handleTabClick(0, '/prezentare');
  };

  return (
    <>
      <nav className="header-container">
        <div className="header-logo">
          <img src={AppLogo} className="header-logo" alt="Logo" />
        </div>

        <div className="burger-menu" onClick={toggleMenu}>
          <BurgerIcon />
        </div>

        <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
          <HeaderTab
            tabName={t('header.about_me')}
            icon={AboutMeIcon}
            focused={focusedTabIndex === 0}
            onClick={() => handleTabClick(0, '/prezentare')}
          />
          <HeaderTab
            tabName={!isAuthenticated ? t('header.contact') : 'SERVICII'}
            icon={ContactIcon}
            focused={focusedTabIndex === 1}
            onClick={() =>
              handleTabClick(
                1,
                `${!isAuthenticated ? '/contact' : '/admin/servicii'}`
              )
            }
          />
          <HeaderTab
            tabName={!isAuthenticated ? t('header.services') : 'PROGRAMARI'}
            icon={ServicesIcon}
            focused={focusedTabIndex === 2}
            onClick={() =>
              handleTabClick(
                2,
                `${!isAuthenticated ? '/servicii' : '/admin/programari'}`
              )
            }
          />
          <HeaderTab
            tabName={t('header.awards')}
            icon={AwardsIcon}
            focused={focusedTabIndex === 3}
            onClick={() =>
              handleTabClick(
                3,
                `${!isAuthenticated ? '/pregatire' : '/admin/pregatire'}`
              )
            }
          />
          <HeaderTab
            tabName={t('header.articles')}
            icon={ArticlesIcon}
            focused={focusedTabIndex === 4}
            onClick={() =>
              handleTabClick(
                4,
                `${!isAuthenticated ? '/articole' : '/admin/articole'}`
              )
            }
          />
          {isAuthenticated && (
            <HeaderTab
              tabName="Logout"
              icon={LogoutIcon}
              focused={focusedTabIndex === 5}
              onClick={handleLogoutButton}
            />
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
