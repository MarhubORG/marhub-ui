import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import { UnconnectedDashboard } from './Dashboard';
import { exportingIrapData } from '../../redux/actions/api';

storiesOf('Dashboard', module).add('Dashboard Component when logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedDashboard isLoggedIn exportingIrapData={exportingIrapData} />
  </ThemeProvider>
));
