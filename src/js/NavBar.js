import React from 'react';

import {
  Toolbar,
  BackButton
} from 'react-onsenui';

const NavApp = ({title}) => (
  <Toolbar>
    <div className='left'>
    </div>
    <div className='center'>{title}</div>
  </Toolbar>
);

export default NavApp;