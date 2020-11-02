import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import { UnconnectedDashboard } from './Dashboard';

storiesOf('Dashboard', module).add('Dashboard Component when logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedDashboard
      myOrganization="myOrganization"
      role="role"
      isLoggedIn
    />
  </ThemeProvider>
));
