import React from 'react';
import '../../styles/header.css';

interface HeaderTabProps {
  tabName: string;
  icon: React.ElementType;
  focused: boolean; // Accept focused as a prop
  onClick: () => void; // Accept the click handler as a prop
}

function HeaderTab(props: HeaderTabProps) {
  return (
    <div
      className={
        props.focused ? 'header-tab--focused header-tab' : 'header-tab'
      }
      onClick={props.onClick}
    >
      <props.icon className="header-icon" />
      {props.tabName}
    </div>
  );
}

export default HeaderTab;
