import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Layout, { siteTitle } from '../components/layout';

const Nav: React.FC = () => {
  const menuItems = ['Dashboard', 'Impact', 'Home'];
  const logo = 'Anonymous Donate';

  return (
      <div>
        <NavigationBar menuItems={menuItems} logo={logo} />
      </div>

  );
};

export default Nav;