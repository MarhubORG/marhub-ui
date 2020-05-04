import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import { UnconnectedNav } from './nav';
import { logout } from '../../redux/actions/index';

storiesOf('Nav', module).add('Not logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedNav
      isLoggedIn={false}
      logout={logout}
      role="admin"
      pathname="/dashboard/organizations"
    />
  </ThemeProvider>
));

storiesOf('Nav', module).add('Logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedNav
      isLoggedIn={true}
      role="admin"
      logout={logout}
      pathname="/dashboard/organizations"
    />
  </ThemeProvider>
));
