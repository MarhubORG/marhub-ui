import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import { UnconnectedNav } from './nav';

storiesOf('Nav', module).add('Not logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedNav isLoggedIn={false} />
  </ThemeProvider>
));

storiesOf('Nav', module).add('Logged in', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedNav isLoggedIn={true} />
  </ThemeProvider>
));
