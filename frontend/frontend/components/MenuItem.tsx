import React from 'react';
import styles from './css/NavigationBar.module.css';

interface MenuItemProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return <div className={styles.menuItem}>{label}</div>;
};

export default MenuItem;